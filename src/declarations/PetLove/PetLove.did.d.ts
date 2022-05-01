import type { Principal } from '@dfinity/principal';
export type ActionType = { 'feed' : null } |
  { 'play' : null };
export type EventState = { 'success' : null } |
  { 'waiting' : null } |
  { 'failed' : null };
export type EventType = { 'buy' : null } |
  { 'abandon' : null } |
  { 'sell' : null };
export interface PetLove {
  'abandonPet' : (arg_0: TokenId) => Promise<boolean>,
  'getAllPetsOnSelling' : () => Promise<Array<PetProfile>>,
  'getAllPetsnotAdopted' : () => Promise<Array<PetProfile>>,
  'getAllRequests' : () => Promise<Array<Request>>,
  'getPetProfile' : (arg_0: TokenId) => Promise<[] | [PetProfile]>,
  'getUserProfile' : () => Promise<[] | [UserProfile]>,
  'interactWithPet' : (arg_0: TokenId, arg_1: ActionType) => Promise<boolean>,
  'purchasePet' : (arg_0: Principal, arg_1: TokenId) => Promise<boolean>,
  'randomGeneratePet' : () => Promise<PetProfile>,
  'reponseACK' : (arg_0: string) => Promise<boolean>,
  'reponseNAK' : (arg_0: string) => Promise<boolean>,
  'sellPet' : (arg_0: TokenId, arg_1: bigint) => Promise<boolean>,
}
export interface PetProfile {
  'id' : TokenId__1,
  'happiness' : bigint,
  'owner' : [Principal, Principal],
  'createTime' : string,
  'state' : PetState,
  'image' : string,
  'price' : bigint,
}
export type PetState = { 'onSelling' : null } |
  { 'deprecated' : null } |
  { 'notAdopted' : null } |
  { 'adopted' : null };
export interface Request {
  'requestId' : string,
  'tokenId' : TokenId__1,
  'sender' : Principal,
  'event' : EventType,
  'state' : EventState,
  'receiver' : Principal,
}
export type TokenId = string;
export type TokenId__1 = string;
export interface UserProfile {
  'id' : Principal,
  'tokenId' : [] | [TokenId__1],
  'balance' : bigint,
  'mate' : [] | [Principal],
}
export interface _SERVICE extends PetLove {}
