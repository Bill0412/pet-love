import Stack from "@mui/material/Stack";
import {AwesomeButton} from "react-awesome-button";
import * as React from "react";
import {useState} from "react";
import "react-sweet-progress/lib/style.css";
import {Paper} from "@mui/material";
import './InfoCard.css';
import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
import styles from './InfoCard.css';

const InfoCard = () => {
    const falseDate = new Date()
    falseDate.setMonth(2)
    falseDate.setFullYear(2020)
    falseDate.setDate(21)
    const [adoptDate, adoptDateChanger] = useState(falseDate.toString())
    const [partner, partnerChanger] = useState("78D8F20BC79...")
    const [lastPrice, lastPriceChanger] = useState(1e+10)
    return (
        // <Stack
        //     direction="row"
        //     justifyContent="space-around"
        //     alignItems="center"
        //     height="80vh"
        //     maxWidth="50vw"
        //     spacing={1}
        // >
        //     <div className="content">
        //         <Stack
        //             direction="column"
        //             justifyContent="center"
        //             alignItems="center"
        //             // spacing={2}
        //         >
        //             <Stack spaceing={0}>
        //                 adopt:
        //             </Stack>
        //             <Stack>
        //                 age:
        //             </Stack>
        //
        //             <Stack>
        //                 partner:
        //             </Stack>
        //             <Stack>
        //                 Bought at:
        //             </Stack>
        //             <Stack>Operation: </Stack>
        //         </Stack>
        //         <Stack
        //             direction="column"
        //             justifyContent="center"
        //             alignItems="center"
        //             // spacing={2}
        //         >
        //             <Stack spaceing={0}>
        //                 {adoptDate}
        //             </Stack>
        //
        //             <Stack>
        //                 {(Date.now() - falseDate.getTime()) / 6000 / 60} Hours
        //             </Stack>
        //
        //             <Stack>
        //                 {partner}
        //             </Stack>
        //             <Stack>
        //                 {lastPrice} icp
        //             </Stack>
        //             <Stack direction="row"
        //                 // justifyContent="left"
        //                    alignItems="left"
        //                    spacing={2}>
        //                 <Stack>
        //                     <AwesomeButton type="primary" size="medium">Sell</AwesomeButton>
        //                 </Stack>
        //                 <Stack>
        //                     <AwesomeButton type="primary" size="medium">Abandon</AwesomeButton>
        //                 </Stack>
        //             </Stack>
        //
        //         </Stack>
        //
        //     </div>
        // </Stack>
        <Grid item container md={6} sm={12} xs={12} className="column">
            <Grid item container md={12} sm={12} xs={12} className="content">
                <div className="div-abs">My love path</div>
                <Grid container item md={6} className="sub-column" direction="column">
                    <div className="left-sub-block">
                        <div>Birthday:</div>
                    </div>
                    <div className="left-sub-block">
                        <div>Age:</div>
                    </div>
                    <div className="left-sub-block">
                        <div>Partner:</div>
                    </div>
                    <div className="left-sub-block">
                        <div>Value:</div>
                    </div>
                </Grid>
                <Grid container item md={6} className="sub-column" direction="column">
                    <div className="sub-block">
                        {/*{adoptDate}*/}
                        Sat Mar 21 2020 16:35:27
                    </div>
                    <div className="sub-block">{(Date.now() - falseDate.getTime()) / 6000 / 60} Hours</div>
                    <div className="sub-block">{partner}</div>
                    <div className="sub-block">{lastPrice} icp</div>
                </Grid>
            </Grid>
        </Grid>

    )
}

export default InfoCard;