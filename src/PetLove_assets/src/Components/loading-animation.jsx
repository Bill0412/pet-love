import Stack from "@mui/material/Stack";
import CircularProgress from '@mui/material/CircularProgress';
import * as React from "react";
import load from './assets/load-big.svg';

const LoadingAnimation = () => {
    return (
        <Stack sx={{ display: 'flex' }} alignItems="center">
            <img src={load} alt='Loading!'/>
        </Stack>
    )
};

export default LoadingAnimation;
