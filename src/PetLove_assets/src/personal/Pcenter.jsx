import * as React from "react";
import ResponsiveAppBar from "../components/app-bar";
import Stack from "@mui/material/Stack";
import './Pcenter.css';
import {useState} from "react";
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonSocial,
} from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-rickiest.css';
import {Progress} from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import Grid from "@mui/material/Grid";
import {Fab, Action} from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import InfoCard from "./InfoCard/InfoCard";

const Pcenter = () => {
    const [happiness, happinessChanger] = useState(23)
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
    return (
        <div>
            <ResponsiveAppBar/>
            <Grid container spacing={-10}>
                <Grid item md={6} sm={12} xs={12} className="column">
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        height="80vh"
                        maxWidth="50vw"
                        spacing={1}
                        className="dog-back"
                    >
                        <Fab
                            // mainButtonStyles={mainButtonStyles}
                            // actionButtonStyles={actionButtonStyles}
                            // style={styles.floatBtn}
                            style={{
                                position: "absolute",
                                marginLeft: "75%",
                                marginTop: "50%",
                                transform: "translateX(-75%) translateY(-50%)"
                            }}
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
                                text="Email"
                                onClick={() => {
                                    console.log("Action Email clicked")
                                }}
                            />
                            <Action
                                text="Help"
                                onClick={() => {
                                    console.log("Action Help Clicked")
                                }}
                            >
                                <i className="fa fa-help"/>
                            </Action>
                        </Fab>
                        <div className="div-background"/>
                        <div className="div-progress">
                            <Progress percent={20}/>
                        </div>
                        <div className="div-button">
                            <div className="div-subButton-left">
                                <AwesomeButton type="secondary" size="medium">Sell</AwesomeButton>
                            </div>
                            <div className="div-subButton-right">
                                <AwesomeButton type="secondary" size="medium">Drop</AwesomeButton>
                            </div>
                        </div>
                    </Stack>
                </Grid>
                <InfoCard/>
            </Grid>
        </div>

    );
}

export default Pcenter;
