import React, {useContext, useReducer} from 'react'
import {render} from "react-dom";

import {Routes, Route, HashRouter as Router} from "react-router-dom";
import HomePage from "./pages/home";
import MarketPage from "./pages/market"
import NFTDetailPage from "./pages/nft-detail";

import './index.scss'
import {Layout} from "antd";
import HeaderComp from "./components/header";
import appContext from "./api/globalData";
import config from "./api/whitelist.json";
import {idlFactory as backendFactory} from "../../declarations/PetLove";
import {idlFactory as tokenFactory} from "../../declarations/token";
import TestAPI from "./components/testApi/testAPI";
import {reducer} from "./api/reducer";
import Home from "./pages/home";
import ErrorPage from "./pages/error";

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
        'userProfile': null
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
                            <Route exact path="/test" element={<TestAPI/>}/>
                            {/*<Route exact path="/user" element={<UserPage/>}/>*/}
                            <Route path="/*" element={pageWrapper(<ErrorPage />)}/>
                        </Routes>
                    </Content>
                </appContext.Provider>
            </Router>
        </Layout>
    )
};
render(<App/>, document.getElementById("app"));