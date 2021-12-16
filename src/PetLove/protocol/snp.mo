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
import Set "mo:base/TrieSet";
import Trie "mo:base/Trie"

import Types "./types";
import Utils "./utils";


// Shared NFT Protocol
module Shared_NFT_Protocol {

    public class snp {

        public type TokenMeta = Types.TokenMeta;
        public type UserMeta = Types.UserMeta;
        public type Set<T> = Trie.Trie<T, ()>;

        private var tokens = HashMap.HashMap<Text, TokenMeta>(1, Text.equal, Text.hash);
        private var users = HashMap.HashMap<Principal, UserMeta>(1, Principal.equal, Principal.hash);
        
        //private var user_to_root = HashMap.HashMap<Principal, Hash.Hash>(1, Principal.equal, Principal.hash);
        private var root_to_users = HashMap.HashMap<Hash.Hash, Set<Principal>>(1, Hash.equal, Hash.hash);
        private var token_to_root = HashMap.HashMap<Text, Hash.Hash>(1, Text.equal, Text.hash);
        private var root_to_tokens = HashMap.HashMap<Hash.Hash, Set<Text>>(1, Hash.equal, Hash.hash);
        
        private var tokenUtil = Utils.TokenUtil();
        private var userUtil = Utils.UserUtil();

        public func tokensOf (userId : Principal) : [TokenMeta] {
            var root = _getRoot(userId);
            var tokens = root_to_tokens.get(root);
            switch (tokens) {
                case(?tokens) {
                    return Set.toArray<TokenMeta>(tokens);
                };
                case(_) {
                    return [];
                };
            };
        };

        public func balanceOf (userId : Principal) : Nat {
            return tokensOf(userId).size();
        };

        public func ownersOf (tokenId : Text) : [UserMeta] {
            var root = token_to_root.get(tokenId);
            switch (root) {
                case(?root) {
                    var users = root_to_users.get(root);
                    switch (users) {
                        case(?users) {
                            return Set.toArray<UserMeta>(users);
                        };
                        case(_){
                            return [];
                        };
                    };
                };
                case(_) {
                    return [];
                };
            };
        };

        public func getUser (userId : Principal) : ?UserMeta {
            return users.get(userId);
        };

        public func getToken (tokenId : Text) : ?TokenMeta {
            return tokens.get(tokenId);
        };

        public func getTokens () : [TokenMeta] {
            return Iter.toArray(tokens.vals());
        };

        public func transfer (fromRoot : Hash.Hash, token : Text) : Bool {

        };

        public func mint (userId : Principal) : TokenMeta {
            //add user
            var userMeta : UserMeta = userUtil.generate(userId);
            users.put(user, userMeta);
            //add token
            var tokenMeta : TokenMeta = tokenUtil.generate();
            tokens.put(tokenMeta.id, tokenMeta);
            //add to token_to_root
            token_to_root.add(tokenMeta.id, userMeta.root);
            //add to root_to_tokens
            var tokens = root_to_tokens.get(userMeta.root);
            tokens.put(tokenMeta.id);
            root_to_tokens.put(userMeta.root, tokens);
            //add to root_to_users
            var users = root_to_users.get(userMeta.root);
            users.put(userId);
            root_to_users.put(userMeta.root, users);
        };

        public func proof (userId : Principal, tokenId : Text) : Bool{
            var r1 = _getRoot(userId);
            var r2 = Hash.hashNat8(_getPath(tokenId));
            return Hash.equal(r1, r2);
        };
        
        private func _getRoot (userId : Principal) : Hash.Hash{
            var user = users.get(userId);
            return _unwrap(user).root;
        };
        
        private func _getPath (tokenId : Text) : [Hash.Hash] {
            var owners = ownersOf(tokenId);
            let path : Buffer.Buffer<Hash.Hash> = Buffer.Buffer(owners.size());
            for (owner in owners.vals()) {
                path.add(owner.hash);
            }
            return path.toArray();
        };

        // private func _contains<T> (list : List.List<T>, ele : T) : Bool {
        //     if (list == null) {
        //         return false;
        //     };
        //     let arr = Iter.fromList<T>(list);
        //     for (val in arr.vals()) {
        //         if (val == ele) {
        //             return true;
        //         }
        //     };
        //     return false;
        // };

        private func _unwrap<T>(x : ?T) : T =
            switch x {
                case null { P.unreachable() };
                case (?x_) { x_ };
            };

    }
    
}