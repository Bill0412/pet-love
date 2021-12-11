import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import img_avatar from './static/Avatar.png';
import img_back from './static/back.png';
import ResponsiveAppBar from "../components/app-bar";
import "react-awesome-button/dist/styles.css";
import "./Landing.module.css"
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonSocial,
} from 'react-awesome-button';

const Landing = (props) => {
    const font1Anton = "'Anton', sans-serif";
    const font2Courgette = "'Courgette', cursive";
    const font3Smooch = "'Smooch', cursive";
    const stylesPress = createTheme({
        typography: {
            fontFamily: font1Anton,
            fontSize: 16,
            color:"#123456"
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
            fontFamily: font3Smooch,
            color: "orange"
        },
    });
    return (
        <div style={{margin: "auto"}}>
            <ResponsiveAppBar/>
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
                                <Typography variant="h1" component="div" gutterBottom className="main-title" >
                                    Pet Love
                                </Typography>
                            </Stack>
                            <Stack maxWidth="50vw">
                                <Avatar src={img_avatar} alt={"img_avatar"} sx={{width: 100, height: 100}}/>
                            </Stack>
                        </Stack>
                        <Stack>
                            <AwesomeButton
                                size="large"
                                type="secondary"

                            >
                                Join Now
                            </AwesomeButton>

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
                    <img src={img_back} alt="img_back"  />
                </Stack>
            </Stack>
        </div>)
}
export default Landing;