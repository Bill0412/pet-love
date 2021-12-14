import Types "types";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import P "mo:base/Prelude";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Random "mo:base/Random";
import Float "mo:base/Float";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";


// MultiUser NFT
module Protocol {

    public class MUN_Protocol() {

        public type TokenId = Types.TokenId;
        public type TokenMeta = Types.TokenMeta; 
        public type UserProfile = Types.UserProfile;  
        public type PetState = Types.PetState;  

        private var nfts = HashMap.HashMap<TokenId, TokenMeta>(1, Text.equal, Text.hash);
        private var users = HashMap.HashMap<Principal, UserProfile>(1, Principal.equal, Principal.hash);
        private var nftToOwners = HashMap.HashMap<TokenId, List.List<Principal>>(1, Text.equal, Text.hash);
        private var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        private var arrSize = 10;

    
        let random = Random.Finite("protocol");
        let tokenUtil = Types.TokenUtil();
    

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


        public func createNFT (user : Principal) : TokenMeta {
            var tokenMeta : TokenMeta = {
                id = tokenUtil.generate();
                createTime = Int.toText(Time.now());
                image = getImageIndex();
                var state = #notAdopted;
                var happiness = 0;
                var price = 10;
            };
            Debug.print("1");
            var list1 = List.nil<Principal>();
            var list2 = List.push<Principal>(user, list1);
            var list3 = List.push<Principal>(user, list2);
            users.put(user, {
                id = user;
                mate = ?user;
                tokenId = ?tokenMeta.id;
            });
            Debug.print("2");
            nfts.put(tokenMeta.id, tokenMeta);
            nftToOwners.put(tokenMeta.id, list3);
            return tokenMeta;
        };

        public func destroyNFT (tokenId : TokenId) :  Bool {
            var userList = _unwrap(nftToOwners.get(tokenId));
            let (owner1, l1) = List.pop<Principal>(userList);
            let (owner2, l2) = List.pop<Principal>(userList);
            nftToOwners.put(tokenId, List.nil<Principal>());
            users.delete(_unwrap(owner1));
            users.delete(_unwrap(owner2));
            nfts.delete(tokenId);
            return true;
        };


        public func transferNFT (user1 : Principal, user2 : Principal, tokenId : TokenId) :  Bool {

            //canTransfer(user1, user2, tokenId);
            
            //update nftToOwners
            var userList = _unwrap(nftToOwners.get(tokenId));
            let (owner1, l1) = List.pop<Principal>(userList);
            let (owner2, l2) = List.pop<Principal>(userList);
            var list1 = List.nil<Principal>();
            var list2 = List.push<Principal>(user1, list1);
            var list3 = List.push<Principal>(user2, list2);
            nftToOwners.put(tokenId, list3);
            //TODO
            //update users
            users.delete(_unwrap(owner1));
            users.delete(_unwrap(owner2));
            Debug.print(Principal.toText(user1));
            Debug.print(Principal.toText(user2));
            users.put(user1, {
                id = user1;
                mate = ?user2;
                tokenId = ?tokenId;
            });
            if (user1 != user2) {
                users.put(user2, {
                    id = user2;
                    mate = ?user1;
                    tokenId = ?tokenId;
                });
            };
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

        // private func canTransfer (user1 : Principal, user2 : Principal, tokenId : TokenId) {
        //     var _userProfile : ?UserProfile =  getUserProfile(user);
        //     switch (_userProfile) {
        //         case (null) {
        //             return false;
        //         };
        //         case (_) {
        //         };
        //     };
        //     assert (user1 != user2);
        //     if (users.get(user1) == null);
        //     assert (users.get(user2) == null);
        // };

        private func _unwrap<T>(x : ?T) : T =
            switch x {
                case null { P.unreachable() };
                case (?x_) { x_ };
            };

        private func getImageIndex() : Nat{
            Debug.print("4");
            var r = Nat8.toNat(_unwrap(random.byte()));
            var index = Nat.rem(r, 10);
            arr := remove(index);
            Debug.print("5");
            return index;
        };

        public func remove (value: Nat) : [Nat] {
            let newArr : [Nat] = Array.filter(
                arr, 
                func (val: Nat) : Bool { 
                    val !=  value;
                }
            );
            arrSize -= 1;
            return newArr;
        };

    };
        
}