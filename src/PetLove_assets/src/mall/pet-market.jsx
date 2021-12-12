import * as React from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';



import ResponsiveAppBar from "../components/app-bar";
import PetImage from "../../assets/images/pets/1.png"
import PurchaseButton from "./components/purchase-button";

const PetCard = (props) => {
  let item = props.item;

  return (
    <Card>
      <Stack direction="row" spacing={0} justifyContent="space-evenly" sx={{ flexWrap: 'wrap' }}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <img src={item.img} alt="Pet Image" className="card-image"/>
        </Stack>
        <Stack direction="column" alignItems="center" justifyContent="center" spacing={2}>
            <p className="pet-detail-text">sale: {item.price} ICP</p>
            <p className="pet-detail-text">age: {item.age} days</p>
            <PurchaseButton label="Take me!" />
        </Stack>
      </Stack>
    </Card>
  );
};

const PetMarketContent = () => {
  const [itemsPerPage, setItemsPerPage] = React.useState(6);
  const [currentPage, setCurrentPage] = React.useState(1);

  const onChange = (event, page) => {
    setCurrentPage(page);
  }

  let nPages = Math.ceil(itemData.length / itemsPerPage);

  const startIndex= (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const items = itemData.slice(startIndex, endIndex);

  return (

    <Stack direction="column" mt={5}>
      <Box>
      <Grid container spacing={2}>
        {items.map(item =>
          <Grid item key={item.key} xs={12} sm={6} md={4}>
            <PetCard item={item} />
          </Grid>
        )}
      </Grid>
      </Box>
      <Box mt={10}>
        <Pagination count={nPages} onChange={onChange}></Pagination>
      </Box>
    </Stack>
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
for(let i = 0; i < 40; ++i) {
  itemData.push({
    key: i,
    img: PetImage,
    price: Math.floor(Math.random() * 10 + 1),
    age: Math.floor(Math.random() * 500 + 1)
  })
}

export default PetMarket;