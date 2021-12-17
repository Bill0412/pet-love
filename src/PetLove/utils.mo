import Random "mo:base/Random";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";

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
        var remainTokenImgs : [Nat] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        public func generate() : TokenMeta {
            var image = getImage();
            let tokenMeta : TokenMeta = {
                id = getTokenId();
                createTime = getTimestamp();
                image = image;

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
        private func getRandomImg() : Nat {
            assert(remainTokenImgs.size() != 0);

            var blob = Blob.fromArray([1,2,3,4,5,6,7,8,9,10]);
            var generator = Random.Finite(blob);

            // get a ?Nat
            var nullOrNat = generator.range(16);
            // Nat
            var number = Option.unwrap(nullOrNat);
            
            // get a number in range(0, size)
            let maxValue = Nat.pow(2, 16)-1;
            let result = remainTokenImgs[number*remainTokenImgs.size()/maxValue];

            // modify imgs array to delete this result
            remainTokenImgs := Array.filter(remainTokenImgs, func (a: Nat) : Bool {
                return a != result;
            });

            return result;
        };

        // add the img into remainTokenImgs again: Demo only.
        public func resetImg(img : Nat) {
            // create buffer that contains this img
            var buffer = Buffer.Buffer<Nat>(1);
            buffer.add(img);

            // append this image to remaining tokens imgs array again.
            remainTokenImgs := Array.append(remainTokenImgs, buffer.toArray());
        }
     };

}