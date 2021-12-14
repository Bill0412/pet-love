import * as React from "react";
import {render} from "react-dom";
import {
    HashRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import RandomPet from "./mall/random-pet";
import PetMarket from "./mall/pet-market";
import Pcenter from "./personal/Pcenter";
import Landing from "./Landing/Landing";
import Circle from "./components/backgournd/Circle";
import Footer from "./components/footer";
import ResponsiveAppBar from "./components/app-bar";
import {Slide} from "@mui/material";
import {useEffect, useState} from "react";


// Since we use HashRouter, the path for /random_pet, for instance,
// should be /#/random_set

const App = () => {
    return (
        <div>
            <Router>
                <Slide in={Boolean(true)} unmountOnExit mountOnEnter direction="down" timeout={2500}>
                    <div>
                        <ResponsiveAppBar/>
                    </div>
                </Slide>
                <Routes>
                    <Route exact path="/" element={<Landing/>}/>
                    <Route exact path="/random_pet" element={<RandomPet/>}/>
                    <Route exact path="/pet_market" element={<PetMarket/>}/>
                    <Route exact path="/personal" element={<Pcenter login={true}/>}/>
                    {/*<Route exact path="/landing" element={<Landing/>}/>*/}
                </Routes>
            </Router>
            <Circle bg={true}/>
            <Footer/>
        </div>
    )
};
render(<App/>, document.getElementById("app"));