import * as React from 'react';
import Stack from '@mui/material/Stack';
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
                    <Stack direction="row"
                           justifyContent="center"
                           alignItems="center"
                           spacing={2}>
                        <Stack>
                            <h1 className="main-title">
                                Pet Love
                            </h1>
                        </Stack>
                    </Stack>
                    <Stack>
                        <div className="introduction">
                            In the pet love app, you can share a cute pet with your lover.<br/>
                            It is unique as proof of your love.<br/>
                            You will only have one puppy. <br/>
                            And its age will witness the longer your love lasts<br/>
                            When love breaks down, <br/>or you want to have a new dog, <br/>you can pick a new
                            dog in the mall.<br/>
                            Of course this is something we dont want to happen.<br/>
                            Now, start your love journey<br/>
                        </div>
                    </Stack>
                    <Stack>
                        <AwesomeButton type="secondary">Join Now!!</AwesomeButton>
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
                        <img src={img_back} alt="img_back"/>
                    </Stack>
                    <Stack>
                        <h5 className="subtitle">
                            A pet to witness love <br/>keep it with your lover
                        </h5>
                    </Stack>
                </Stack>
            </Stack>
        </Box>)
}
export default Landing;