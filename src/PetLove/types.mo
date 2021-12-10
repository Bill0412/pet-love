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
    };

    public type TokenId = Text;
    
    public type TokenMeta = {
        // meta
        id : TokenId;
        state : PetState;    

        // basic
        name : Text;
        description : Text;
        createTime : Text;

        // info immutable
        kind : Int;
        specy : Int;

        // info mutable with action
        age : Nat;
        happiness : Nat;
        health : Nat;

        // info when selling
        price : Float;

        // info 
        image : Blob;
    };

    public type UserProfile = {
        id : Principal;
        mate : ?Principal;
        tokenId : ?TokenId;
    };

    public type PetProfile = TokenMeta;

}
