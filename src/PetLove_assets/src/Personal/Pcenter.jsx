import * as React from "react";
import ResponsiveAppBar from "../components/app-bar";
import './Pcenter.css';
import "react-sweet-progress/lib/style.css";
import Grid from "@mui/material/Grid";
import 'react-tiny-fab/dist/styles.css';
import {Fade, Slide, Snackbar} from "@mui/material";
import {Principal} from "@dfinity/principal";
import UserContext from "../Contexts/user-context";
import {PetLove} from "../../../declarations/PetLove";
import LoadingAnimation from "../components/loading-animation";
import Stack from "@mui/material/Stack";
import "./InfoCard/InfoCard.css";
import "./DogBoard/DogBoard.css";
import {useEffect, useState} from "react";
import {Action, Fab} from "react-tiny-fab";
import {Progress} from "react-sweet-progress";
import {AwesomeButton} from "react-awesome-button";
import itemData from "../Mall/item-data";
import Modal from '@mui/material/Modal';
import ModalStyle from "../Mall/components/modal-style";
import Typography from '@mui/material/Typography';
import GreenButton from "../components/green-button";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SellIcon from '@mui/icons-material/Sell';
import ClearIcon from '@mui/icons-material/Clear';
import {CopyToClipboard} from "react-copy-to-clipboard";
import EmptyPet from "./EmptyPet/EmptyPet";

class Pcenter extends React.Component {
    static contextType = UserContext;

    state = {
        userProfile: null,
        petProfile: null,
        principalMate: null,
        isDataLoaded: false,
        isShowDepressed: false,
        isShowAbandonPrompt: false,
        isShowSellPrompt: false,
        isShowSellPriceSet: false,
        txtSellPrice: "",
        isShowInfoMsg: false,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        if (sessionStorage.getItem("principal")) {
            const {user, setUser} = this.context;
            const principal = Principal.fromText(sessionStorage.getItem("principal"));
            setUser((prevUser) => ({
                ...prevUser,
                principal: principal
            }));
            console.log("loaded principal from session storage")
            console.log(user)
            console.log(principal)

            const userProfiles = await user.backendActor.getUserProfile();
            console.log(userProfiles);

            if (userProfiles.length === 0) {
                console.log("No user profile is found.");
                this.setState({
                    isDataLoaded: true,
                    petProfile: null
                })
                return;
            }

            const userProfile = userProfiles[0];
            const petProfiles = await user.backendActor.getPetProfile(userProfile.tokenId[0]);

            if (petProfiles.length === 0) {
                console.log("Not pet profile is found for the user.");

                // this.setState({isUserOwnPet: false});
                return;
            }


            this.setState({
                userProfile: userProfile,
                petProfile: petProfiles[0],
                principalMate: userProfile.mate[0],
                isDataLoaded: true
            })
        }
        // TODO: redirect to login otherwise
    }

    updatePetProfile = async () => {
        const {user} = this.context;
        const petProfiles = await user.backendActor.getPetProfile(this.state.userProfile.tokenId[0]);
        this.setState({petProfile: petProfiles[0]});
    }

