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

        public func getUserProfile (user : Principal) : async ?UserProfile {
            return users.get(user);
        };

        public func getNFTByToken (tokenId : TokenId) : async ?TokenMeta {
            return nfts.get(tokenId);
        };

        public func setNFTByToken (tokenId : TokenId, tokenMeta : TokenMeta) : async Bool {
            nfts.put(tokenId, tokenMeta);
            return true;
        };

        public func getNFTByOwner (user : Principal) : async ?TokenId {
            var userProfile = users.get(user);
            if (userProfile == null) {
                return null;
            };
            return _unwrap(userProfile).tokenId;
        };

        public func getAllNFT() : async [TokenMeta] {
            return Iter.toArray(nfts.vals());
        };

        public func transferNFT (user1 : Principal, user2 : Principal, tokenId : TokenId) : async Bool {

            _canTransfer(user1, user2, tokenId);
            
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

        
 
        private func _canTransfer (user1 : Principal, user2 : Principal, tokenId : TokenId) {
            assert (nfts.get(tokenId) != null);
            assert (user1 != user2);
            assert (users.get(user1) == null);
            assert (users.get(user2) == null);
        };

        // private func _canAccess (user : Principal, tokenId : TokenId) {
        //     assert (_unwrap(users.get(user)).tokenId == tokenId);
        // };

        





        // public func addNFT (pr) : async bool {
        //     let tokenId =tokenUtil.generate();
        //     //新增nft
        //     nfts.put(tokenId,{
        //         tokenId = tokenId;
        //         file = file;
        //         name = name;
        //         link = link;
        //         description = description;
        //     });
        //     ///nft和owner映射关系
        //     nftToOwner.put(tokenId,msg.caller);
        //     ///nft数量+1
        //     var nftCount = 0;
        //     switch(ownerToNftCount.get(msg.caller)){
        //         case (?count){
        //             nftCount := count+1;
        //         };
        //         case _ {nftCount := 1};
        //     };
        //     ownerToNftCount.put(msg.caller,nftCount);
        //     tokenId;
        // }

        // public shared(msg) func mint(file : Text,name : Text,link : Text,description : Text) : async TokenId{

        // };

        // public shared(msg) func balanceOf() : async Nat {
        //     switch(ownerToNftCount.get(msg.caller)){
        //         case (?balance){
        //             balance;
        //         };
        //         case _ {
        //             0;
        //         };
        //     }
        // };

        // public shared(msg) func getTokens() [TokenMeta]{
        //     Iter.toArray(nfts.vals());
        // };

        

        // public shared(msg) func ownerOf(tokenId : TokenId) : async Principal {
        //     _unwrap(nftToOwner.get(tokenId));
        // };

        // public shared(msg) func safeTransferFrom(from : Principal , to : Principal , tokenId : TokenId) : async Bool{
        //     _canTransfer(msg.caller,from,to,tokenId);
        //     _transfer(from,to,tokenId);
        //     true;
        // };

        // public shared(msg) func transferFrom(from : Principal , to : Principal , tokenId : TokenId) : async Bool{
        //     _canTransfer(msg.caller,from,to,tokenId);
        //     _transfer(from,uto,tokenId);
        //     true;
        // };
        
        // public shared(msg) func approve(approved : Principal , tokenId : TokenId) : async Bool{
        //     _canOperate(msg.caller,tokenId);
        //     nftToApproval.put(tokenId,approved);
        //     true;
        // };

        // public shared(msg) func setApprovalForAll(_operator : Principal , approve : Bool) : async Bool{
        //     switch(ownerToOperators.get(msg.caller)){
        //         case (?approvedOperator){
        //                 approvedOperator.put(_operator,approve);
        //                 ownerToOperators.put(msg.caller,approvedOperator);
        //                 return true;
        //         };
        //         case _ {
        //             let approvedOperator = HashMap.HashMap<Principal,Bool>(1,Principal.equal,Principal.hash);
        //             approvedOperator.put(_operator,approve);
        //             ownerToOperators.put(msg.caller,approvedOperator);
        //             return true;
        //         };
                
        //     }
        // };

        // public shared(msg) func getApproved(tokenId : TokenId) : async Principal {
        //     assert(msg.caller == _unwrap(nftToOwner.get(tokenId)));
        //     return _unwrap(nftToApproval.get(tokenId));
        // };

        // public shared(msg) func isApprovedForAll(owner : Principal, _operator : Principal) : async Bool {
        //     let approvedOperators = _unwrap(ownerToOperators.get(owner));
        //     switch (approvedOperators.get(_operator)){
        //         case (?approced){
        //             approced
        //         };
        //         case _ {return false};
        //     }
        // };
        
        

        // ///token所有者或者被授权者可以操作
        // private func _canOperate(caller : Principal , tokenId : TokenId) {
        //     let tokenOwner = _unwrap(nftToOwner.get(tokenId));
        //     let approvedOperators = _unwrap(ownerToOperators.get(tokenOwner));
        //     let approved : Bool = _unwrap(approvedOperators.get(caller));
        //     assert (tokenOwner == caller or true == approved);
        // };

        // private func _transfer(from : Principal , to : Principal , tokenId : TokenId){
        //     let tokenOwner = _unwrap(nftToOwner.get(tokenId));
        //     assert(from == tokenOwner);
        //     _clearApproval(tokenId);
        //     _removeNftToken(from,tokenId);
        //     _addNftToken(to,tokenId);
        // };

        // private func _clearApproval(tokenId : TokenId){
        //     switch(nftToApproval.get(tokenId)){
        //         case (?approver){
        //             nftToApproval.delete(tokenId);
        //         };
        //         case _ {};
        //     }
        // };

        // private func _removeNftToken(owner : Principal , tokenId : TokenId){
        //     switch (ownerToNftCount.get(owner),nftToOwner.get(tokenId)){
        //         case (?count,?owner){
        //             let _count : Nat = count - 1;
        //             ownerToNftCount.put(owner,_count);
        //             nftToOwner.delete(tokenId);
        //             // tokens.put(owner,Utils.filter(tokenIds,tokenId,Nat.equal));
        //         };
        //         case _ {};
        //     };
        // };

        // private func _addNftToken(to : Principal , tokenId : TokenId){
        //     switch(ownerToNftCount.get(to)){
        //         case (?count){
        //             ownerToNftCount.put(to,count + 1);
        //         };
        //         case _ {
        //             ownerToNftCount.put(to,1);
        //         };
        //     };
        //     nftToOwner.put(tokenId,to);
        //     switch(tokens.get(to)){
        //         case (?tokenIds){
        //             tokens.put(to,Array.thaw(Array.append(Array.freeze(tokenIds),Array.make(tokenId))));
        //         };
        //         case _ {
        //             let tokenIdss = Array.thaw<TokenId>(Array.make<TokenId>(tokenId));
        //             tokens.put(to,tokenIdss);
        //         };
        //     }
        // };

        private func _unwrap<T>(x : ?T) : T =
            switch x {
                case null { P.unreachable() };
                case (?x_) { x_ };
            };

    };
}
