import React from 'react'
import {render} from "react-dom";

import {Routes, Route, HashRouter as Router} from "react-router-dom";
import HomePage from "./pages/home";
import MarketPage from "./pages/market"
import NFTDetailPage from "./pages/nft-detail";

import './index.scss'
import {Layout} from "antd";
import HeaderComp from "./components/header";
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
    return (
        <Layout>
            <Router>
                <HeaderComp />
                <Content className="container">
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>
                        <Route exact path="/home" element={<HomePage/>}/>
                        <Route exact path="/market" element={pageWrapper(<MarketPage/>)}/>
                        <Route path="/market/nft/:id" element={pageWrapper(<NFTDetailPage/>)}/>
                        {/*<Route path="/pet/:id" element={<PetDetailPage/>}/>*/}
                        {/*<Route exact path="/user" element={<UserPage/>}/>*/}
                        <Route path="/*" element={pageWrapper(<ErrorPage />)}/>
                    </Routes>
                </Content>
            </Router>
        </Layout>
    )
};
render(<App/>, document.getElementById("app"));