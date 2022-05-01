import React, {useContext} from 'react'
import {connect} from "../../api/connectPlug";
import appContext from "../../api/globalData";
const TestAPI = ()=>{
    const actors = useContext(appContext);
    return(
        <div>
            <button onClick={connect}>
                连接plugin
            </button>
            <button onClick={
                ()=>{console.log(actors)}
            } style={{"height":100,"width":100}}>
                点我打印actor
            </button>
        </div>
    )
}
export default TestAPI;