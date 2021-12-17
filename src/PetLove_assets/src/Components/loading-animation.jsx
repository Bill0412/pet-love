import * as React from "react";
import load from './assets/load-big.svg';
import {Grid} from "@mui/material";
import './loading-animation.css';

const LoadingAnimation = () => {
    return (
        <Grid container item direction="row" justifyContent="center" alignItems="center" className="loading-position">
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={6}>
                <img src={load} alt='Loading!'/>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
    )
};

export default LoadingAnimation;
