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
import UserContext from '../contexts/user-context';
import {Principal} from "@dfinity/principal";
import ResponsiveAppBar from "../components/app-bar";
import Typography from "@mui/material/Typography";
import GreenButton from "../components/green-button";
import Modal from "@mui/material/Modal";
import ModalStyle from "../mall/components/modal-style";

class Landing extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            isShowInstallICWarning: false
        };
    }

    componentDidMount = () => {
        const { user, setUser } = this.context;
        if(user != null) return;
        if(sessionStorage.getItem("principal")) {
            setUser(Principal.fromText(sessionStorage.getItem("principal")));
        }
    }

    handleOpenInstallICWarning = () => {
        this.setState({isShowInstallICWarning: true});
    }

    handleCloseInstallICWarning = () => {
        this.setState({isShowInstallICWarning: false});
    };

    onClickLoginButton = async () => {
        // This is an official canister for user verification
        const nnsCanisterId = 'qoctq-giaaa-aaaaa-aaaea-cai'
        const whitelist = [nnsCanisterId];

        // Initialise Agent, expects no return value
        await window?.ic?.plug?.requestConnect({
            whitelist,
        });

        // A partial Interface factory
        // for the NNS Canister UI
        // Check the `plug authentication - nns` for more
        const nnsPartialInterfaceFactory = ({ IDL }) => {
            const BlockHeight = IDL.Nat64;
            const Stats = IDL.Record({
                'latest_transaction_block_height' : BlockHeight,
                'seconds_since_last_ledger_sync' : IDL.Nat64,
                'sub_accounts_count' : IDL.Nat64,
                'hardware_wallet_accounts_count' : IDL.Nat64,
                'accounts_count' : IDL.Nat64,
                'earliest_transaction_block_height' : BlockHeight,
                'transactions_count' : IDL.Nat64,
                'block_height_synced_up_to' : IDL.Opt(IDL.Nat64),
                'latest_transaction_timestamp_nanos' : IDL.Nat64,
                'earliest_transaction_timestamp_nanos' : IDL.Nat64,
            });
            return IDL.Service({
                'get_stats' : IDL.Func([], [Stats], ['query']),
            });
        };

        if(window.ic == null) {
            console.log("ic wallet is not installed yet.");
            this.handleOpenInstallICWarning();
            return;
        }

        // Create an actor to interact with the NNS Canister
        // we pass the NNS Canister id and the interface factory
        const NNSUiActor = await window.ic.plug.createActor({
            canisterId: nnsCanisterId,
            interfaceFactory: nnsPartialInterfaceFactory,
        });

        // We can use any method described in the Candid (IDL)
        // for example the get_stats()
        // See https://github.com/dfinity/nns-dapp/blob/cd755b8/canisters/nns_ui/nns_ui.did
        const stats = await NNSUiActor.get_stats();
        console.log('NNS stats', stats);

        // Get the user principal id
        const principal = await window.ic.plug.agent.getPrincipal();
        console.log("principal id:", principal);

        const { user, setUser } = this.context;
        setUser({principal: principal});

        // in case the DOM refreshes
        sessionStorage.setItem("principal", principal.toText());

        // const result = await window.ic.plug.requestBalance();
        // console.log(result);
    }

    Body = () => {
        const { user, setUser } = this.context;

        return (
            <Stack
                justifyContent="center"
                alignItems="center"
                spacing={0}
                minHeight="90vh"
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
                        <Stack
                            direction="column"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={2}
                            minHeight="40vh"
                            maxWidth="40vw"
                        >
                            <Stack className="main-title">
                                Pet<br/>Love
                            </Stack>
                            {/*<Stack className="introduction">*/}
                            {/*    In the pet love, you can share a cute pet with your lover.<br/>*/}
                            {/*    you can pick a new dog in our mall.<br/>*/}
                            {/*    It is unique as the only proof of your love.<br/>*/}
                            {/*    And its age will witness the length your love lasts.<br/>*/}
                            {/*    Now, start your love journey.<br/>*/}
                            {/*</Stack>*/}
                        </Stack>
                        <Stack
                            direction="column"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={0}
                            minHeight="40vh"
                            maxWidth="40vw"
                        >

                            <Stack className="pack-img">
                            </Stack>
                            {/*<Stack>*/}
                            {/*    <h5 className="subtitle">*/}
                            {/*        A pet to witness love <br/>keep it with your lover*/}
                            {/*    </h5>*/}
                            {/*</Stack>*/}
                        </Stack>
                    </Stack>
                </Stack>

                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="30vh"
                    spacing={3}
                >
                    <Stack className="introduction">
                        Share a cute pet with him/her<br/>
                        Pick a new dog in our mall<br/>
                        The Doggy is unique as the only proof of your love, <br/>
                        whose age witnesses the timelessness<br/>
                        Start your journey here<br/>
                    </Stack>
                    <Stack className="subtitle">
                        A pet to witness love <br/>keep it with your lover<br/>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Stack><ExpandCircleDownTwoToneIcon  color="primary"  fontSize="large"/></Stack>
                        <Stack><ExpandCircleDownTwoToneIcon  color="primary"  fontSize="large"/></Stack>
                        <Stack><ExpandCircleDownTwoToneIcon  color="primary"  fontSize="large"/></Stack>
                    </Stack>
                </Stack>
                {/*<Stack*/}
                {/*    direction="column"*/}
                {/*    justifyContent="center"*/}
                {/*    alignItems="center"*/}
                {/*    minHeight="20vh"*/}
                {/*    className="subtitle"*/}
                {/*>*/}

                {/*</Stack>*/}
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="10vh"
                >
                    { user == null &&
                        <Stack>
                            <AwesomeButton type="secondary" onPress={this.onClickLoginButton}>Join Now!!</AwesomeButton>
                            <Modal
                                open={this.state.isShowInstallICWarning}
                                onClose={this.handleCloseInstallICWarning}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Stack sx={ModalStyle} direciton="row" alignItems="center">
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
                        </Stack>
                    }
                </Stack>


                {/*<Stack*/}
                {/*    direction="column"*/}
                {/*    justifyContent="space-around"*/}
                {/*    alignItems="center"*/}
                {/*    spacing={2}*/}
                {/*    className="overall-box"*/}
                {/*>*/}
                {/*    <Stack*/}
                {/*        direction="row"*/}
                {/*        justifyContent="space-around"*/}
                {/*        alignItems="center"*/}
                {/*        spacing={2}>*/}
                {/*        <Stack className="main-title">*/}
                {/*            Pet<br/>Love*/}
                {/*        </Stack>*/}
                {/*        <Stack className="main-title">*/}
                {/*            <img src={img_back} alt="dogs"/>*/}
                {/*        </Stack>*/}
                {/*    </Stack>*/}
                {/*    <Stack*/}
                {/*        direction="row"*/}
                {/*        justifyContent="space-around"*/}
                {/*        alignItems="center"*/}
                {/*        spacing={2}>*/}
                {/*        <Stack className="introduction">*/}
                {/*            In the pet love, you can share a cute pet with your lover.<br/>*/}
                {/*            you can pick a new dog in our mall.<br/>*/}
                {/*            It is unique as the only proof of your love.<br/>*/}
                {/*            And its age will witness the length your love lasts.<br/>*/}
                {/*            Now, start your love journey.<br/>*/}
                {/*        </Stack>*/}
                {/*        <Stack className="subtitle">*/}
                {/*            A pet to witness love <br/>keep it with your lover*/}
                {/*        </Stack>*/}
                {/*    </Stack>*/}
                {/*    <Stack>*/}
                {/*        <AwesomeButton type="secondary">Join Now!!</AwesomeButton>*/}
                {/*    </Stack>*/}
                {/*</Stack>*/}
            </Stack>)
    }

    render = () => {
        const { user, setUser } = this.context;
        return (
            <div>
                {user && <ResponsiveAppBar /> }
                <this.Body />
            </div>
        )
    }
}
export default Landing;