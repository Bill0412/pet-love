import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Debug "mo:base/Debug";
import List "mo:base/List";

import Types "./types";
import Protocol "./protocol";

shared(msg) actor class PetLove(creator: Principal) {

    public type TokenId = Types.TokenId;
    public type TokenMeta = Types.TokenMeta;
    public type UserProfile = Types.UserProfile;
    public type PetProfile = Types.PetProfile;
    public type PetState = Types.PetState;
    public type ActionType = Types.ActionType;

    // create information
    private stable var _defaultUser : Principal = creator;
    private stable var _createTime : Time.Time = Time.now();
    private stable var _next : Nat = 0;

    // protocol of MUN
    private var protocol = Protocol.MUN_Protocol();


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

    public shared(msg) func getUserProfile(user : Principal) : async (?UserProfile) {
        //assert(user == msg.caller)
        return protocol.getUserProfile(user);
        // var tokenId : ?TokenId =  protocol.getNFTByOwner(user);
        // var mate : ?Principal = mates.get(user);
        
        // let res : UserProfile = {
        //     id = user;
        //     mate = mate;
        //     tokenId = tokenId;
        // };
    };

    public shared(msg) func getPetProfile(id : TokenId) : async (?PetProfile) {
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

    public shared(msg) func sellPet(id : TokenId, price : Nat) : async (Bool) {
        // don't have access for this pet
        // let hasAccess : Bool =  protocol.canAccess(msg.caller, id);
        // if ( hasAccess == false ){
        //     return false;
        // };

        var pet : ?TokenMeta =  protocol.getNFTByToken(id); 
        switch (pet) {
            case (?pet) {
                var _pet : TokenMeta = pet;
                _pet.state := #onSelling;
                _pet.price := price;
                protocol.setNFTByToken(id, _pet);
                return true;
            };
            case (null) {
                return false;
            };
        }
    };

    public shared(msg) func interactWithPet(id : TokenId, action : ActionType) : async (Bool) {
        // don't have access for this pet
        // let hasAccess : Bool =  protocol.canAccess(msg.caller, id);
        // if ( hasAccess == false ){
        //     return false;
        // };
        
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

    public shared(msg) func randomGeneratePet(last : ?TokenId) : async (PetProfile) {
        switch(last) {
            case (?last) {
                // abandon the last one
                var success = protocol.destroyNFT(last);
                assert(success == true);
            };
            case (null) {

            };
        };

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

    public shared(msg) func purchasePet(user : Principal, mate : Principal, pet : TokenId) : async (Bool) {
        let res : Bool = protocol.transferNFT(user, mate, pet);
        return res;
    };

    public shared(msg) func abandonPet(pet : TokenId) : async (Bool) {
        let res : Bool = protocol.destroyNFT(pet);
        return res;
    };

    public shared(msg) func getAllPetsOnSelling() : async ([PetProfile]) {
        let allPets : [TokenMeta] =  protocol.getAllNFT();
        let allPetsOnSelling : [TokenMeta] = Array.filter(
            allPets, 
            func (token: TokenMeta) : Bool { 
                token.state == #onSelling 
            }
        );

        let petProfiles : [PetProfile] = Array.mapFilter<TokenMeta, PetProfile>(
            allPetsOnSelling,
            func (meta: TokenMeta) : ?PetProfile {
                let res :PetProfile = {
                    id = meta.id;
                    createTime = meta.createTime;
                    image = meta.image;
                    state = meta.state;
                    happiness = meta.happiness;
                    price = meta.price;
                    owner =  protocol.getOwners(meta.id);
                };
                ?res
            }
        );

        return petProfiles;
    };
    
    private func playPet(id : TokenId) : () {
        var pet : ?TokenMeta =  protocol.getNFTByToken(id); 
        switch (pet) {
            case (?pet) {
                var _pet : TokenMeta = pet;
                _pet.happiness += 5;
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
                _pet.happiness += 10;
                 protocol.setNFTByToken(id, _pet);
            };
            case (null) {
                return;
            };
        }
    }
}
