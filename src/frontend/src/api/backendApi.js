export const abandonPet = async (tokenActor, petId) =>{
    return await tokenActor.abandonPet(petId).then(data =>JSON.parse(data))
}
export const getAllPetsNotAdopted = async (tokenActor)=>{
    return await tokenActor.getAllPetsNotAdopted().then(data =>JSON.parse(data))
}
export const getAllPetsOnSelling = async (tokenActor)=>{
    return await tokenActor.getAllPetsOnSelling().then(data =>JSON.parse(data))
}
export const getAllRequests = async (tokenActor)=>{
    return await tokenActor.getAllRequests().then(data =>JSON.parse(data))
}
export const getPetProfile = async (tokenActor, petId)=>{
    return tokenActor.getPetProfile(petId).then(data =>JSON.parse(data))
}
export const getUserProfile = async (tokenActor)=>{
    return tokenActor.getUserProfile().then(data =>JSON.parse(data))
}
export const interactWithPet = async (tokenActor,petId, petOp)=>{
    return tokenActor.interactWithPet(petId,petOp).then(data =>JSON.parse(data))
}
export const purchasePet = async (tokenActor, principal, petId) =>{
    return tokenActor.purchasePet(principal,petId).then(data =>JSON.parse(data))
}
export const randomGeneratePet = async (tokenActor) =>{
    return tokenActor.randomGeneratePet().then(data =>JSON.parse(data))
}
export const responseACK = async (tokenActor, requestId) =>{
    return tokenActor.responseACK(requestId).then(data =>JSON.parse(data))
}
export const responseNAK = async (tokenActor, requestId) =>{
    return tokenActor.responseNAK(requestId).then(data =>JSON.parse(data))
}
export const sellPet = async (tokenActor, petId, price) =>{
    return tokenActor.sellPet(petId, price).then(data =>JSON.parse(data))
}
