import * as React from "react";
import { render } from "react-dom";
import { 
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./login"
import RandomPet from "./mall/random-pet";
import PetMarket from "./mall/pet-market";
import PersonalCenter from "./personal/personal-center";

// Since we use HashRouter, the path for /random_pet, for instance,
// should be /#/random_set

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/random_pet" element={<RandomPet/>}/>
        <Route exact path="/pet_market" element={<PetMarket/>}/>
        <Route exact path="/personal" element={<PersonalCenter/>}/>
      </Routes>
    </Router>
  )
};
render(<App />, document.getElementById("app"));