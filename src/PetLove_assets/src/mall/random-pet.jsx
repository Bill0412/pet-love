import * as React from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import ResponsiveAppBar from "../components/app-bar";
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GreenButton from "../components/green-button";

const RandomPetContent = () => {
  return (
    <Grid container mt={10}>
      <Grid item xs={12} md={6}>
        <div>
          <img src="http://placekitten.com/500/600"/>
          &nbsp;
          <Stack spacing={2} direction="row" justifyContent="center">
            <GreenButton startIcon={<ReplayIcon />}>
              See Other Pets
            </GreenButton>
          </Stack>
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        
      <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    minHeight="50vh"
                    maxWidth="30vw"
                >
        <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <p>Sale: 2 ICP</p>
          <p>Age: 0 Day</p>
          &nbsp;
          <GreenButton startIcon={<FavoriteIcon />}>Choose Me!</GreenButton>
        </Stack>
        </Stack>
      </Grid>
    </Grid>
    
  );
}

const RandomPet = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <RandomPetContent />
    </div>
  );
}

export default RandomPet;