import * as React from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ResponsiveAppBar from "../components/app-bar";


const PetMarketContent = () => {
  return (
    <div>
      <p>Pet Market Placeholder</p>
    </div>
  );
}

const PetMarket = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <PetMarketContent />
    </div>
  );
}

export default PetMarket;