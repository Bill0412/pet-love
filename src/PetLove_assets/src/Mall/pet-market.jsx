import * as React from "react";
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import itemData from './item-data';
import './pet-market.css';

import ResponsiveAppBar from "../components/app-bar";
import PurchaseButton from "./components/purchase-button";

const PetCard = (props) => {
    let item = props.item;

    return (
        <div className="mall-pet-card">
            <Stack direction="row" spacing={0} justifyContent="center" alignItems="center" sx={{flexWrap: 'wrap'}}>
                <div className="div-pet-image">
                    <Stack>
                        <img src={item.img} alt="Pet Image" className="card-image"/>
                    </Stack>
                </div>
                <Stack direction="column" alignItems="center" justifyContent="center" spacing={2}
                       className="pet-description">
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                        <Stack>sale: </Stack>
                        <Stack>{item.price} ICP</Stack>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                        <Stack>age: </Stack>
                        <Stack>{item.age} days</Stack>
                    </Stack>
                    <PurchaseButton label="Take me!"/>
                </Stack>
            </Stack>
        </div>
    )
};

const PetMarketContent = () => {
    const [itemsPerPage, setItemsPerPage] = React.useState(6);
    const [currentPage, setCurrentPage] = React.useState(1);


    const onChange = (event, page) => {
        setCurrentPage(page);
    }

    let nPages = Math.ceil(itemData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const items = itemData.slice(startIndex, endIndex);
    let eachCardWidth = 4, ofs = 2;
    let allColumns = eachCardWidth * 3 + ofs * 2;

    const RenderCard = (props) => {
        return (
            <Grid item xs={eachCardWidth} key={props.item.key}>
                <PetCard item={props.item}/>
            </Grid>
        )
    }

    return (
        <div className="mall-overall-height">
            <Grid container justifyContent="center" alignItems="center" direction="column" spacing={3}>
                <Grid container item justifyContent="center" alignItems="center" direction="row" spacing={3}
                      className="colum-card-row" columns={allColumns} style={{marginTop: '1%'}}
                >
                    <Grid item xs={ofs}/>
                    {[
                        <RenderCard item={items[0]}/>, <RenderCard item={items[1]}/>, <RenderCard item={items[2]}/>

                    ]}
                    <Grid item xs={ofs}/>
                </Grid>
                <Grid container item justifyContent="center" alignItems="center" direction="row" spacing={3}
                      className="colum-card-row" columns={allColumns}
                >
                    <Grid item xs={ofs}/>
                    {[
                        <RenderCard item={items[3]}/>, <RenderCard item={items[4]}/>, <RenderCard item={items[5]}/>
                    ]}
                    <Grid item xs={ofs}/>
                </Grid>

                <Grid item>
                    <Pagination count={nPages} onChange={onChange}/>
                </Grid>
            </Grid>
        </div>
    )
        ;
};

const PetMarket = () => {
    return (
        <div>
            <ResponsiveAppBar/>
            <PetMarketContent/>
        </div>
    );
};

export default PetMarket;