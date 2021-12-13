import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import img_back from './static/back.png';
import ResponsiveAppBar from "../components/app-bar";
import Box from "@mui/material/Box";
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonSocial,
} from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-rickiest.css';
import './Landing.css';
import UserContext from '../contexts/user-context';

const Landing = (props) => {
    // for style
    const font1Anton = "'Anton', sans-serif";
    const font2Courgette = "'Courgette', cursive";
    const font3Smooch = "'Smooch', cursive";
    const stylesPress = createTheme({
        typography: {
            fontFamily: font2Courgette,
            fontSize: 16,
            // color: "#123456"
        }
    });
    const styleCourgette = createTheme({
        typography: {
            fontFamily: font2Courgette,
            color: "orange"
        },
    });
    const styleSmooch = createTheme({
        typography: {
            fontFamily: "'RobotoTI', sans-serif",
            color: "orange"
        },
    });

    // for business logic
    const { principal, setPrincipal } = React.useContext(UserContext);

    let onClickLoginButton = async () => {
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
        const principalId = await window.ic.plug.agent.getPrincipal();
        console.log("principal id:", principalId);
        setPrincipal(principalId);
        sessionStorage.setItem("principal", JSON.stringify(principalId));

        // const result = await window.ic.plug.requestBalance();
        // console.log(result);
    }

    return (
        <Box className="overall-box">
            <ResponsiveAppBar/>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    minHeight="90vh"
                    maxWidth="40vw"
                >
                    <ThemeProvider theme={stylesPress}>
                        <Stack direction="row"
                               justifyContent="center"
                               alignItems="center"
                               spacing={2}>
                            <Stack>
                                <Typography variant="h1" component="div" gutterBottom className="main-title" color="#ef3473">
                                    Pet Love
                                </Typography>
                            </Stack>
                            {/*<Stack maxWidth="50vw">*/}
                            {/*    <Avatar src={img_avatar} alt={"img_avatar"} sx={{width: 100, height: 100}}/>*/}
                            {/*</Stack>*/}
                        </Stack>
                    </ThemeProvider>
                    <Stack>
                            <ThemeProvider theme={styleSmooch}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    In the pet love app, you can share a cute pet with your lover.<br/>
                                    It is unique as proof of your love.<br/>
                                    You will only have one puppy. <br/>
                                    And its age will witness the longer your love lasts<br/>
                                    When love breaks down, <br/>or you want to have a new dog, <br/>you can pick a new
                                    dog in the mall.<br/>
                                    Of course this is something we dont want to happen.<br/>
                                    Now, start your love journey<br/>
                                </Typography>
                            </ThemeProvider>
                        </Stack>
                    { principal == null &&
                        <Stack>
                            <AwesomeButton type="secondary" onPress={onClickLoginButton}>Join Now!!</AwesomeButton>
                        </Stack>
                    }

                </Stack>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                    minHeight="90vh"
                    maxWidth="40vw"
                >

                    <Stack spaceing={0}>
                        <img src={img_back} alt="img_back" />
                    </Stack>
                    <Stack>
                        <ThemeProvider theme={styleCourgette}>
                            <Typography variant="h5" component="div" gutterBottom>
                                A pet to witness love <br/>keep it with your lover
                            </Typography>
                        </ThemeProvider>
                    </Stack>
                </Stack>
            </Stack>
        </Box>)
}
export default Landing;