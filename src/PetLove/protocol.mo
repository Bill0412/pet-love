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
        // FIX: the initial capacity should be larger to avoid hash conflict
        private var users = HashMap.HashMap<Principal, UserProfile>(1, Principal.equal, Principal.hash);
        private var nftToOwners = HashMap.HashMap<TokenId, List.List<Principal>>(1, Text.equal, Text.hash);
        private var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        private var arrSize = 10;
        let random = Random.Finite("Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur");
        // ///mapping from nft to approced principal
        // private var nftToApproval = HashMap.HashMap<TokenId,Principal>(1,Types.equal,Types.hash);
        // private var ownerToOperators = HashMap.HashMap<Principal,HashMap.HashMap<Principal,Bool>>(1,Principal.equal,Principal.hash);
        // ///mapping from owner to their token count
        // private var ownerToNftCount = HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);
        // ///mapping from owner to their nft tokenId
        // private var tokens = HashMap.HashMap<Principal,[var TokenId]>(1,Principal.equal,Principal.hash);
        
        let tokenUtil = Types.TokenUtil();


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

        public func getAllNFT () :  [TokenMeta] {
            return Iter.toArray(nfts.vals());
        };

        public func getOwners (tokenId : TokenId) :  (Principal, Principal) {
            var owners = nftToOwners.get(tokenId);
            assert(owners != null);
            var userList = _unwrap(owners);
            assert(userList != null);
            assert(List.size(userList) == 2);
            var p1 = List.get(userList, 0);
            var p2 = List.get(userList, 1);
            assert(p1 != null);
            assert(p2 != null);
            (_unwrap(p1), _unwrap(p2))
        };


        public func createNFT (user : Principal) : TokenMeta {
            var tokenMeta : TokenMeta = {
                id = tokenUtil.generate();
                createTime = Int.toText(Time.now());
                image = getImageIndex();
                var state = #notAdopted;
                var happiness = 0;
                var price = 2;
            };

            var list1 = List.nil<Principal>();
            var list2 = List.push<Principal>(user, list1);
            var list3 = List.push<Principal>(user, list2);
            users.put(user, {
                id = user;
                mate = ?user;
                tokenId = ?tokenMeta.id;
            });
            nfts.put(tokenMeta.id, tokenMeta);
            assert(List.size(list3) == 2);
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

        private func getImageIndex() : Nat{
            // var t = random.range(4);
            // assert(t != null);
            // var r = _unwrap(t);
            // var index = Nat.rem(r, 10);
            var index = arr[0];
            arr := remove(index);
            arr := Array.append(arr, [index]);
            return index;
        };

        public func remove (value: Nat) : [Nat] {
            let newArr : [Nat] = Array.filter(
                arr,
                func (val: Nat) : Bool {
                    val !=  value;
                }
            );
            // arrSize -= 1;
            return newArr;
        };

    };

}
