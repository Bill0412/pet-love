import Stack from "@mui/material/Stack";
import {AwesomeButton} from "react-awesome-button";
import * as React from "react";
import {useState} from "react";
import "react-sweet-progress/lib/style.css";
import {Paper} from "@mui/material";
import './InfoCard.css';
import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

const InfoCard = () => {
    const falseDate = new Date()
    falseDate.setMonth(2)
    falseDate.setFullYear(2020)
    falseDate.setDate(21)
    const [adoptDate, adoptDateChanger] = useState(falseDate.toString())
    const [partner, partnerChanger] = useState("78D8F20BC79539DB3F8B40796F6\nAC1A9122768C47A42CB960964D477E400D784")
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
                <Grid item md={6}>
                    123
                </Grid>
                <Grid item md={6}>
                    321
                </Grid>
            </Grid>
        </Grid>

    )
}

export default InfoCard;