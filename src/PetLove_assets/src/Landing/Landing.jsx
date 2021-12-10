import * as React from 'react';
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import LoginBt from "./LoginBt/LoginBt";
import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import img from './static/Avatar.png'
import styles from './Landing.module.css';
import { StyledEngineProvider } from '@mui/material/styles';

const Landing = (props) => {
    const font1Anton = "'Anton', sans-serif";
    const font2Courgette = "'Courgette', cursive";
    const font3Smooch = "'Smooch', cursive";
    const stylesPress = createTheme({
        typography: {
            fontFamily: font1Anton,
            fontSize: 16
        },
        // button:{
        //     backgroundColor:"#a09dbf",
        //     width:"30vw",
        //     height:"30vh"
        // }
    });
    const styleCourgette = createTheme({
        typography: {
            fontFamily: font2Courgette,
            color: "orange"
        },
    });
    const styleSmooch = createTheme({
        typography: {
            fontFamily: font3Smooch,
            color: "orange"
        },
    });
    return (
        <div style={{margin: "auto"}}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={10}
            >
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    minHeight="90vh"
                    maxWidth="30vw"
                >
                    <ThemeProvider theme={stylesPress}>
                        <Stack direction="row"
                               justifyContent="center"
                               alignItems="center"
                               spacing={2}>
                            <Stack maxWidth="50vw">
                                <Typography variant="h1" component="div" gutterBottom color="orange">
                                    Pet Love
                                </Typography>
                            </Stack>
                            <Stack maxWidth="50vw">
                                <Avatar src={img} alt={"img"} sx={{width: 100, height: 100}}/>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Button
                                style={{backgroundColor:"#a09dbf",width:"200px",height:"100px"}}>
                                Join Now
                            </Button>

                        </Stack>
                    </ThemeProvider>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    minHeight="90vh"
                    maxWidth="30vw"
                >
                    <ThemeProvider theme={styleCourgette}>
                        <Typography variant="h5" component="div" gutterBottom>
                            A pet to witness love <br/>keep it with your lover
                        </Typography>
                    </ThemeProvider>
                    <ThemeProvider theme={styleSmooch}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            In the pet love app, you can share a cute pet
                            with your lover. It is unique as proof of your love
                            You will only have one puppy. And its age will
                            witness the longer your love lasts<br/>
                            When love breaks down, or you want to
                            have a new dog, you can pick a new dog in the
                            mall. Of course this is something we dont want
                            to happen.<b/>
                            Now, start your love journey
                        </Typography>
                    </ThemeProvider>
                    <Typography variant="h1" component="div" gutterBottom>
                        img here
                    </Typography>
                </Stack>
            </Stack>
        </div>)
}
export default Landing;