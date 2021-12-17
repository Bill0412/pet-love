import Box from "@mui/material/Box";
import * as React from "react";
import {Grid} from "@mui/material";
import ResponsiveAppBar from "../../components/app-bar";
import './EmptyPet.css';

const EmptyPet = () => {
    return (
        <div>
            <div className="no-pet-father">
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={1}/>
                    <Grid item xs={10} container direction="column" justifyContent="center" alignItems="center">
                        <Grid item xs={8}>
                            <div className="no-pet-back"/>
                        </Grid>
                        <Grid item xs={8} className="no-pet-info">
                            Ooooops! <br/>
                            You don't have any pet yet!<br/>
                            Consider adopt one now!
                        </Grid>
                    </Grid>
                    <Grid item xs={1}/>
                </Grid>
            </div>
        </div>
    )
}

export default EmptyPet;
