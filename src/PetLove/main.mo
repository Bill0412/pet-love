import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Protocol "./protocol";
import Types "types";
import Text "mo:base/Text";

shared(msg) actor class PetLove(creator: Principal) {

    public type TokenId = Types.TokenId;

    // create information
    private stable var _defaultUser : Principal = creator;
    private stable var _createTime : Time.Time = Time.now();
    private stable var _next : Nat = 0;

    private var protocol = Protocol.MUN_Protocol();

    public shared(msg) func getNFTByOwner(userID : Principal) : async ?TokenId{
        await protocol.getNFTByOwner(userID);
    }

}