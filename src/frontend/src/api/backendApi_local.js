import {PetLove} from "../../../declarations/PetLove";

export const abandonPet = async (backendActor, petId) =>{
    return await PetLove.abandonPet(petId).then(data =>data)
}
export const getAllPetsNotAdopted = async (backendActor)=>{
    return await PetLove.getAllPetsNotAdopted().then(data =>data)
}
export const getAllPetsOnSelling = async (backendActor)=>{
    return await PetLove.getAllPetsOnSelling().then(data =>data)
}
export const getAllRequests = async (backendActor)=>{
    return await PetLove.getAllRequests().then(data =>data)
}
export const getPetProfile = async (backendActor, petId)=>{
    return PetLove.getPetProfile(petId).then(data =>data)
}
export const getUserProfile = async (backendActor)=>{
    return PetLove.getUserProfile().then(data =>data)
}
export const interactWithPet = async (backendActor,petId, petOp)=>{
    return PetLove.interactWithPet(petId,petOp).then(data =>data)
}
export const purchasePet = async (backendActor, principal, petId) =>{
    return PetLove.purchasePet(principal,petId).then(data =>data)
}
export const randomGeneratePet = async (backendActor) =>{
    return PetLove.randomGeneratePet().then(data =>data)
}
export const responseACK = async (backendActor, requestId) =>{
    return PetLove.responseACK(requestId).then(data =>data)
}
export const responseNAK = async (backendActor, requestId) =>{
    return PetLove.responseNAK(requestId).then(data =>data)
}
export const sellPet = async (backendActor, petId, price) =>{
    return PetLove.sellPet(petId, price).then(data =>data)
}
