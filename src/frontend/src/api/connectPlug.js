import {idlFactory as backendFactory} from '../../../declarations/PetLove/PetLove.did.js';
import {idlFactory as tokenFactory} from '../../../declarations/token/token.did.js';
var tokenActor=null,backendActor=null
const connect=async ()=>{
    const config = require("./whitelist.json");
    backendActor = await window.ic.plug.requestConnect({
        whitelist: [config.backendCanisterId],
        interfaceFactory:backendFactory
    });
    tokenActor = await window.ic.plug.requestConnect({
        whitelist: [config.cryptoCanisterId],
        interfaceFactory:tokenFactory
    });
    return [backendActor,tokenActor];
};
export {connect, tokenActor, backendActor};