    DogBoard = () => {
        const [fadeIn, setFadeIn] = useState(false)
        const btnStyle = {
            "--button-default-height": "27px",
            "--button-default-font-size": "16px",
            "--button-default-border-radius": "25px",
            "--button-horizontal-padding": "24px",
            "--button-raise-level": "5px",
        }
        const progressTheme = {
            success: {
                symbol: '🏄‍',
                color: 'rgb(223, 105, 180)'
            },
            active: {
                symbol: '😀',
                color: '#fbc630'
            },
            default: {
                symbol: '😱',
                color: '#fbc630'
            }
        }
        setInterval(() => {
            setFadeIn(true)
        }, 1000)
        return (
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                height="80vh"
                maxWidth="50vw"
                spacing={1}
                className="dog-back"
            >

                <div className="div-background"
                     style={{backgroundImage: "url(" + itemData[parseInt(this.state.petProfile.image)].img + ")"}}>
                    <Fade timeout={2000} in={fadeIn}>
                        <div>
                            <Fab
                                // mainButtonStyles={mainButtonStyles}
                                // actionButtonStyles={actionButtonStyles}
                                // style={styles.floatBtn}
                                icon={<div>+</div>}
                                // event={event}
                                alwaysShowTitle={true}
                                onClick={() => {
                                    console.log("Fab clicked")
                                }}
                                style={{position: "absolute", bottom: "-20%", right: "-20%"}}
                            >
                                // The Action components are the "buttons" that appear when the Fab is open. You can use
                                the
                                out-of-the-box Action
                                // component or you can use a custom component of any type and style it any way that
                                you'd
                                like. The "text" prop
                                // is the popup label that appears when the Action component is hovered.
                                <Action
                                    text="Sell"
                                    onClick={
                                        () => {
                                            this.setState({isShowSellPrompt: true});
                                        }
                                    }
                                >
                                    <SellIcon/>
                                </Action>
                                <Action
                                    text="Abandon"
                                    onClick={
                                        () => {
                                            this.setState({isShowAbandonPrompt: true});
                                        }
                                    }
                                >
                                    <ClearIcon/>
                                </Action>
                            </Fab>
                        </div>
                    </Fade>
                </div>
                <Fade in={fadeIn} timeout={2000}>
                    <div className="div-progress">
                        <Progress percent={parseInt(this.state.petProfile.happiness)}/>
                    </div>
                </Fade>
                <Fade in={fadeIn} timeout={2000}>
                    <div className="div-button">
                        <div className="div-subButton-left">
                            <AwesomeButton
                                type="primary"
                                style={btnStyle}
                                size="large"
                                onPress={
                                    async () => {
                                        const {user} = this.context;
                                        let success =
                                            await user.backendActor.interactWithPet(this.state.petProfile.id, {feed: null});
                                        if (success) {
                                            this.setState({
                                                isShowInfoMsg: true,
                                                txtInfoMsg: "Thanks for feeding me! I'm growing faster and happier!"
                                            })
                                            await this.updatePetProfile();
                                        }
                                    }
                                }
                            >Feed</AwesomeButton>
                        </div>
                        <div className="div-subButton-right">
                            <AwesomeButton
                                type="primary"
                                style={btnStyle}
                                size="large"
                                onPress={
                                    async () => {
                                        const {user} = this.context;
                                        let success =
                                            await user.backendActor.interactWithPet(this.state.petProfile.id, {play: null});
                                        if (success) {
                                            this.setState({
                                                isShowInfoMsg: true,
                                                txtInfoMsg: "Thanks for playing with me! I'm growing happier!"
                                            })
                                            await this.updatePetProfile();
                                        }
                                    }
                                }
                            >Play</AwesomeButton>
                        </div>
                    </div>
                </Fade>
            </Stack>
        )
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
        if (hours > 1) txtHours += "s";
        const [openSnack, changeOpenSnack] = useState(false)
        return (
            <Grid item container md={12} sm={12} xs={12} className="content">
                <div className="div-abs">My love path</div>
                <Grid container item md={6} className="sub-column" direction="column">
                    <div className="left-sub-block">
                        <div>Birthday</div>
                    </div>
                    <div className="left-sub-block">
                        <div>Age</div>
                    </div>
                    <div className="left-sub-block">
                        <div>Partner</div>
                    </div>
                    <div className="left-sub-block">
                        <div>Value</div>
                    </div>
                </Grid>
                <Grid container item md={6} className="sub-column" direction="column">
                    <div className="sub-block">
                        {petCreateTime}
                    </div>
                    <div className="sub-block">{txtHours}</div>
                    <div className="partner">
                        <CopyToClipboard
                            // options={{debug: props.debug, message: ""}}
                            text={this.state.principalMate ? this.state.principalMate.toText() : ''}
                            onCopy={
                                () => {
                                    // console.log(this.state.principalMate)
                                    changeOpenSnack(true);
                                    setInterval(
                                        () => {
                                            changeOpenSnack(false)
                                        }, 1500
                                    )
                                }
                            }
                        >
                            <span> {this.state.principalMate.toText().substr(0, 25) + "..."}
                            </span>
                        </CopyToClipboard>
                        <Snackbar
                            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                            open={openSnack}
                            onClick={() => {
                                changeOpenSnack(false)
                            }}
                            message="Copied!"
                            key={"bottom" + "right"}
                            autoHideDuration={1500}
                        />
                    </div>
                    <div className="sub-block">{this.state.petProfile.price.toString()} QBit</div>
                </Grid>
            </Grid>
        )
    }

