import {isNumber} from "util";

const reducerOperation = {
    login: 'login',
    getUserProfile: 'getUserProfile'
}
const petInteraction = {
    feed:'feed',
    play:'play'
}
const happinessToLevel= (num:bigint)=>{
    const mapping={
        0:'New Born',
        1:'Baby',
        2:'Kid',
        3:'Adolescent',
        4:'Adult',
        default: 'Senior'
    }

    return mapping[Number(num/BigInt(5))];
}

const UTC2Date= (timeStamp:string)=>{
    return new Date(Number(timeStamp)/1000000).toLocaleDateString('zh-CN');
}

const getRandomName=()=>{
    return "Tom";
}


export {reducerOperation,petInteraction, happinessToLevel, UTC2Date, getRandomName};