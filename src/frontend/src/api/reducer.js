import {reducerOperation, UTC2Date, happinessToLevel, getRandomName} from "./constant";
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
                onePet:{
                    birthday:UTC2Date(action.onePet.createTime),
                    level:happinessToLevel(action.onePet.happiness),
                    name:action.onePet.name,
                    id:"16514061131914830005",
                    image:"https://bafybeiercqwuc2ws23fuse5zpvp2j754uaylpu7pvtmhjsrr353naylazq.ipfs.dweb.link/6.png",
                    owner:["0x"+action.principal.toHex(), "0x"+action.principal.toHex()],
                    price:10n,
                    state:{notAdopted: null}
                }
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
    return newState;
}

export {reducer};