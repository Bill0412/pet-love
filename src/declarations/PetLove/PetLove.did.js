export const idlFactory = ({ IDL }) => {
  const TokenId = IDL.Text;
  const TokenId__1 = IDL.Text;
  const PetState = IDL.Variant({
    'onSelling' : IDL.Null,
    'notAdopted' : IDL.Null,
    'adopted' : IDL.Null,
  });
  const PetProfile = IDL.Record({
    'id' : TokenId__1,
    'happiness' : IDL.Nat,
    'owner' : IDL.Tuple(IDL.Principal, IDL.Principal),
    'createTime' : IDL.Text,
    'state' : PetState,
    'image' : IDL.Nat,
    'price' : IDL.Nat,
  });
  const UserProfile = IDL.Record({
    'id' : IDL.Principal,
    'tokenId' : IDL.Opt(TokenId__1),
    'mate' : IDL.Opt(IDL.Principal),
  });
  const ActionType = IDL.Variant({ 'feed' : IDL.Null, 'play' : IDL.Null });
  const PetLove = IDL.Service({
    'abandonPet' : IDL.Func([TokenId], [IDL.Bool], []),
    'getAllPetsOnSelling' : IDL.Func([], [IDL.Vec(PetProfile)], []),
    'getPetProfile' : IDL.Func([TokenId], [IDL.Opt(PetProfile)], []),
    'getUserProfile' : IDL.Func([], [IDL.Opt(UserProfile)], []),
    'interactWithPet' : IDL.Func([TokenId, ActionType], [IDL.Bool], []),
    'purchasePet' : IDL.Func([IDL.Principal, TokenId], [IDL.Bool], []),
    'randomGeneratePet' : IDL.Func([], [PetProfile], []),
    'sellPet' : IDL.Func([TokenId, IDL.Nat], [IDL.Bool], []),
  });
  return PetLove;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
