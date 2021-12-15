import * as React from "react";
import {useNavigate} from "react-router-dom";
import ResponsiveAppBar from "../components/app-bar";
import './Pcenter.css';
import "react-sweet-progress/lib/style.css";
import Grid from "@mui/material/Grid";
import 'react-tiny-fab/dist/styles.css';
import DogBoard from "./DogBoard/DogBoard";
import {Slide} from "@mui/material";
import {Principal} from "@dfinity/principal";
import UserContext from "../contexts/user-context";
import {PetLove} from "../../../declarations/PetLove";
import LoadingAnimation from "../components/loading-animation";
import Stack from "@mui/material/Stack";
import "./InfoCard/InfoCard.css"


class Pcenter extends React.Component {
    static contextType = UserContext;

    state = {
        petProfile: null,
        principalMate: null,
        isDataLoaded: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        if(sessionStorage.getItem("principal")) {
            const { user, setUser } = this.context;
            const principal = Principal.fromText(sessionStorage.getItem("principal"));
            setUser((prevUser) => ({
                ...prevUser,
                principal: principal
            }));
            console.log("loaded principal from session storage")
            console.log(user)

            const userProfiles = await PetLove.getUserProfile(principal);

            if(userProfiles.length === 0) {
                console.log("No user profile is found.");
                return;
            }

            const userProfile = userProfiles[0];
            const petProfiles = await PetLove.getPetProfile(userProfile.tokenId[0]);

            console.log(userProfile);
            console.log(petProfiles);
            console.log(userProfile.mate[0].toText());


            this.setState({
                petProfile: petProfiles[0],
                principalMate: userProfile.mate[0],
                isDataLoaded: true
            })
        }
        // TODO: redirect to login otherwise
    }

    InfoCard = () => {
        const getTimeStr = (unixTimeStamp) => {
            const t = new Date(unixTimeStamp);
            return t.getFullYear().toString() + "." + (t.getMonth() + 1).toString() + "." + t.getDate().toString();
        }
        console.log(this.state.petProfile)
        const unixTimeStamp = Math.floor(parseInt(this.state.petProfile.createTime) / 1000000);
        let petCreateTime = getTimeStr(unixTimeStamp);

        const hours = Math.floor((Date.now() - unixTimeStamp) / 1000 / 3600);
        let txtHours = hours.toString() + " Hour";
        if(hours > 1) txtHours += "s";

        return(
            <Grid item container md={12} sm={12} xs={12} className="content">
                <div className="div-abs">My love path</div>
                <Grid container item md={6} className="sub-column" direction="column">
                    <div className="left-sub-block">
                        <div>Birthday:</div>
                    </div>
                    <div className="left-sub-block">
                        <div>Age:</div>
                    </div>
                    <div className="left-sub-block">
                        <div>Partner:</div>
                    </div>
                    <div className="left-sub-block">
                        <div>Value:</div>
                    </div>
                </Grid>
                <Grid container item md={6} className="sub-column" direction="column">

                    <div className="sub-block">
                        { petCreateTime }
                    </div>
                    <div className="sub-block">{ txtHours }</div>
                    <div className="sub-block">{this.state.principalMate.toText().substr(0, 25) + "..."}</div>
                    <div className="sub-block">{this.state.petProfile.price.toString()} ICP</div>
                </Grid>
            </Grid>
        )
    }

    Body = () => {
        const { user } = this.context;
        const isLoggedIn = user != null &&  user.principal != null;
        return (
            <div>
                <Grid container>
                    <Slide in={isLoggedIn} unmountOnExit mountOnEnter direction="right" timeout={800}>
                        <Grid item md={6} sm={12} xs={12} className="column">
                            <DogBoard/>
                        </Grid>
                    </Slide>

                    <Slide in={isLoggedIn} unmountOnExit mountOnEnter direction="left" timeout={800}>
                        <Grid item container md={6} sm={12} xs={12} className="column">
                            <this.InfoCard />
                        </Grid>
                    </Slide>
                </Grid>
            </div>
        );
    }

    render() {
        return (
            <div>
                <ResponsiveAppBar />
                {
                    this.state.isDataLoaded ? <this.Body /> : <Stack mt={10} mb={100}><LoadingAnimation /></Stack>
                }

            </div>
        )
    }
}

export default Pcenter;
