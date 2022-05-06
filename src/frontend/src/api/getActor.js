import {idlFactory as backendFactory} from "../../../declarations/PetLove";
import {idlFactory as tokenFactory} from "../../../declarations/token";
import {backendCanisterId} from '../config'
export const getBackendActor = async ()=>{
    return await window.ic.plug.createActor({
        canisterId: backendCanisterId,
        interfaceFactory: backendFactory
    }).then(data =>data)
}

export const getTokenActor=async ()=>{
    return await window.ic.plug.createActor({
        canisterId: backendCanisterId,
        interfaceFactory: tokenFactory
    }).then(data => data)
}