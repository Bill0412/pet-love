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

const Landing = (props) => {
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
                        <Stack>
                            <AwesomeButton type="secondary" >Join Now!!</AwesomeButton>
                        </Stack>

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