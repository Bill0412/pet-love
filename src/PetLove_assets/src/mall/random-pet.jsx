import * as React from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ReplayIcon from '@mui/icons-material/Replay';
import GreenButton from "../components/green-button";
import PurchaseButton from "./components/purchase-button";
import ResponsiveAppBar from "../components/app-bar";
import PetImage from "../../assets/images/pets/1.png"
import UserContext from "../contexts/user-context"
import {PetLove} from "../../../declarations/PetLove";

const RandomPetContent = () => {
    const { principal, setPrincipal } = React.useContext(UserContext);
    const [pet, setPet] = React.useState();
    console.log("Random Pet principal: ", principal);

    const onGeneratePet = async () => {
        const petProfile = await PetLove.randomGeneratePet();
        console.log("onGeneratePet: ", petProfile);

        if(petProfile != null) {
            setPet(petProfile);
        }
    }

    // generate a pet on first load
    React.useEffect(() => { onGeneratePet(); }, []);

  return (
    <Grid container mt={10}>
      <Grid item xs={12} md={6}>
          <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
          <img src={PetImage} alt="Pet Image"/>
            &nbsp;
            <GreenButton startIcon={<ReplayIcon />} onClick={onGeneratePet}>
              See Other Pets
            </GreenButton>
          </Stack>
      </Grid>
      <Grid item xs={12} md={6} mt={14}>
        <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
          <p>Sale: 2 ICP</p>
          <p>Age: 0 Day</p>

          <PurchaseButton label="Choose me!" />
        </Stack>
      </Grid>
    </Grid>
  );
}

const RandomPet = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <RandomPetContent />
    </div>
  );
}

export default RandomPet;