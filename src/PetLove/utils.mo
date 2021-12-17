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
        var remainTokenImgs = List.fromArray<Nat>([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]);

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

        private func getTokenId() : TokenId {
            var next = _next;
            _next += 1;
            return Int.toText(Time.now()) # Int.toText(next);
        };

        private func getTimestamp() : Text {
            return Int.toText(Time.now());
        };

        private func getImage() : Nat {
            getRandomImg();
        };

        // get a random index of imgs in remainTokenImgs: Demo only
        // in this time we return the first index
        private func getRandomImg() : Nat {
            assert(List.size<Nat>(remainTokenImgs) != 0);

            // var blob = Blob.fromArray([1,2,3,4,5,6,7,8,9,10]);
            // var generator = Random.Finite(blob);
            // get a ?Nat
            // var nullOrNat = generator.range(16);
            // Nat
            // var number = Option.unwrap(nullOrNat);
            
            // get a number in the first index of the list
            let resultOrNull : ?Nat = List.get<Nat>(remainTokenImgs, 0);
            let result = Option.unwrap<Nat>(resultOrNull);
            
            // modify imgs list to delete this result
            remainTokenImgs := List.filter<Nat>(remainTokenImgs, func (a: Nat) : Bool {
                return a != result;
            });

            // add this result in the last place
            remainTokenImgs := List.append<Nat>(remainTokenImgs, List.fromArray<Nat>([result]));

            return result;
        };
     };

}
