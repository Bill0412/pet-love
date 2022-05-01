export const idlFactory = ({ IDL }) => {
  const TokenId = IDL.Text;
  const TokenId__1 = IDL.Text;
  const PetState = IDL.Variant({
    'onSelling' : IDL.Null,
    'deprecated' : IDL.Null,
    'notAdopted' : IDL.Null,
    'adopted' : IDL.Null,
  });
  const PetProfile = IDL.Record({
    'id' : TokenId__1,
    'happiness' : IDL.Nat,
    'owner' : IDL.Tuple(IDL.Principal, IDL.Principal),
    'createTime' : IDL.Text,
    'state' : PetState,
    'image' : IDL.Text,
    'price' : IDL.Nat,
  });
  const EventType = IDL.Variant({
    'buy' : IDL.Null,
    'abandon' : IDL.Null,
    'sell' : IDL.Null,
  });
  const EventState = IDL.Variant({
    'success' : IDL.Null,
    'waiting' : IDL.Null,
    'failed' : IDL.Null,
  });
  const Request = IDL.Record({
    'requestId' : IDL.Text,
    'tokenId' : TokenId__1,
    'sender' : IDL.Principal,
    'event' : EventType,
    'state' : EventState,
    'receiver' : IDL.Principal,
  });
  const UserProfile = IDL.Record({
    'id' : IDL.Principal,
    'tokenId' : IDL.Opt(TokenId__1),
    'balance' : IDL.Nat,
    'mate' : IDL.Opt(IDL.Principal),
  });
  const ActionType = IDL.Variant({ 'feed' : IDL.Null, 'play' : IDL.Null });
  const PetLove = IDL.Service({
    'abandonPet' : IDL.Func([TokenId], [IDL.Bool], []),
    'getAllPetsOnSelling' : IDL.Func([], [IDL.Vec(PetProfile)], []),
    'getAllPetsnotAdopted' : IDL.Func([], [IDL.Vec(PetProfile)], []),
    'getAllRequests' : IDL.Func([], [IDL.Vec(Request)], []),
    'getPetProfile' : IDL.Func([TokenId], [IDL.Opt(PetProfile)], []),
    'getUserProfile' : IDL.Func([], [IDL.Opt(UserProfile)], []),
    'interactWithPet' : IDL.Func([TokenId, ActionType], [IDL.Bool], []),
    'mint' : IDL.Func([], [IDL.Bool], []),
    'purchasePet' : IDL.Func([IDL.Principal, TokenId], [IDL.Bool], []),
    'randomGeneratePet' : IDL.Func([], [PetProfile], []),
    'reponseACK' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'reponseNAK' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'sellPet' : IDL.Func([TokenId, IDL.Nat], [IDL.Bool], []),
  });
  return PetLove;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
