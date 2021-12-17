import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Hash "mo:base/Hash";

module {   

    public type TokenMeta = {

        id : Text;

        createTime : Text; 
 
        //Custom Attributes

    };


    public type UserMeta = {

        id : Principal;

        hash : Hash.Hash;

        root : Hash.Hash;

    };

}
