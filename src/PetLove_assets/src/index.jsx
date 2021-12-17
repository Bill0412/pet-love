import * as React from "react";
import {render} from "react-dom";
import {
    HashRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Login from "./login";
import RandomPet from "./Mall/random-pet";
import PetMarket from "./Mall/pet-market";
import Pcenter from "./Personal/Pcenter";
import Landing from "./Landing/Landing";
import Circle from "./components/Backgournd/Circle";
import Footer from "./components/Footer/footer";
import {Slide} from "@mui/material";
import {useEffect, useState} from "react";
import TestPage from "./test";
import UserContext from "./Contexts/user-context";
import EmptyPet from "./Personal/EmptyPet/EmptyPet";
import './index.css';

// Since we use HashRouter, the path for /random_pet, for instance,
// should be /#/random_set

const userConfigInitial = require("../../../config/user.json");

const App = () => {

    const [user, setUser] = React.useState({
        ...userConfigInitial,
        principal: null,
        backendActor: null,
        tokenActor: null});

    const userValue = React.useMemo(
        () => ({user, setUser}), [user, setUser]
    );

    return (
        <div className="overall-div">
            <UserContext.Provider value={userValue}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Landing/>}/>
                        <Route exact path="/random_pet" element={<RandomPet/>}/>
                        <Route exact path="/pet_market" element={<PetMarket/>}/>
                        <Route exact path="/personal" element={<Pcenter/>}/>
                        {/*<Route exact path="/test" element={<EmptyPet/>}/>*/}
                    </Routes>
                </Router>
                <Circle bg={true}/>
                <Footer/>
            </UserContext.Provider>
        </div>
    )
};
render(<App/>, document.getElementById("app"));