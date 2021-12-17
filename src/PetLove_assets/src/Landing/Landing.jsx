import * as React from 'react';
import Stack from '@mui/material/Stack';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonSocial,
} from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-rickiest.css';
import ExpandCircleDownTwoToneIcon from '@mui/icons-material/ExpandCircleDownTwoTone';
import './Landing.css';
import UserContext from '../Contexts/user-context';
import {Principal} from "@dfinity/principal";
import ResponsiveAppBar from "../components/app-bar";
import Typography from "@mui/material/Typography";
import GreenButton from "../components/green-button";
import Modal from "@mui/material/Modal";
import ModalStyle from "../Mall/components/modal-style";
import {useState} from "react";
import {Fade, Zoom} from "@mui/material";
import LoadingAnimation from "../components/loading-animation";
import {idlFactory} from "../../../declarations/PetLove";
import {idlFactory as idlTokenFactory} from "../../../declarations/token";
import { ConstructionOutlined } from '../../../../node_modules/@mui/icons-material/index';

class Landing extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            isShowInstallICWarning: false,
            isShowLoginLoading: false,
            introductionFade: false,
            subtitleFade: false,
            arrowFade: false,
            buttonFade: false,
        };
    }

    componentDidMount = () => {
        let introductionFade = false
        let subtitleFade = false
        let arrowFade = false
        let buttonFade = false
        let graphStart = 0, graDur = 1000
        let navStart = 0, navDur = 2500
        let introStart = 2000, introDur = 1500, interval = 500
        let subStart = introStart + introDur + interval, subDur = 1000
        let arrowStart = subStart + subDur + interval, arrowDur = 1000
        let buttonStart = arrowStart + arrowDur + interval, buttonDur = 500
        this.setState({
            introductionFade,
            subtitleFade,
            arrowFade,
            buttonFade,
            introDur,
            subDur,
            arrowDur,
            buttonDur,
            graDur
        })
        setInterval(
            () => {
                this.setState({introductionFade: true})
            }, introStart
        )
        setInterval(
            () => {
                this.setState({subtitleFade: true})
            }, subStart
        )
        setInterval(
            () => {
                this.setState({arrowFade: true})
            }, arrowStart
        )
        setInterval(
            () => {
                this.setState({buttonFade: this.context.user.principal == null})
            }, buttonStart)
        const {user, setUser} = this.context;
        if (user != null) return;
        if (sessionStorage.getItem("principal")) {
            setUser(Principal.fromText(sessionStorage.getItem("principal")));
        }
    }

    handleOpenInstallICWarning = () => {
        this.setState({isShowInstallICWarning: true});
    }

    handleCloseInstallICWarning = () => {
        this.setState({isShowInstallICWarning: false, isShowLoginLoading: false});
    };

    handleOpenLoginLoading = () => {
        this.setState({isShowLoginLoading: true});
    }

    handleCloseLoginLoading = () => {
        this.setState({isShowLoginLoading: false});
    }

    // TODO: fix when the user declines to connect with IC wallet, which error is generated asynchronously
    onClickLoginButton = async () => {
        // Show loading when the user is trying to allow connecting to IC wallet
        this.handleOpenLoginLoading();

        const {user, setUser} = this.context;

        // This is an official canister for user verification
        let whitelist = [];

        if(user.backendCanisterId) whitelist.push(user.backendCanisterId);
        if(user.cryptoCanisterId) whitelist.push(user.cryptoCanisterId);

        // Initialise Agent, expects no return value
        await window?.ic?.plug?.requestConnect({
            whitelist,
        });

        if (window.ic == null) {
            console.log("ic wallet is not installed yet.");
            this.handleOpenInstallICWarning();
            return;
        }

        // Create an actor to interact with the NNS Canister
        // we pass the NNS Canister id and the interface factory
        const backendActor = await window.ic.plug.createActor({
            canisterId: user.backendCanisterId,
            interfaceFactory: idlFactory,
        });
        console.log("backendActor:", backendActor);

        const tokenActor = await window.ic.plug.createActor({
            canisterId: user.cryptoCanisterId,
            interfaceFactory: idlTokenFactory
        });
        console.log("tokenActor:", tokenActor);

        // We can use any method described in the Candid (IDL)
        // for example the get_stats()
        // See https://github.com/dfinity/nns-dapp/blob/cd755b8/canisters/nns_ui/nns_ui.did
        // const stats = await actor.get_stats();
        // console.log('NNS stats', stats);

        // Get the user principal id
        const principal = await window.ic.plug.agent.getPrincipal();
        console.log("principal id:", principal);

        setUser((prevUser) => ({
            ...prevUser,
            principal: principal,
            backendActor: backendActor,
            tokenActor: tokenActor
        }));

        // in case the DOM refreshes
        sessionStorage.setItem("principal", principal.toText());

        tokenActor.mint(principal, BigInt(100));

        this.handleCloseLoginLoading();
    }

    Body = () => {
        const {user, setUser} = this.context;

        return (
            <Stack
                justifyContent="center"
                alignItems="center"
                spacing={0}
                minHeight="80vh"
            >
                <Stack
                    className="overall-box"
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Zoom in={true} timeout={this.state.graDur}>
                            <Stack className="main-title">
                                Pet<br/>Love
                            </Stack>
                        </Zoom>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >

                        <Zoom in={true} timeout={this.state.graDur}>
                            <Stack className="pack-img"/>
                        </Zoom>
                    </Stack>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="30vh"
                    spacing={3}
                >
                    <Fade in={this.state.introductionFade} timeout={this.state.introDur}>
                        <Stack className="introduction">
                            Share a cute pet with him/her<br/>
                            Pick a new dog in our mall<br/>
                            The Doggy is unique as the only proof of your love, <br/>
                            whose age witnesses the timelessness<br/>
                            Start your journey here<br/>
                        </Stack>
                    </Fade>
                    <Fade in={this.state.subtitleFade} timeout={this.state.subDur}>
                        <Stack className="subtitle">
                            A pet to witness love
                            {/*<br/>keep it with your lover<br/>*/}
                        </Stack>
                    </Fade>
                    {user.principal == null &&
                        <Fade in={this.state.arrowFade} timeout={this.state.arrowDur}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                <Stack><ExpandCircleDownTwoToneIcon color="primary" fontSize="large"/></Stack>
                                <Stack><ExpandCircleDownTwoToneIcon color="primary" fontSize="large"/></Stack>
                                <Stack><ExpandCircleDownTwoToneIcon color="primary" fontSize="large"/></Stack>
                            </Stack>
                        </Fade>
                    }
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="10vh"
                >
                    {user.principal == null &&
                        <Stack>
                            <Fade in={this.state.buttonFade} timeout={this.state.buttonDur}>
                                <Stack>
                                    <AwesomeButton type="secondary" onPress={this.onClickLoginButton}>Join
                                        Now!!</AwesomeButton>
                                </Stack>
                            </Fade>
                            <Modal
                                open={this.state.isShowInstallICWarning}
                                onClose={this.handleCloseInstallICWarning}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Stack sx={ModalStyle} direciton="row" alignItems="center">
                                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                                        Please install the chrome extension &nbsp;
                                        <a target="_blank"
                                           href="https://chrome.google.com/webstore/detail/plug/cfbfdhimifdmdehjmkdobpcjfefblkjm">
                                            Plug </a>
                                        &nbsp; and create your IC wallet in advance for login.
                                        (We use the wallet id as your only login credential.)
                                    </Typography>
                                    <Stack direction="row" mt={3} spacing={2} alignItems="center">
                                        <GreenButton onClick={this.handleCloseInstallICWarning}>OK</GreenButton>
                                    </Stack>
                                </Stack>
                            </Modal>
                            <Modal
                                open={this.state.isShowLoginLoading}
                                onClose={this.handleCloseLoginLoading}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <LoadingAnimation/>
                            </Modal>
                        </Stack>
                    }
                </Stack>
            </Stack>
        )
    }

    render = () => {
        const {user, setUser} = this.context;
        return (
            <div>
                {user.principal && <ResponsiveAppBar/>}
                <this.Body/>
            </div>
        )
    }
}

export default Landing;