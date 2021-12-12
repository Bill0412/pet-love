import * as React from "react";
import ResponsiveAppBar from "../components/app-bar";
import Stack from "@mui/material/Stack";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import './Pcenter.css';
import dogPortrait from './static/dogPortrait1.png';
import Box from "@mui/material/Box";
import InfoCard from "./InfoCard/InfoCard";
import {useState} from "react";
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonSocial,
} from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-rickiest.css';
import {Progress} from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const Pcenter = () => {
    const [happiness, happinessChanger] = useState(23)
    const theme = {
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
                    spacing={0}
                    minHeight="90vh"
                    width="30vw"
                ><Stack direction="column"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={1}>
                    <div className="div-background">
                        <Stack>
                            <div className="div-progress">
                                <Progress percent={20}/>
                            </div>
                        </Stack>
                    </div>

                </Stack>


                </Stack>
                <InfoCard/>
            </Stack>
        </div>

    );
}

export default Pcenter;