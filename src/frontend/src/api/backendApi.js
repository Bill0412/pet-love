export const abandonPet = async (backendActor, petId) =>{
    return await backendActor.abandonPet(petId).then(data =>JSON.parse(data))
}
export const getAllPetsNotAdopted = async (backendActor)=>{
    return await backendActor.getAllPetsNotAdopted().then(data =>JSON.parse(data))
}
export const getAllPetsOnSelling = async (backendActor)=>{
    return await backendActor.getAllPetsOnSelling().then(data =>JSON.parse(data))
}
export const getAllRequests = async (backendActor)=>{
    return await backendActor.getAllRequests().then(data =>JSON.parse(data))
}
export const getPetProfile = async (backendActor, petId)=>{
    return backendActor.getPetProfile(petId).then(data =>JSON.parse(data))
}
export const getUserProfile = async (backendActor)=>{
    return backendActor.getUserProfile().then(data =>JSON.parse(data))
}
export const interactWithPet = async (backendActor,petId, petOp)=>{
    return backendActor.interactWithPet(petId,petOp).then(data =>JSON.parse(data))
}
export const purchasePet = async (backendActor, principal, petId) =>{
    return backendActor.purchasePet(principal,petId).then(data =>JSON.parse(data))
}
export const randomGeneratePet = async (backendActor) =>{
    return backendActor.randomGeneratePet().then(data =>JSON.parse(data))
}
export const responseACK = async (backendActor, requestId) =>{
    return backendActor.responseACK(requestId).then(data =>JSON.parse(data))
}
export const responseNAK = async (backendActor, requestId) =>{
    return backendActor.responseNAK(requestId).then(data =>JSON.parse(data))
}
export const sellPet = async (backendActor, petId, price) =>{
    return backendActor.sellPet(petId, price).then(data =>JSON.parse(data))
}
