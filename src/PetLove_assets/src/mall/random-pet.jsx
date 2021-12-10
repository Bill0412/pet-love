import * as React from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LeftMenu from "./left-menu";
import ResponsiveAppBar from "../components/app-bar";


const RandomPetRight = () => {
  return (
    <div>
      <img src="http://placekitten.com/500/600"/>
      &nbsp;
      <Stack spacing={2} direction="row" justifyContent="center">
        <Button variant="contained">Again</Button>
        <Button variant="contained">Adopt</Button>
      </Stack>
    </div>
  );
}

const RandomPet = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Grid container spacing={2}>
        <Grid item md={4}>
          <LeftMenu />
        </Grid>
        <Grid item md={8}>
          <RandomPetRight />
        </Grid>
      </Grid>
    </div>
  );
}

export default RandomPet;