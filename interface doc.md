## 接口文档



public shared(msg) func getUserProfile() : async (?UserProfile)



public shared(msg) func getPetProfile(id : TokenId) : async (?PetProfile)



public shared(msg) func interactWithPet(id : TokenId, action : ActionType) : async (Bool)



public shared(msg) func randomGeneratePet() : async (PetProfile)



public shared(msg) func purchasePet(mate : Principal, pet : TokenId) : async (Bool)



public shared(msg) func sellPet(id : TokenId, price : Nat) : async (Bool)



public shared(msg) func abandonPet(pet : TokenId) : async (Bool)



public shared(msg) func reponseACK(requestId : Text) : async (Bool)



public shared(msg) func reponseNAK(requestId : Text) : async (Bool)



public shared(msg) func getAllPetsOnSelling() : async ([PetProfile])



public shared(msg) func getAllPetsnotAdopted() : async ([PetProfile]) 



public shared(msg) func getAllRequests() : async ([Request])