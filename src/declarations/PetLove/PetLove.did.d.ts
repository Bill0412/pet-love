import type { Principal } from '@dfinity/principal';
export type ActionType = { 'feed' : null } |
  { 'play' : null };
export interface PetLove {
  'abandonPet' : (arg_0: TokenId) => Promise<boolean>,
  'getAllPetsOnSelling' : () => Promise<Array<PetProfile>>,
  'getPetProfile' : (arg_0: TokenId) => Promise<[] | [PetProfile]>,
  'getUserProfile' : () => Promise<[] | [UserProfile]>,
  'interactWithPet' : (arg_0: TokenId, arg_1: ActionType) => Promise<boolean>,
  'purchasePet' : (arg_0: Principal, arg_1: TokenId) => Promise<boolean>,
  'randomGeneratePet' : () => Promise<PetProfile>,
  'sellPet' : (arg_0: TokenId, arg_1: bigint) => Promise<boolean>,
}
export interface PetProfile {
  'id' : TokenId__1,
  'happiness' : bigint,
  'owner' : [Principal, Principal],
  'createTime' : string,
  'state' : PetState,
  'image' : bigint,
  'price' : bigint,
}
export type PetState = { 'onSelling' : null } |
  { 'notAdopted' : null } |
  { 'adopted' : null };
export type TokenId = string;
export type TokenId__1 = string;
export interface UserProfile {
  'id' : Principal,
  'tokenId' : [] | [TokenId__1],
  'mate' : [] | [Principal],
}
export interface _SERVICE extends PetLove {}
