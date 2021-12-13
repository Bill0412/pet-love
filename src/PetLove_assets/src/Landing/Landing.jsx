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

const Landing = (props) => {
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
                <AwesomeButton type="secondary">Join Now!!</AwesomeButton>
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
export default Landing;