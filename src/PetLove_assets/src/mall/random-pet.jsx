import * as React from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ResponsiveAppBar from "../components/app-bar";


const RandomPetContent = () => {
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
      <RandomPetContent />
    </div>
  );
}

export default RandomPet;