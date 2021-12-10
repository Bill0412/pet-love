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

// MultiUser NFT
module Protocol {

    public class MUN_Protocol() {

        public type TokenId = Types.TokenId;
        public type TokenMeta = Types.TokenMeta; 
        public type UserProfile = Types.UserProfile;    

        private var nfts = HashMap.HashMap<TokenId, TokenMeta>(1, Text.equal, Text.hash);
        private var users = HashMap.HashMap<Principal, UserProfile>(1, Principal.equal, Principal.hash);
        private var nftToOwners = HashMap.HashMap<TokenId, List.List<Principal>>(1, Text.equal, Text.hash);

        // ///mapping from nft to approced principal
        // private var nftToApproval = HashMap.HashMap<TokenId,Principal>(1,Types.equal,Types.hash);
        // private var ownerToOperators = HashMap.HashMap<Principal,HashMap.HashMap<Principal,Bool>>(1,Principal.equal,Principal.hash);
        // ///mapping from owner to their token count
        // private var ownerToNftCount = HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);
        // ///mapping from owner to their nft tokenId
        // private var tokens = HashMap.HashMap<Principal,[var TokenId]>(1,Principal.equal,Principal.hash);
        
        // let tokenUtil = Types.TokenUtil();

        // public func newUserRepository(principal : Principal) : UserRepository{
        //     HashMapRepositories.HashMapRepository<UserId, UserProfile>()
        // };

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

        public func getAllNFT() :  [TokenMeta] {
            return Iter.toArray(nfts.vals());
        };

        //public func createNFT ()

        public func getOwners (tokenId : TokenId) :  (Principal, Principal) {
            var userList = _unwrap(nftToOwners.get(tokenId));
            assert (userList != null);
            let (owner1, l1) = List.pop<Principal>(userList);
            let (owner2, l2) = List.pop<Principal>(userList);
            (_unwrap(owner1), _unwrap(owner1))
        };


        public func transferNFT (user1 : Principal, user2 : Principal, tokenId : TokenId) :  Bool {

            //canTransfer(user1, user2, tokenId);
            
            //update nftToOwners
            var userList = _unwrap(nftToOwners.get(tokenId));
            assert (userList != null);
            let (owner1, l1) = List.pop<Principal>(userList);
            let (owner2, l2) = List.pop<Principal>(userList);
            var list1 = List.nil<Principal>();
            var list2 = List.push<Principal>(user1, list1);
            var list3 = List.push<Principal>(user2, list2);
            nftToOwners.put(tokenId, list3);

            //update users
            users.delete(_unwrap(owner1));
            users.delete(_unwrap(owner2));
            users.put(user1, {
                id = user1;
                mate = ?user2;
                tokenId = ?tokenId;
            });
            users.put(user2, {
                id = user2;
                mate = ?user1;
                tokenId = ?tokenId;
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

        };
}
