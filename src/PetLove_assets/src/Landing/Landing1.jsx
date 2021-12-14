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
import {Fade, Zoom} from "@mui/material";
import {useEffect, useState} from "react";

const Landing2 = (props) => {
    // const
    //introduction  1.5s  间隔0.5s  3`~
    //subtitle 1s  间隔0.5s   5`~
    //down arrow  1s  间隔0.5s  6.5`~
    //last button  0.5s  8`~
    const [introductionFade, changeIntroductionFade] = useState(false)
    const [subtitleFade, changeSubtitleFade] = useState(false)
    const [arrowFade, changeArrowFade] = useState(false)
    const [buttonFade, changeButtonFade] = useState(false)
    let graphStart = 0, graDur = 1000
    let navStart = 0, navDur = 2500
    let introStart = 2000, introDur = 1500, interval = 500
    let subStart = introStart + introDur + interval, subDur = 1000
    let arrowStart = subStart + subDur + interval, arrowDur = 1000
    let buttonStart = arrowStart + arrowDur + interval, buttonDur = 500
    useEffect(() => {
        setInterval(
            () => {
                changeIntroductionFade(true)
            }, introStart
        )
        setInterval(
            () => {
                changeSubtitleFade(true)
            }, subStart
        )
        setInterval(
            () => {
                changeArrowFade(true)
            }, arrowStart
        )
        setInterval(
            () => {
                changeButtonFade(true)
            }, buttonStart
        )
    }, [])
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
                    <Zoom in={true} timeout={graDur}>
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

                    <Zoom in={true} timeout={graDur}>
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
                <Fade in={introductionFade} timeout={introDur}>
                    <Stack className="introduction">
                        Share a cute pet with him/her<br/>
                        Pick a new dog in our mall<br/>
                        The Doggy is unique as the only proof of your love, <br/>
                        whose age witnesses the timelessness<br/>
                        Start your journey here<br/>
                    </Stack>
                </Fade>
                <Fade in={subtitleFade} timeout={subDur}>
                    <Stack className="subtitle">
                        A pet to witness love
                        {/*<br/>keep it with your lover<br/>*/}
                    </Stack>
                </Fade>
                <Fade in={arrowFade} timeout={arrowDur}>
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
            </Stack>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                minHeight="10vh"
            >
                <Fade in={buttonFade} timeout={buttonDur}>

                    <AwesomeButton type="secondary">Join Now!!</AwesomeButton>
                </Fade>
            </Stack>


        </Stack>)
}
export default Landing2;