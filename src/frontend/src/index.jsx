import React from 'react'
import {render} from "react-dom";

import {Routes, Route, HashRouter as Router} from "react-router-dom";
import HomePage from "./pages/home";

import './index.scss'
import {Layout} from "antd";
import HeaderComp from "./components/header";

const {Content} = Layout

const App = () => {
    return (
        <Layout>
            <Router>
                <HeaderComp />
                <Content className="container">
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>
                        <Route exact path="/home" element={<HomePage/>}/>
                        {/*<Route exact path="/market" element={<MarketPlacePage/>}/>*/}
                        {/*<Route path="/good/:id" element={<GoodDetailPage/>}/>*/}
                        {/*<Route path="/pet/:id" element={<PetDetailPage/>}/>*/}
                        {/*<Route exact path="/user" element={<UserPage/>}/>*/}
                        {/*<Route path="/*" element={<ErrorPage/>}/>*/}
                    </Routes>
                </Content>
            </Router>
        </Layout>
    )
};
render(<App/>, document.getElementById("app"));