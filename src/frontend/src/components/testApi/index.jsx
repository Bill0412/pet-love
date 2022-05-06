import React, {useContext} from 'react'
import appContext from "../../api/context";
import './index.css';
import {
    getAllPetsNotAdopted,
    getAllPetsOnSelling,
    getAllRequests,
    getUserProfile,
    randomGeneratePet
} from "../../api/backendApi";
const TestAPI = ()=>{
    const context = useContext(appContext);
    return(
        <div>
            <button onClick={
                async ()=>{
                    let pets = await getAllPetsOnSelling(context.state.backendActor)
                    console.log(pets)
                }
            } style={{"height":100,"width":100}} className="testApi-btn">
                点我测试
            </button>
        </div>
    )
}
export default TestAPI;