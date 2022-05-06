import {PetLove} from "../../../declarations/PetLove";
export const mint = async (backendActor)=>{
    return await PetLove.mint().then(data => data)
}
export const abandonPet = async (backendActor, petId) =>{
    return await backendActor.abandonPet(petId).then(data =>data)
}
export const getAllPetsNotAdopted = async (backendActor)=>{
    return await backendActor.getAllPetsNotAdopted().then(data =>data)
}
export const getAllPetsOnSelling = async (backendActor)=>{
    return await backendActor.getAllPetsOnSelling().then(data =>data)
}
export const getAllRequests = async (backendActor)=>{
    return await backendActor.getAllRequests().then(data =>data)
}
export const getPetProfile = async (backendActor, petId)=>{
    return backendActor.getPetProfile(petId).then(data =>data)
}
export const getUserProfile = async (backendActor)=>{
    return backendActor.getUserProfile().then(data =>data)
}
export const interactWithPet = async (backendActor,petId, petOp)=>{
    return backendActor.interactWithPet(petId,petOp).then(data =>data)
}
export const purchasePet = async (backendActor, principal, petId) =>{
    return backendActor.purchasePet(principal,petId).then(data =>data)
}
export const randomGeneratePet = async (backendActor) =>{
    return backendActor.randomGeneratePet().then(data =>data)
}
export const responseACK = async (backendActor, requestId) =>{
    debugger
    return backendActor.responseACK(requestId).then(data =>data)
}
export const responseNAK = async (backendActor, requestId) =>{
    return backendActor.responseNAK(requestId).then(data =>data)
}
export const sellPet = async (backendActor, petId, price) =>{
    return backendActor.sellPet(petId, price).then(data =>data)
}
