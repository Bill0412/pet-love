import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Nat8 "mo:base/Nat8";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Float "mo:base/Float";

module {   

    public type PetState = {
        #adopted;
        #notAdopted;
        #onSelling;
        #deprecated;
    };

    public type ActionType = {
        #play;
        #feed;
    };

    public type EventType = {
        #buy;
        #sell;
        #abandon;
    };

    public type EventState = {
        #waiting;
        #success;
        #failed;
    };


    public type TokenId = Text;

    public type TokenMeta = {
        // meta
        id : TokenId;

        // info immutable
        createTime : Text;
        // kind : Int;
        // specy : Int;
        image : Nat;

        // info mutable
        var state : PetState;
        var happiness : Nat;

        // info mutable when selling
        var price : Nat;
    };

    public type UserProfile = {
        id : Principal;
        mate : ?Principal;
        tokenId : ?TokenId;
    };

    public type PetProfile = {
        // meta
        id : TokenId;

        // info immutable
        createTime : Text;
        image : Nat;

        // info mutable
        state : PetState;
        happiness : Nat;

        // info mutable when selling
        price : Nat;
        owner : (Principal, Principal);
    };

    public type Request = {

        requestId : Text;

        sender : Principal;

        receiver : Principal;

        event : EventType;

        state : EventState;

        tokenId : TokenId;

    };
}
