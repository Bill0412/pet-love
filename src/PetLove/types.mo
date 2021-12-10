import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Nat8 "mo:base/Nat8";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Float "mo:base/Float";

module {   
    public type TokenId = Text;
    public type TokenMeta = {
        // meta
        tokenId : TokenId;
        state : Int;    

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
        imgUrl : Blob;
    };

    public let equal = Text.equal;
    public let hash = Text.hash;
}