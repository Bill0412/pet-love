import config from "./whitelist.json";
import {idlFactory as backendFactory} from "../../../declarations/PetLove";
import {idlFactory as tokenFactory} from "../../../declarations/token";

export const getBackendActor = async ()=>{
    return await window.ic.plug.createActor({
        whitelist: [config.backendCanisterId],
        interfaceFactory: backendFactory
    }).then(data =>data)
}

export const getTokenActor=async ()=>{
    return await window.ic.plug.createActor({
        whitelist: [config.cryptoCanisterId],
        interfaceFactory: tokenFactory
    }).then(data => data)
}