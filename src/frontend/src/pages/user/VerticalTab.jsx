import React from "react";
import './tab.css';

class Tabs extends React.Component{
    state ={
        activeTab: this.props.children[0].props.label
    }
    changeTab = (tab) => {
        this.setState({ activeTab: tab });
    };
    render(){

        let content;
        let buttons = [];
        return (
            <div className="wrapper-tabs">
                {React.Children.map(this.props.children, child =>{
                    buttons.push(child.props.label)
                    if (child.props.label === this.state.activeTab) content = child.props.children
                })}

                <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab}/>
                <div className="tab-content">{content}</div>

            </div>
        );
    }
}

const TabButtons = ({buttons, changeTab, activeTab}) =>{

    return(
        <div className="tab-buttons">
            {buttons.map(button =>{
                return <button className={button === activeTab? 'active': ''} onClick={()=>changeTab(button)}>{button}</button>
            })}
        </div>
    )
}

const Tab = props =>{
    return(
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export {Tabs,Tab};
