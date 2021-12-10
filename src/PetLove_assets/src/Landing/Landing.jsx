import * as React from 'react';
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const Landing = (props) => {
    return (
        <div style={{ margin: "auto" }}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    minHeight="90vh"
                >
                    <Typography variant="h1" component="div" gutterBottom>
                        Pet Love
                    </Typography>
                    <Typography variant="h1" component="div" gutterBottom>
                        Avatar
                    </Typography>
                    <Typography variant="h1" component="div" gutterBottom>
                        Login
                    </Typography>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    minHeight="90vh"
                >
                    <Typography variant="h5" component="div" gutterBottom>
                        A pet to witness love <br />keep it with your lover
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom component="div">
                        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                        blanditiis tenetur
                    </Typography>
                    <Typography variant="h1" component="div" gutterBottom>
                        img here
                    </Typography>
                </Stack>
            </Stack>
        </div>)
}
export default Landing;