import {
    reducerOperation,
    UTC2Date,
    happinessToLevel,
    getRandomName,
    contractPet2Local,
    contractEvent2local
} from "./constant";
import {act} from "react-dom/test-utils";

const reducer =  (state, action) => {
    let newState;
    switch (action.type) {
        case reducerOperation.login:
            newState = {
                ...state,
                backendActor: action.backendActor,
                tokenActor: action.tokenActor,
                userPrincipal:"0x"+action.principal.toHex(),
                userProfile: action.userProfile,
                login:true,
                defaultPet:contractPet2Local(state.defaultPet),
                event:contractEvent2local(action.requests)
            };
            break;
        case reducerOperation.getUserProfile:
            newState={
                ...state,
                userProfile: action.userProfile
            }
            break;
        case reducerOperation.setMarket:
            newState={
                ...state,
                market:action.market.map(ele => contractPet2Local(ele))
            }
            break;
        default:
            break;
    }
    return newState;
}

export {reducer};