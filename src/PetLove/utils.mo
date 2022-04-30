import Random "mo:base/Random";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
import List "mo:base/List";

import Types "./types";

module Utils {

    public class TokenUtil() {

        public type TokenMeta = Types.TokenMeta;
        public type TokenId = Types.TokenId;
        public type PetState = Types.PetState;

        // const for new-born token
        let _initHappiness : Nat = 0;
        let _initPrice : Nat = 10;

        // serialize index for next token.
        var _next : Nat = 0;

        // remain imgs for token: Demo only
        var remainTokenImgs = List.fromArray<Text>([
            "https://bafybeietxvkxb2obtejedjwwim3k6rc4ozct6afgohdlmg7ekirpdjuxjm.ipfs.dweb.link/1.png",
            "https://bafybeig5sjwbt3hpk2p57qwxcfvvnjl7ffa5fv3kbatgkrt4p2mqgd56uu.ipfs.dweb.link/2.png",
            "https://bafybeiaba5w73o6ylci5ihgqv5i7txkxpl3z2hgpnjt6dqegz6jcoj5bwe.ipfs.dweb.link/3.png",
            "https://bafybeign7acxwrhxgla2ljokhm66id5z2qjqpcxhokura7gukmmehotfpu.ipfs.dweb.link/4.png",
            "https://bafybeiffqjm7qfigto4ykr7xg63c2qmjx6lexqtytum4vuilhplovnmf4q.ipfs.dweb.link/5.png",
            "https://bafybeiercqwuc2ws23fuse5zpvp2j754uaylpu7pvtmhjsrr353naylazq.ipfs.dweb.link/6.png",
            "https://bafybeieitdnkyotasxskk4hisioul47k3453oi26ce2b5opm6qsz6pzbwm.ipfs.dweb.link/7.png",
            "https://bafybeigvseybf6ywy7r2lmld2t725hiyb4bqxzkatzgh2vdoviuuxm5znm.ipfs.dweb.link/8.png",
            "https://bafybeig3w7kksgnyejzwf4gmpiydx2hpoa7cbt77xvehzmtv7ud2y7yqxa.ipfs.dweb.link/9.png",
            "https://bafybeibtexre5g5s6bovtmhnak3chrzcndgad6wnfhdol52wbppeari23u.ipfs.dweb.link/10.png",
            "https://bafybeif5vq7yego4ca7gkx3wav75mguverovvpuaxgdlvbnxycsj4i67cq.ipfs.dweb.link/11.png",
            "https://bafybeia7awozcbij6rqvtfxukza4zwgjvlo2wtgos7om3da2r4ac3herle.ipfs.dweb.link/12.png",
            "https://bafybeifn3qvvzytmlty5fz2duug7otciex2sxcqiobble6jm2q6wa5voe4.ipfs.dweb.link/13.png",
            "https://bafybeicpgqajuavdgyrjhqjvamwxngdbq5bmeivmiku76pfjjiaxwloruq.ipfs.dweb.link/14.png",
            "https://bafybeia5icvsltehvrqnzcnsie3ucwuc7hor2s4gap7d4osxdbh36mlruy.ipfs.dweb.link/15.png",
            "https://bafybeiaaad3cnhptjoekhftzi32bv2y57c2ktvjchynymacqh2urykdtlu.ipfs.dweb.link/16.png",
            "https://bafybeiarv3wgiwfmmjusvo6jkmgkbblr2hxc6xntvu7ubmycpe6qi7hgdu.ipfs.dweb.link/17.png",
            "https://bafybeiclrvi2cthopm7yvd2xc6g2sjj3krthky6hjslebgv2ioiuyopade.ipfs.dweb.link/18.png",
            "https://bafybeift5w6gmfaccrrfuoasysj2dzk3c7s36fruwtsdc2nbu2fjr6ycxq.ipfs.dweb.link/19.png",
            "https://bafybeihuryk36oqsdhtdc4jk5st7325l3tbgxog6frtvcr4zzdsijylgwu.ipfs.dweb.link/20.png",
            "https://bafybeih73ectlqo3paco5limduzdoctllcqcunnhhfbohzdwpuuo6o6244.ipfs.dweb.link/21.png",
            "https://bafybeiatuoha6zdkhn33ikmg6oayw5sislpqrxjitroakj5ie2ewxiwmse.ipfs.dweb.link/22.png",
            "https://bafybeiec6rzxnhfbobojer5bxikcfmcdc6j6mwf7ngyuoa5kail54tbiry.ipfs.dweb.link/23.png",
            "https://bafybeibzmikfdpwglfvjmueccazze5jdjr6zqngbxylbiqjhwkystp32xm.ipfs.dweb.link/24.png",
            "https://bafybeibb4z5cbttqvqzlaeijqpnatxkv4f37qqxqx5fiild3stv4uw5fh4.ipfs.dweb.link/25.png",
            "https://bafybeieez5ujpsglbzzxpaqo746e2iimzm4tmatntogofc6g3uahuoklcy.ipfs.dweb.link/26.png",
            "https://bafybeic5ov3mzjfbojihux777jjqcdidsdo4dxongl5kt3hsive2w5svoe.ipfs.dweb.link/27.png",
            "https://bafybeihwry34xmqplsygtvlw6ognlzczlx3b2pehnnardopeuuv2dfhdzi.ipfs.dweb.link/28.png",
            "https://bafybeifmhae4zsno776t5riyhfsv56lxb5mw46nusvqko3dvhraani7qvq.ipfs.dweb.link/29.png",
            "https://bafybeibzr3t42hn4sbf6fjqvxdrf4o4xgq7yqw4s2z4btcpw4ee3ajk5ge.ipfs.dweb.link/30.png"
        ]);

        public func generate() : TokenMeta {
            let tokenMeta : TokenMeta = {
                id = getTokenId();
                createTime = getTimestamp();
                image = getImage();
                var state = #notAdopted;
                var happiness = _initHappiness;
                var price = _initPrice;
            }
        };

        public func getTokenId() : TokenId {
            var next = _next;
            _next += 1;
            return Int.toText(Time.now()) # Int.toText(next);
        };

        public func getRequestId() : Text {
            var next = _next;
            _next += 1;
            return Int.toText(Time.now()) # Int.toText(next);
        };


        private func getTimestamp() : Text {
            return Int.toText(Time.now());
        };

        // get a random index of imgs in remainTokenImgs: Demo only
        // in this time we return the first index
        private func getImage() : Text {
            assert(List.size<Text>(remainTokenImgs) != 0);

            // var blob = Blob.fromArray([1,2,3,4,5,6,7,8,9,10]);
            // var generator = Random.Finite(blob);
            // get a ?Nat
            // var nullOrNat = generator.range(16);
            // Nat
            // var number = Option.unwrap(nullOrNat);
            
            // get a number in the first index of the list
            let resultOrNull : ?Text = List.get<Text>(remainTokenImgs, 0);
            let result = Option.unwrap<Text>(resultOrNull);
            
            // modify imgs list to delete this result
            remainTokenImgs := List.filter<Text>(remainTokenImgs, func (a: Text) : Bool {
                return a != result;
            });

            // add this result in the last place
            remainTokenImgs := List.append<Text>(remainTokenImgs, List.fromArray<Text>([result]));

            return result;
        };
     };

}
