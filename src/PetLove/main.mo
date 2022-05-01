import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Option "mo:base/Option";

import Types "./types";
import Protocol "./protocol";
import Utils "./utils";

shared(msg) actor class PetLove(creator: Principal) {

    public type TokenId = Types.TokenId;
    public type TokenMeta = Types.TokenMeta;
    public type UserProfile = Types.UserProfile;
    public type PetProfile = Types.PetProfile;
    public type PetState = Types.PetState;
    public type ActionType = Types.ActionType;
    public type EventType = Types.EventType;
    public type Request = Types.Request;
    public type EventState = Types.EventState;

    // create information
    private var requests = HashMap.HashMap<Text, Request>(1, Text.equal, Text.hash);
    private stable var _defaultUser : Principal = creator;
    private stable var _createTime : Time.Time = Time.now();
    private stable var _next : Nat = 0;

    // protocol of MUN
    private var protocol = Protocol.MUN_Protocol();
    private var tokenUtil = Utils.TokenUtil();

    stable var db_nfts : [(TokenId, TokenMeta)] = [];
    stable var db_users : [(Principal, UserProfile)] = [];
    stable var db_nftToOwners : [(TokenId, List.List<Principal>)] = [];

    // Canister停止前把非stable转成stable保存到内存中
    system func preupgrade() {
        db_nfts := protocol.getnfts();
        db_users := protocol.getusers();
        db_nftToOwners := protocol.getnftToOwners();
        Debug.print("Preupgrade Done!");
    };

    /// Canister升级完成启动后把stable存储中的加载到缓存中
    system func postupgrade() {
        protocol.setnfts(db_nfts);
        db_nfts := [];
        protocol.setusers(db_users);
        db_users := [];
        protocol.setnftToOwners(db_nftToOwners);
        db_nftToOwners := [];
        Debug.print("Postupgrade Done!");
    };

    public shared(msg) func mint(creator : Principal) : async Bool {
        return protocol.mint(creator);
    };

    public shared(msg) func getUserProfile() : async (?UserProfile) {
        return protocol.getUserProfile(msg.caller);
    };

    public shared(msg) func getPetProfile(id : TokenId) : async (?PetProfile) {
        assert(protocol.canAccess(msg.caller, id));
        var pet : ?TokenMeta =  protocol.getNFTByToken(id);
        switch (pet) {
            case (?pet) {
                let res : PetProfile = {
                    id = id;
                    createTime = pet.createTime;
                    image = pet.image;
                    state = pet.state;
                    happiness = pet.happiness;
                    price = pet.price;
                    owner = protocol.getOwners(id);
                };
                return ?res;
            };
            case (null) {
                return null;
            };
        }
    };

    public shared(msg) func interactWithPet(id : TokenId, action : ActionType) : async (Bool) {
        assert(protocol.canAccess(msg.caller, id));
        switch (action) {
            case (#play) {
                playPet(id);
                return true;
            };
            case (#feed) {
                feedPet(id);
                return true;
            };
            case (_) {
                return false;
            };
            // TODO
        }
    };

    public shared(msg) func randomGeneratePet() : async (PetProfile) {
        Debug.print("randomGeneratePet");
        Debug.print(Principal.toText(_defaultUser));
        var pet : TokenMeta = protocol.createNFT(_defaultUser);
        let res : PetProfile = {
            id = pet.id;
            createTime = pet.createTime;
            image = pet.image;
            state = pet.state;
            happiness = pet.happiness;
            price = pet.price;
            owner = protocol.getOwners(pet.id);
        };
        return res;
    };

    public shared(msg) func purchasePet(mate : Principal, pet : TokenId) : async (Bool) {
        sendRequest(msg.caller, mate, #buy, pet);
        return true;
    };

    public shared(msg) func sellPet(id : TokenId, price : Nat) : async (Bool) {
        assert(protocol.canAccess(msg.caller, id));
        sendRequest(msg.caller, Option.unwrap(protocol.getMate(msg.caller)), #sell, id);
        var pet : ?TokenMeta =  protocol.getNFTByToken(id); 
        switch (pet) {
            case (?pet) {
                var _pet : TokenMeta = pet;
                _pet.price := price;
                protocol.setNFTByToken(id, _pet);
                return true;
            };
            case (null) {
                return false;
            };
        };
        return true;
    };

    public shared(msg) func abandonPet(pet : TokenId) : async (Bool) {
        assert(protocol.canAccess(msg.caller, pet));
        sendRequest(msg.caller, Option.unwrap(protocol.getMate(msg.caller)), #abandon, pet);
        return true;
    };

    public shared(msg) func reponseACK(requestId : Text) : async (Bool) {
        changeRequestState(requestId, #success);
        var request = Option.unwrap(requests.get(requestId));
        var tokenId = request.tokenId;
        assert(protocol.canAccess(msg.caller, tokenId));
        switch (request.event) {
            case (#buy) {
                var res = protocol.transferNFT(request.sender, request.receiver, tokenId);
                if (res) {
                    protocol.setNFTByToken(tokenId, changePetState(tokenId, #adopted));
                };
            };
            case (#sell) {
                protocol.setNFTByToken(tokenId, changePetState(tokenId, #onSelling));
            };
            case (#abandon) {
                var res = protocol.destroyNFT(tokenId);
                if (res) {
                    protocol.setNFTByToken(tokenId, changePetState(tokenId, #deprecated));
                };
            };
        };
        return true;
    };
    
    public shared(msg) func reponseNAK(requestId : Text) : async (Bool) {
        changeRequestState(requestId, #failed);
        return true;
    };


    public shared(msg) func getAllPetsOnSelling() : async ([PetProfile]) {
        return getPetsByState(#onSelling);
    };

    public shared(msg) func getAllPetsnotAdopted() : async ([PetProfile]) {
        return getPetsByState(#adopted);
    };

    public shared(msg) func getAllRequests() : async ([Request]) {
        return Array.filter(
            Iter.toArray(requests.vals()), 
            func (request: Request) : Bool { 
                request.receiver == msg.caller;
            }
        );
    };
    
    
    private func playPet(id : TokenId) : () {
        var pet : ?TokenMeta =  protocol.getNFTByToken(id); 
        switch (pet) {
            case (?pet) {
                var _pet : TokenMeta = pet;
                _pet.happiness := addHappiness(_pet.happiness, 5);
                protocol.setNFTByToken(id, _pet);
            };
            case (null) {
                return;
            };
        }
    };

    private func feedPet(id : TokenId) : () {
        var pet : ?TokenMeta =  protocol.getNFTByToken(id); 
        switch (pet) {
            case (?pet) {
                var _pet : TokenMeta = pet;
                _pet.happiness := addHappiness(_pet.happiness, 10);
                 protocol.setNFTByToken(id, _pet);
            };
            case (null) {
                return;
            };
        }
    };

    private func addHappiness(origin: Nat, add: Nat) : Nat {
        var now : Nat = origin + add;
        if (now > 90) {
            now := 90;
        };
        return now
    };

    private func sendRequest (_sender : Principal, _receiver : Principal, _event : EventType, _tokenId : TokenId) {
        let request : Request = {
            requestId = tokenUtil.getRequestId();
            sender = _sender;
            receiver = _receiver;
            event = _event;
            state = #waiting;
            tokenId = _tokenId;
        };
        requests.put(request.requestId, request);
    };

    private func changeRequestState (_requestId : Text, _state : EventState) {
        var request = Option.unwrap(requests.get(_requestId));
        let _request : Request = {
            requestId = request.requestId;
            sender = request.sender;
            receiver = request.receiver;
            event = request.event;
            state = _state;
            tokenId = request.tokenId;
        };
        requests.put(_requestId, _request);
    };

    private func changePetState (_tokenId : TokenId, _state : PetState) : TokenMeta{
        var pet : ?TokenMeta =  protocol.getNFTByToken(_tokenId); 
        switch (pet) {
            case (?pet) {
                var _pet : TokenMeta = pet;
                _pet.state := _state;
                return _pet;
            };
        };
    };


    private func getPetsByState(_state : PetState) : ([PetProfile]) {
        let allPets : [TokenMeta] =  protocol.getAllNFT();
        let pets : [TokenMeta] = Array.filter(
            allPets, 
            func (token: TokenMeta) : Bool { 
                token.state == _state; 
            }
        );
        let petProfiles : [PetProfile] = Array.mapFilter<TokenMeta, PetProfile>(
            pets,
            func (meta: TokenMeta) : ?PetProfile {
                let res : PetProfile = {
                    id = meta.id;
                    createTime = meta.createTime;
                    image = meta.image;
                    state = meta.state;
                    happiness = meta.happiness;
                    price = meta.price;
                    owner = protocol.getOwners(meta.id);
                };
                ?res
            }
        );
        return petProfiles;
    };
}
