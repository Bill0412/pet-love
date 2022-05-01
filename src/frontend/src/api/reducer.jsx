import config from "./whitelist.json";
import {idlFactory as backendFactory} from "../../../declarations/PetLove";
import {idlFactory as tokenFactory} from "../../../declarations/token";

const operation={
    login:'login',
    getUserProfile:'getUserProfile'
}
const reducer =  (state, action) => {
    let newState;
    switch (action.type) {
        case operation.login:
            newState = {
                backendActor: action.backendActor,
                tokenActor: action.tokenActor,
                userProfile: state.userProfile
            };
            break;
        case operation.getUserProfile:
            newState={
                backendActor:state.backendActor,
                tokenActor:state.tokenActor,
                userProfile: 'await the api'
            }
            break;
        default:
            break;
    }
    console.log(action)
    return newState;
}

export {reducer,operation};