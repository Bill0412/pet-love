import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Float "mo:base/Float";
import Array "mo:base/Array";
import Bool "mo:base/Bool";

import Types "./types";
import Protocol "./protocol";

shared(msg) actor class PetLove(creator: Principal) {

    public type TokenId = Types.TokenId;
    public type TokenMeta = Types.TokenMeta;
    public type UserProfile = Types.UserProfile;
    public type PetProfile = Types.PetProfile;
    public type PetState = Types.PetState;

    // create information
    private stable var _defaultUser : Principal = creator;
    private stable var _createTime : Time.Time = Time.now();
    private stable var _next : Nat = 0;

    // user mate relation
    private var mates = HashMap.HashMap<Principal, Principal>(1, Principal.equal, Principal.hash);

    // protocol of MUN
    private var protocol = Protocol.MUN_Protocol();

    public shared(msg) func getUserProfile(user : Principal) : async (UserProfile) {
        assert(msg.caller == user);
        
        var tokenId : ?TokenId = await protocol.getNFTByOwner(user);
        var mate : ?Principal = mates.get(user);
        
        let res : UserProfile = {
            id = user;
            tokenId = tokenId;
            mate = mate;
        };
    };

    public shared(msg) func getPetProfile(id : TokenId) : async (?PetProfile) {
        var pet : ?TokenMeta = await protocol.getNFTByToken(id);
        switch (pet) {
            case (?pet) {
                let res : PetProfile = pet;
                return ?res;
            };
            case (null) {
                return null;
            };
        }
    };

    public shared(msg) func sellPet(id : TokenId, price : Float) : async (Bool) {
        // don't have access for this pet
        let hasAccess : Bool = await protocol.canAccess(msg.caller, id);
        if ( hasAccess == false ){
            return false;
        };

        var pet : ?TokenMeta = await protocol.getNFTByToken(id); 
        switch (pet) {
            case (?pet) {
                var _pet : TokenMeta = pet;
                _pet.state := #onSelling;
                _pet.price := price;
                await protocol.setNFTByToken(id, _pet);
            };
            case (null) {
                return false;
            };
        }
    };

    public shared(msg) func interactWithPet(id : TokenId, action : ActionType) : async (Bool) {
        // don't have access for this pet.
        let hasAccess : Bool = await protocol.canAccess(msg.caller, id);
        if ( hasAccess == false ){
            return false;
        };
        
        switch (action) {
            case (#play) {
                await playPet(id);
                return true;
            };
            case (#feed) {
                await feedPet(id);
                return true;
            };
            case (_) {
                return false;
            };
            // TODO
        }
    };

    // public shared(msg) func randomGeneratePet() : async (PetProfile) {

    // };

    // public shared(msg) func purchasePet(user : Principal, mate : Principal, pet : TokenId) : async (PetProfile) {
        
    // };

    public shared(msg) func getAllPetsOnSelling() : async ([PetProfile]) {
        let allPets : [TokenMeta] = await protocol.getAllNFT();

        let allPetsOnSelling : [TokenMeta] = Array.filter(
            allPets, 
            func (token: TokenMeta) : Bool { 
                token.state == #onSelling 
            }
        );

        let petProfiles : [PetProfile] = Array.mapFilter<TokenMeta, PetProfile>(
            allPetsOnSelling,
            func (meta: TokenMeta) : ?PetProfile {
                let res : PetProfile = {
                    meta = meta;
                    owner = await protocol.getOwners();
                };
            }
        );

        return petProfiles;
    };
    
    private func playPet(id : TokenId) : async () {
        var pet : ?TokenMeta = await protocol.getNFTByToken(id); 
        switch (pet) {
            case (?pet) {
                var _pet : TokenMeta = pet;
                _pet.happiness += 5;
                await protocol.setNFTByToken(id, _pet);
            };
            case (null) {
                return;
            };
        }
    };

    private func feedPet(id : TokenId) : async () {
        var pet : ?TokenMeta = await protocol.getNFTByToken(id); 
        switch (pet) {
            case (?pet) {
                var _pet : TokenMeta = pet;
                _pet.happiness += 10;
                await protocol.setNFTByToken(id, _pet);
            };
            case (null) {
                return;
            };
        }
    }
}