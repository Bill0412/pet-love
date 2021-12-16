import Random "mo:base/Random";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

import Types "./types";

module Utils {

    public class TokenUtil() {

        public type TokenMeta = Types.TokenMeta;

        // serialize index for next token.
        var _next : Nat = 0;

        public func generate() : TokenMeta {
            let tokenMeta : TokenMeta = {
                id = getTokenId();
                createTime = getTimestamp();
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
        
    };

    public class UserUtil() {

        public type UserMeta = Types.UserMeta;

        public func generate(userId : Principal) : UserMeta {
            let userMeta : UserMeta = {
                id = userId;
                hash = Principal.hash(userId);
                root = Principal.hash(userId);
            }
        }
    }

}
