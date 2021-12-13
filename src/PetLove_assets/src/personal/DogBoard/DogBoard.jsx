import './DogBoard.css';
import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import {Action, Fab} from "react-tiny-fab";
import {Progress} from "react-sweet-progress";
import {AwesomeButton} from "react-awesome-button";
import Grid from "@mui/material/Grid";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import * as React from "react";
import {Fade} from "@mui/material";

const DogBoard = () => {
    const [happiness, happinessChanger] = useState(23)
    const [fadeIn, setFadeIn] = useState(false)
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
    useEffect(() => {
        setInterval(() => {
            setFadeIn(true)
        }, 1000)
    }, [])
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
            <Fade timeout={2000} in={fadeIn}>
                <div className="fab-position">
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
                >
                    // The Action components are the "buttons" that appear when the Fab is open. You can use the
                    out-of-the-box Action
                    // component or you can use a custom component of any type and style it any way that you'd
                    like. The "text" prop
                    // is the popup label that appears when the Action component is hovered.
                    <Action
                        text="Feed"
                        onClick={() => {
                            console.log("Action Feed clicked")
                        }}
                    >
                        <RestaurantIcon/>
                    </Action>
                    <Action
                        text="Pet"
                        onClick={() => {
                            console.log("Action Pet Clicked")
                        }}
                    >
                        <SmartToyIcon/>
                    </Action>
                </Fab>
                </div>
            </Fade>
            <div className="div-background"/>
            <Fade in={fadeIn} timeout={2000}>
                <div className="div-progress">
                    <Progress percent={20}/>
                </div>
            </Fade>
            <Fade in={fadeIn} timeout={2000}>
                <div className="div-button">
                    <div className="div-subButton-left">
                        <AwesomeButton type="secondary" size="medium">Sell</AwesomeButton>
                    </div>
                    <div className="div-subButton-right">
                        <AwesomeButton type="secondary" size="medium">Drop</AwesomeButton>
                    </div>
                </div>
            </Fade>

        </Stack>
    )
}

export default DogBoard;