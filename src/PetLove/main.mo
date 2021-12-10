import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";

import Types "./types";
import Protocol "./protocol";

shared(msg) actor class PetLove(creator: Principal) {

    public type TokenId = Types.TokenId;
    public type UserProfile = Types.UserProfile;
    public type PetProfile = Types.PetProfile;

    // create information
    private stable var _defaultUser : Principal = creator;
    private stable var _createTime : Time.Time = Time.now();
    private stable var _next : Nat = 0;

    // user mate relation
    private var mates = HashMap.HashMap<Principal, Principal>(1, Principal.equal, Principal.hash);

    // protocol of MUN
    private var protocol = Protocol.MUN_Protocol();

    public shared(msg) func getUserProfile(user : Principal) : async (?Principal) {
        assert(msg.caller == user);
        
        var tokenId : ?TokenId = await protocol.getNFTByOwner(user);
        var mate : ?Principal = mates.get(user);
        
        let res : UserProfile = {
            id = user;
            tokenId = tokenId;
            mate = mate;
        };
        return res.mate;
    };

    // public shared(msg) func getPetProfile(id : TokenId) async (PetProfile) {

    // };
}