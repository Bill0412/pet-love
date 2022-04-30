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
            "https://bafybeiaf7siv7mkkuhjidixp4yzc6fqg46ptgazp3s6e6ii7igdqhzn4xe.ipfs.dweb.link/0.png",
            "https://bafybeihlk32j3jghxojbgrtyob43whz2ef356wjzkc27rrfvum43aepaiu.ipfs.dweb.link/1.png",
            "https://bafybeifzkr3qjkzbvgoe3lqjk6ak2vlbtiyc7dqtdalfxbwbea6pqt67l4.ipfs.dweb.link/2.png",
            "https://bafybeiafuxlzveccvtz4fvstsc7k7tekhj2al7w7wbl2kvpzkabl2mfsla.ipfs.dweb.link/3.png",
            "https://bafybeienuemzzhddvdne2m6ecjotgrda3egm42ql2vb3yztxz4gfomh4ay.ipfs.dweb.link/4.png",
            "https://bafybeieb6ogzpmxfo37ztsdvhffglagemlyyjmjgn674ryf7c4owu7d6iq.ipfs.dweb.link/5.png",
            "https://bafybeihvogfdvuq6mdnqi34i72ymoqhfmhxrxhcgxxof36vvvdjkipwc2a.ipfs.dweb.link/6.png",
            "https://bafybeihneu6dolxjga6vsjiurocgg6xqlskbxvkiblq2af6dmzshrirunq.ipfs.dweb.link/7.png",
            "https://bafybeifqcj2taxwvfpvunlmlkysvha63jb4ozuz3c3fjiy2ef7ozrvghku.ipfs.dweb.link/8.png",
            "https://bafybeifzmzlb5sqbeodrbniwwkpozsdpjdcdnsguyomn6vozjcqwvqcnsq.ipfs.dweb.link/9.png",
            "https://bafybeihrrgbqj7yf46k3wphlsglxoaejb4lkcks2lbzeh7kr25ek4gvfcu.ipfs.dweb.link/10.png",
            "https://bafybeigi475tp2honubwsroz56qmaljwo23luejdogdz7vdtm3ufpaytwq.ipfs.dweb.link/11.png",
            "https://bafybeietsv25cf3mbhzizgk5wughc7zb5yrl6dmnhn4czylbdcunrytpje.ipfs.dweb.link/12.png",
            "https://bafybeicd5e3b7f23fv7pfh3gzbvs33hz2lnepqns7fj3jap2cwklwom6je.ipfs.dweb.link/13.png",
            "https://bafybeihf2nvo6t4s6iacqgg2djvi7gp7yalmjjwxo7zbpkws5xh5mycohi.ipfs.dweb.link/14.png",
            "https://bafybeidrc3wo4hp6obsrvjz5bueopw7dkpxpugbmkcmhe6zxb5srat2emy.ipfs.dweb.link/15.png",
            "https://bafybeig346deenwz6ixe55qnpm45ytvscbkkwajobjcrlnzef54nq4qyfu.ipfs.dweb.link/16.png",
            "https://bafybeiercnchpy27fencjvkw5rzxwfvzooknkpyci3mn7plo4q6xuu5asy.ipfs.dweb.link/17.png"
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
