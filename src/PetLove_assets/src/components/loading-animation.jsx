import Stack from "@mui/material/Stack";
import CircularProgress from '@mui/material/CircularProgress';
import * as React from "react";


const LoadingAnimation = () => {
    return (
        <Stack sx={{ display: 'flex' }} alignItems="center" mt={10} mb={100}>
            <CircularProgress />
        </Stack>
    )
};

export default LoadingAnimation;
