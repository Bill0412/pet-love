import React from 'react'
import {render} from "react-dom";

import {Routes, Route, HashRouter as Router} from "react-router-dom";

// context
import UserContext from "./context/user-context";

// pages
import MarketPlacePage from "./pages/market/Market";
import HomePage from "./pages/home/HomePage";
import ErrorPage from "./pages/error/ErrorPage";
import GoodDetailPage from "./pages/good/GoodDetailPage";
import PetDetailPage from "./pages/pet/PetDetail";
import UserPage from "./pages/user/User";

// components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// css
import './index.css'

const App = () => {
    return (
        <div>
            {/*<UserContext.Provider value={}>*/}
            <Router>
                <Header/>
                <div className="container">
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>
                        <Route exact path="/home" element={<HomePage/>}/>
                        <Route exact path="/market" element={<MarketPlacePage/>}/>
                        <Route path="/good/:id" element={<GoodDetailPage/>}/>
                        <Route path="/pet/:id" element={<PetDetailPage/>}/>
                        <Route exact path="/user" element={<UserPage/>}/>
                        <Route path="/*" element={<ErrorPage/>}/>
                    </Routes>
                </div>
            </Router>

            <Footer/>
            {/*</UserContext.Provider>*/}
        </div>
    )
};
render(<App/>, document.getElementById("app"));