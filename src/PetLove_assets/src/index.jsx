import * as React from "react";
import { render } from "react-dom";
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./login";
import RandomPet from "./mall/random-pet";
import PetMarket from "./mall/pet-market";
import Pcenter from "./personal/Pcenter";
import Landing from "./Landing/Landing";
import Circle from "./components/backgournd/Circle";
import Footer from "./components/footer";
import {Slide} from "@mui/material";
import {useEffect, useState} from "react";
import TestPage from "./test";
import UserContext from "./contexts/user-context";


// Since we use HashRouter, the path for /random_pet, for instance,
// should be /#/random_set

const App = () => {

    const [user, setUser] = React.useState();

    const userValue = React.useMemo(
        () => ({user, setUser}), [user, setUser]
    );

    return (
        <UserContext.Provider value={userValue}>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Landing/>}/>
                    <Route exact path="/random_pet" element={<RandomPet/>}/>
                    <Route exact path="/pet_market" element={<PetMarket/>}/>
                    <Route exact path="/personal" element={<Pcenter/>}/>
                    <Route exact path="/landing" element={<Landing/>}/>
                    <Route exact path="/test" element={<TestPage/>}/>
                </Routes>
            </Router>
            <Circle bg={true} />
            <Footer />
        </UserContext.Provider>
    )
};
render(<App/>, document.getElementById("app"));