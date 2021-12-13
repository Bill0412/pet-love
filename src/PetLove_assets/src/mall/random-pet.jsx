import * as React from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ReplayIcon from '@mui/icons-material/Replay';
import GreenButton from "../components/green-button";
import PurchaseButton from "./components/purchase-button";
import LoadingAnimation from "../components/loading-animation";
import ResponsiveAppBar from "../components/app-bar";
import itemData from "./item-data";
import UserContext from "../contexts/user-context"
import {PetLove} from "../../../declarations/PetLove";

class RandomPetContent extends React.Component {
    // principal is inside UserContext
    // References: 1. https://www.taniarascia.com/using-context-api-in-react/
    // 2. https://stackoverflow.com/questions/54496563/how-to-use-react-context-inside-function-of-class-component
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            pet: null
        }
    }

    onGeneratePet = async () => {
        const petProfile = await PetLove.randomGeneratePet();
        console.log("onGeneratePet: ", petProfile);

        if(petProfile != null) {
            this.setState({
                pet: petProfile
            });
        }
    }

    componentDidMount = () => {
        this.onGeneratePet();
    }

    Body = () => {
        return (
            <Grid container mt={10}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
                        <img src={itemData[this.state.pet.image].img} alt="Pet Image"/>
                        &nbsp;
                        <GreenButton startIcon={<ReplayIcon />} onClick={this.onGeneratePet}>
                            See Other Pets
                        </GreenButton>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6} mt={14}>
                    <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
                        <p>Sale: {this.state.pet.price.toString()} ICP</p>
                        <p>Age: {Math.floor((Date.now() - this.state.pet.createTime/1000000) / 1000 / 86400)} Day</p>
                        <PurchaseButton label="Choose me!"/>
                    </Stack>
                </Grid>
            </Grid>
        );
    }


    render = () => {
        return (
            <div>
            {
                this.state.pet ? <this.Body /> : <LoadingAnimation />
            }
            </div>

        )
    }
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