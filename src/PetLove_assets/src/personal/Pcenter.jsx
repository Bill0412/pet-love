import * as React from "react";
import ResponsiveAppBar from "../components/app-bar";
import './Pcenter.css';
import "react-sweet-progress/lib/style.css";
import Grid from "@mui/material/Grid";
import 'react-tiny-fab/dist/styles.css';
import InfoCard from "./InfoCard/InfoCard";
import DogBoard from "./DogBoard/DogBoard";
import {Slide} from "@mui/material";

const Pcenter = (props) => {
    // const [checked, setChecked] = React.useState(true);
    const [login, setLogin] = React.useState(props.login)
    const [show, setsShow] = React.useState(login)
    React.useEffect(
        () => {
            setsShow(!show)
        }, [login]
    )
    return (
        <div>
            <ResponsiveAppBar/>
            {login ?
                (<Grid container spacing={-10}>
                    <Slide in={Boolean(login)} unmountOnExit mountOnEnter direction="right" timeout={800}>
                        <Grid item md={6} sm={12} xs={12} className="column">
                            <DogBoard/>
                        </Grid>
                    </Slide>

                    <Slide in={Boolean(login)} unmountOnExit mountOnEnter direction="left" timeout={800}>
                        <Grid item container md={6} sm={12} xs={12} className="column">
                            <InfoCard/>
                        </Grid>
                    </Slide>
                </Grid>) :
                <div>
                    Oooops, you need to login first!
                </div>
            }

        </div>

    );
}

export default Pcenter;
