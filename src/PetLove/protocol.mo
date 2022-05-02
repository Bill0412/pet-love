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

// Multiple User NFT
module Protocol {

    public class MUN_Protocol() {

        public type TokenId = Types.TokenId;
        public type TokenMeta = Types.TokenMeta; 
        public type UserProfile = Types.UserProfile;  
        public type PetState = Types.PetState;  

        private var nfts = HashMap.HashMap<TokenId, TokenMeta>(1, Text.equal, Text.hash);
        private var users = HashMap.HashMap<Principal, UserProfile>(1, Principal.equal, Principal.hash);
        private var nftToOwners = HashMap.HashMap<TokenId, List.List<Principal>>(1, Text.equal, Text.hash);
        private var tokenUtil = Utils.TokenUtil();
        
        public func mint(creator : Principal) : Bool {
            var images = tokenUtil.getAllImages();
            for (img in images.vals()) {
                var tid = tokenUtil.getTokenId();
                nfts.put(tid, {
                    id = tid;
                    createTime = tokenUtil.getTimestamp();
                    image = img;
                    var state = #onSelling;
                    var happiness = 0;
                    var price = 10;
                });

                var list1 = List.nil<Principal>();
                var list2 = List.push<Principal>(creator, list1);
                var list3 = List.push<Principal>(creator, list2);

                nftToOwners.put(tid, list3);
            };

            return true;
        };


        public func getnfts() : [(TokenId, TokenMeta)] {
            return Iter.toArray(nfts.entries());
        };

        public func setnfts(db_nfts : [(TokenId, TokenMeta)]) {
            for ((k, v) in db_nfts.vals()) {
                nfts.put(k, v);
            };
        };

        public func getusers() : [(Principal, UserProfile)] {
            return Iter.toArray(users.entries());
        };

        public func setusers(db_users : [(Principal, UserProfile)]) {
            for ((k, v) in db_users.vals()) {
                users.put(k, v);
            };
        };

        public func getnftToOwners() : [(TokenId, List.List<Principal>)] {
            return Iter.toArray(nftToOwners.entries());
        };

        public func setnftToOwners(db_nftToOwners : [(TokenId, List.List<Principal>)]) {
            for ((k, v) in db_nftToOwners.vals()) {
                nftToOwners.put(k, v);
            };
        };
 
        public func getUserProfile (user : Principal) : ?UserProfile {
            return users.get(user);
        };

        public func getNFTByToken (tokenId : TokenId) : ?TokenMeta {
            return nfts.get(tokenId);
        };

        public func setNFTByToken (tokenId : TokenId, tokenMeta : TokenMeta) {
            nfts.put(tokenId, tokenMeta);
        };

        public func getNFTByOwner (user : Principal) :  ?TokenId {
            var userProfile = users.get(user);
            if (userProfile == null) {
                return null;
            };
            return _unwrap(userProfile).tokenId;
        };

        public func getAllNFT () :  [TokenMeta] {
            return Iter.toArray(nfts.vals());
        };

        public func getOwners (tokenId : TokenId) :  (Principal, Principal) {
            var userList = _unwrap(nftToOwners.get(tokenId));
            assert (userList != null);
            let (owner1, l1) = List.pop<Principal>(userList);
            let (owner2, l2) = List.pop<Principal>(userList);
            (_unwrap(owner1), _unwrap(owner1))
        };

        public func getMate (user : Principal) : ?Principal {
            var userProfile = users.get(user);
            switch (userProfile) {
                case (?userProfile) {
                    return userProfile.mate;
                };
                case (_) {
                    return null;
                };
            };
        };


        public func createNFT (user : Principal) : TokenMeta {
            // generate meta
            var meta : TokenMeta = tokenUtil.generate();
            var list1 = List.nil<Principal>();
            var list2 = List.push<Principal>(user, list1);
            var list3 = List.push<Principal>(user, list2);

            users.put(user, {
                id = user;
                balance = 50;
                mate = ?user;
                tokenId = ?meta.id;
            });

            nfts.put(meta.id, meta);
            nftToOwners.put(meta.id, list3);
            return meta;
        };

        public func destroyNFT (tokenId : TokenId) : Bool {
            var token = getNFTByToken(tokenId);
            switch(token) {
                case(null) {
                    return false;
                };
                case(?token) {
                    var userList = _unwrap(nftToOwners.get(tokenId));
                    let (owner1, l1) = List.pop<Principal>(userList);
                    let (owner2, l2) = List.pop<Principal>(userList);

                    // delete token in nftToOwners
                    nftToOwners.delete(tokenId);

                    // delete user profiles with this token
                    users.delete(_unwrap(owner1));
                    users.delete(_unwrap(owner2));

                    // delete this nft's info
                    // and add this image agin: Demo only
                    nfts.delete(tokenId);
                    return true;
                };
            };
        };

        public func transferNFT (user1 : Principal, user2 : Principal, tokenId : TokenId) :  Bool { 
            //update nftToOwners
            Debug.print(Principal.toText(user1));
            Debug.print(Principal.toText(user2));
            var userList = _unwrap(nftToOwners.get(tokenId));
            let (owner1, l1) = List.pop<Principal>(userList);
            let (owner2, l2) = List.pop<Principal>(l1);
            var list1 = List.nil<Principal>();
            var list2 = List.push<Principal>(user1, list1);
            var list3 = List.push<Principal>(user2, list2);
            nftToOwners.put(tokenId, list3);
            //update users
            users.delete(_unwrap(owner1));
            Debug.print(Principal.toText(_unwrap(owner2)));
            users.delete(_unwrap(owner2));

            var pet = _unwrap(nfts.get(tokenId));
            
                    users.put(user1, {
                        id = user1;
                        balance = _unwrap(users.get(user1)).balance - pet.price / 2;
                        mate = ?user2;
                        tokenId = ?tokenId;
                    });
                    users.put(user2, {
                        id = user2;
                        balance = _unwrap(users.get(user2)).balance - pet.price / 2;
                        mate = ?user1;
                        tokenId = ?tokenId;
                    });

                    users.put(_unwrap(owner1), {
                        id = _unwrap(owner1);
                        balance = _unwrap(users.get(_unwrap(owner1))).balance + pet.price / 2;
                        mate = null;
                        tokenId = null;
                    });
                    users.put(_unwrap(owner2), {
                        id = _unwrap(owner2);
                        balance = _unwrap(users.get(_unwrap(owner2))).balance + pet.price / 2;
                        mate = null;
                        tokenId = null;
                    });
            
            return true;
        };

        
        public func canAccess(user : Principal, tokenId : TokenId) :  (Bool) {
            var _userProfile : ?UserProfile =  getUserProfile(user);
            switch (_userProfile) {
                case (null) {
                    return false;
                };
                case (_) {
                };
            };
            var _tokenId : ?TokenId =  getNFTByOwner(user);
            switch (_tokenId) {
                case (?_tokenId) {
                    return (tokenId == _tokenId);
                };
                case (null) {
                    return false;
                };
            }
        };

        private func _unwrap<T>(x : ?T) : T =
            switch x {
                case null { P.unreachable() };
                case (?x_) { x_ };
            };
    };
        
}
