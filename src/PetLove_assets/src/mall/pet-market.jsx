import * as React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ResponsiveAppBar from "../components/app-bar";
import PetImage from "../../assets/images/pets/1.jpg"
import GreenButton from "../components/green-button";

const PetCard = (props) => {
  let item = props.item;

  return (
    <Stack direction="row" spacing={2}>
      <img src={item.img} alt="Pet Image" className="card-image"/>
      <Stack direction="column" alignItems="center" spacing={3}>
        <p>sale: {item.price} ICP</p>
        <p>age: {item.age} days</p>
        &nbsp;&nbsp;
        <GreenButton startIcon={<FavoriteIcon />}>Take Me!</GreenButton>
      </Stack>
    </Stack>
  );
};

const PetMarketContent = () => {
  return (
    <div>
      <ImageList cols={1} sx={{display: { md: 'none' }}}>
        {itemData.map((item) => (
          <ImageListItem key={item.key}>
            <PetCard item={item}/>
          </ImageListItem>
        ))}
      </ImageList>
      <ImageList spacing={4} cols={3} sx={{display: { xs: 'none', md: 'grid' }}}>
        {itemData.map((item) => (
          <ImageListItem key={item.key}>
            <PetCard item={item}/>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

const PetMarket = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <PetMarketContent />
    </div>
  );
};

// Should be replaced by data from backend
var itemData = [];
for(let i = 0; i < 16; ++i) {
  itemData.push({
    key: i,
    img: PetImage,
    price: Math.floor(Math.random() * 10 + 1),
    age: Math.floor(Math.random() * 500 + 1)
  })
}

export default PetMarket;