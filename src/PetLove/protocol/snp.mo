import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import P "mo:base/Prelude";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Random "mo:base/Random";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";

import Types "./types";
import Utils "./utils";


// Shared NFT Protocol
module Shared_NFT_Protocol {

    public class snp {

        public type TokenMeta = Types.TokenMeta;
        public type UserMeta = Types.UserMeta;

        private var tokens = HashMap.HashMap<Text, TokenMeta>(1, Text.equal, Text.hash);
        private var users = HashMap.HashMap<Principal, UserMeta>(1, Principal.equal, Principal.hash);
        
        private var user_to_root = HashMap.HashMap<Principal, Hash.Hash>(1, Principal.equal, Principal.hash);
        private var root_to_users = HashMap.HashMap<Hash.Hash, List.List<UserMeta>>(1, Hash.equal, Hash.hash);
        private var token_to_root = HashMap.HashMap<Text, Hahs.Hash>(1, Text.equal, Text.hash);
        private var root_to_tokens = HashMap.HashMap<Hash.Hash, List.List<TokenMeta>>(1, Hash.equal, Hash.hash);
        
        public func tokensOf (user : Principal) : [TokenMeta] {
            var root = user_to_root.get(user);
            switch(root) {
                case(?root) {
                    var tokens = root_to_tokens.get(root);
                    case(?tokens) {
                        return List.toArray<TokenMeta>(tokens);
                    };
                    case(null) {
                        return [];
                    }
                };
                case(_) {
                    return [];
                }
            }
        };

        public func balanceOf (user : Principal) : Nat {
            return tokensOf(user).size();
        }

        public func ownersOf (token : Text) : [UserMeta] {

        }

        
        

    }
    
}