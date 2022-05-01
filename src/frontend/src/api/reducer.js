import {reducerOperation} from "./constant";

const reducer =  (state, action) => {
    let newState;
    switch (action.type) {
        case reducerOperation.login:
            newState = {
                ...state,
                backendActor: action.backendActor,
                tokenActor: action.tokenActor,
                userPrincipal:action.principal
            };
            break;
        case reducerOperation.getUserProfile:
            newState={
                ...state,
                userProfile: 'await the api'
            }
            break;
        default:
            break;
    }
    console.log(action)
    console.log(newState)
    return newState;
}

export {reducer};