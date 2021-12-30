import React from "react";
import './Message.css';

const Message=(props)=>{
    const testMessages= props.messages? props.messages:['test-message-1', 'test-message-2','test-message-3','test-message-4']
    return(
        <div className="message-container">
            {testMessages.map(
                element=>{
                    return(
                        <div className="message-box">
                            {element}
                        </div>
                    )
                }
            )}
        </div>
    )
}

export default Message;