    Body = () => {
        const {user} = this.context;
        const isLoggedIn = user != null && user.principal != null;
        return (
            <div>
                <Grid container>
                    <Slide in={isLoggedIn} unmountOnExit mountOnEnter direction="right" timeout={800}>
                        <Grid item md={6} sm={12} xs={12} className="column">
                            <this.DogBoard/>
                        </Grid>
                    </Slide>

                    <Slide in={isLoggedIn} unmountOnExit mountOnEnter direction="left" timeout={800}>
                        <Grid item container md={6} sm={12} xs={12} className="column">
                            <this.InfoCard/>
                        </Grid>
                    </Slide>
                </Grid>
                <Modal
                    open={this.state.isShowAbandonPrompt}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Stack sx={ModalStyle} direciton="row" alignItems="center">
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            We don't want you to give up any pet. If you insist, you pet will be destroyed and lost
                            forever.
                        </Typography>
                        <Stack direction="row" mt={3} spacing={2} alignItems="center">
                            <GreenButton onClick={async () => {
                                const {user} = this.context;
                                const success = await user.backendActor.abandonPet(this.state.petProfile.id);

                                if (success) {
                                    // TODO: redirect to pet market or refresh the page

                                    this.setState({
                                        txtInfoMsg: "Successfully abandoned the pet, you don't have a pet now.",
                                        isShowInfoMsg: true,
                                        isShowAbandonPrompt: false,
                                        petProfile: null
                                    });

                                    return;
                                }

                                this.setState({isShowAbandonPrompt: false});
                            }}>
                                I Insist
                            </GreenButton>
                            <GreenButton onClick={() => {
                                this.setState({isShowAbandonPrompt: false});
                            }}>
                                Quit
                            </GreenButton>
                        </Stack>
                    </Stack>
                </Modal>
                <Modal
                    open={this.state.isShowSellPrompt}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Stack sx={ModalStyle} direciton="row" alignItems="center">
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            We don't want you to give up any pet. If you insist, you pet will be on sell in market.
                        </Typography>
                        <Stack direction="row" mt={3} spacing={2} alignItems="center">
                            <GreenButton onClick={async () => {
                                this.setState({
                                    isShowSellPrompt: false,
                                    isShowSellPriceSet: true
                                });
                            }}>
                                I Insist
                            </GreenButton>
                            <GreenButton onClick={() => {
                                this.setState({isShowSellPrompt: false});
                            }}>
                                Quit
                            </GreenButton>
                        </Stack>
                    </Stack>
                </Modal>
                <Modal
                    open={this.state.isShowSellPriceSet}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Stack sx={ModalStyle} direciton="row" alignItems="center">
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            <Stack orientation="column" spacing={2}>
                                <div>How much do you want to sell it?</div>
                                <Stack orientation="row" spacing={2} justifyContent="center" alignItems="center">
                                    <TextField
                                        size="small"
                                        required
                                        // fullWidth
                                        id="outlined-required"
                                        onChange={(event) => {
                                            this.setState({txtSellPrice: event.target.value});
                                        }}
                                    />
                                    <div>icp</div>
                                </Stack>
                            </Stack>
                        </Typography>
                        <Stack direction="row" mt={3} spacing={2} alignItems="center">
                            <GreenButton onClick={async () => {
                                let price = 0;
                                try {
                                    price = parseInt(this.state.txtSellPrice);
                                } catch (err) {
                                    this.setState({
                                        isShowInfoMsg: true,
                                        txtMsg: "Please make sure you entered correct message.",
                                        isShowSellPriceSet: false
                                    });

                                    return;
                                }

                                const {user} = this.context;
                                const success = await user.backendActor.sellPet(this.state.petProfile.id, BigInt(price));

                                if (success) {
                                    this.setState({
                                        isShowInfoMsg: true,
                                        txtInfoMsg: "Your pet is now on sell!",
                                        isShowSellPriceSet: false
                                    })
                                } else {
                                    this.setState({
                                        isShowInfoMsg: true,
                                        txtInfoMsg: "Unable to sell your pet, please try again later.",
                                        isShowSellPriceSet: false
                                    })
                                }
                            }}>
                                I Insist
                            </GreenButton>
                            <GreenButton onClick={() => {
                                this.setState({isShowSellPriceSet: false});
                            }}>
                                Quit
                            </GreenButton>
                        </Stack>
                    </Stack>
                </Modal>
                <Modal
                    open={this.state.isShowInfoMsg}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Stack sx={ModalStyle} direciton="row" alignItems="center">
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            {this.state.txtInfoMsg}
                        </Typography>
                        <Stack direction="row" mt={3} spacing={2} alignItems="center">
                            <GreenButton onClick={() => {
                                this.setState({isShowInfoMsg: false});
                            }}>
                                OK
                            </GreenButton>
                        </Stack>
                    </Stack>
                </Modal>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.context.user && <ResponsiveAppBar/>}

                {
                    this.state.isDataLoaded ?
                        (this.state.petProfile ? <this.Body/> : <EmptyPet/>)
                        : <Stack mt={10} mb={100}><LoadingAnimation/></Stack>
                }

            </div>
        )
    }
}

export default Pcenter;
