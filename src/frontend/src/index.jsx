import React, {useReducer} from 'react'
import {render} from "react-dom";

import {Routes, Route, HashRouter as Router} from "react-router-dom";
import HomePage from "./pages/home";
import MarketPage from "./pages/market"
import NFTDetailPage from "./pages/nft-detail";

import './index.scss'
import {Layout} from "antd";
import HeaderComp from "./components/header";
import appContext from "./api/context";
import TestAPI from "./components/testApi";
import {reducer} from "./api/reducer";
import Home from "./pages/home";
import ErrorPage from "./pages/error";
import UserPage from "./pages/user";
import PetPage from "./pages/pet";
import {happinessToLevel, UTC2Date} from "./api/constant";

const {Content} = Layout

const pageWrapper = (inner) => {
    return (
        <div className='background'>
            <div className='header-wrapper'/>
            {inner}
        </div>
    )
}

const App = () => {
    const [state, dispatch] = useReducer(reducer,{
        'backendActor': null,
        'tokenActor': null,
        'userPrincipal':'',
        'userProfile': {
            matePrincipal:''
        },
        'login':false,
        'event':[{
            title: 'May 1st Labour Festival Limits!',
            content: 'Spend May Day with your  lovely pet.',
            time: new Date(),
            type: 0
        }, {
            title: 'Invitation from 0x1dasasdd2312312e211asdaswd1.',
            content: 'Come to adopt a pet 0 with me!',
            time: new Date(),
            type: 1 // 1 is an event to click
        }],
        onePet:{
            birthday:'birthday',
            level:'Very heigh level',
            id:"16514061131914830005",
            image:"https://bafybeiercqwuc2ws23fuse5zpvp2j754uaylpu7pvtmhjsrr353naylazq.ipfs.dweb.link/6.png",
            owner:['', ''],
            price:10n,
            state:{notAdopted: null}
        }
    });
    return (
        <Layout>
            <Router>
                <appContext.Provider value={{state,dispatch}}>
                    <HeaderComp/>
                    <Content className="container">
                        <Routes>
                            <Route exact path="/" element={<HomePage/>}/>
                            <Route exact path="/home" element={<HomePage/>}/>
                            <Route exact path="/market" element={pageWrapper(<MarketPage/>)}/>
                            <Route path="/market/nft/:id" element={pageWrapper(<NFTDetailPage/>)}/>
                            <Route exact path="/pet" element={pageWrapper(<PetPage/>)}/>
                            <Route exact path="/user" element={<UserPage/>}/>
                            <Route exact path="/test" element={pageWrapper(<TestAPI/>)}/>
                            <Route path="/*" element={pageWrapper(<ErrorPage />)}/>
                        </Routes>
                    </Content>
                </appContext.Provider>
            </Router>
        </Layout>
    )
};
render(<App/>, document.getElementById("app"));