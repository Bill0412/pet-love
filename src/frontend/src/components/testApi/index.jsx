import React, {useContext} from 'react'
import appContext from "../../api/context";
import './index.css'
const TestAPI = ()=>{
    const actors = useContext(appContext);
    return(
        <div>
            <button onClick={
                ()=>{console.log(actors)}
            } style={{"height":100,"width":100}} className="testApi-btn">
                点我打印actor
            </button>
        </div>
    )
}
export default TestAPI;