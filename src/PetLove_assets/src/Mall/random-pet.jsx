import * as React from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ReplayIcon from '@mui/icons-material/Replay';
import { Principal } from '@dfinity/principal';
import GreenButton from "../components/green-button";
import PurchaseButton from "./components/purchase-button";
import LoadingAnimation from "../components/loading-animation";
import ResponsiveAppBar from "../components/app-bar";
import itemData from "./item-data";
import UserContext from "../Contexts/user-context";
import verifyConnection from "../Wallet/VerifyConnection";
import {idlFactory} from "../../../declarations/PetLove";
import { useRef } from "react";



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
        
        const {user, setUser} = this.context;
        
        console.log("backendCanisterId: ", user.backendCanisterId);
        // verifyConnection();

        const connected = await window.ic.plug.isConnected();
        if (!connected) {
            let whitelist = [];

            if(user.backendCanisterId) whitelist.push(user.backendCanisterId);
            if(user.cryptoCanisterId) whitelist.push(user.cryptoCanisterId);
            await window.ic.plug.requestConnect({ whitelist });
        }

        console.log("connected: ", connected);

        const petProfile = await user.backendActor.randomGeneratePet();
        console.log("onGeneratePet: ", petProfile);
        this.setState({pet: petProfile});
        
        const balance = await user.tokenActor.balanceOf(user.principal);
        setUser((prevUser) => ({...prevUser, chosenPet: petProfile, balance: parseInt(balance)}));
    }

    componentDidMount = async () => {
        const {user, setUser} = this.context;

        if(sessionStorage.getItem("principal")) {
            setUser((prevUser) => ({
                ...prevUser,
                principal: Principal.fromText(sessionStorage.getItem("principal"))
            }));
            console.log("loaded principal from session storage")
            this.onGeneratePet();
        }
        // TODO: redirect to login otherwise
    }

    Body = () => {
        const { user } = this.context;
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
                        <p>Balance: {user.balance} QBit</p>
                        <p>Sale: {this.state.pet.price.toString()} QBit</p>
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
                this.state.pet ? <this.Body /> : <Stack mt={10} mb={100}><LoadingAnimation /></Stack>
            }
            </div>

        )
    }
}

const RandomPet = () => {
  return (
      <div>
        <ResponsiveAppBar/>
        <RandomPetContent />
      </div>
  );
}

export default RandomPet;