import Stack from "@mui/material/Stack";
import {AwesomeButton} from "react-awesome-button";
import * as React from "react";
import {useState} from "react";
import {Progress} from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const InfoCard = () => {
    const falseDate = new Date()
    falseDate.setMonth(2)
    falseDate.setFullYear(2020)
    falseDate.setDate(21)
    const [adoptDate, adoptDateChanger] = useState(falseDate.toString())
    const [partner, partnerChanger] = useState("78D8F20BC79539DB3F8B40796F6AC1A9122768C47A42CB960964D477E400D784")
    const [lastPrice, lastPriceChanger] = useState(1e+10)
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="left"
            spacing={2}
            minHeight="90vh"
            width="50vw"
        >

            <Stack spaceing={0}>
                adopt:{adoptDate}
            </Stack>
            <Stack direction="row"
                // justifyContent="left"
                   alignItems="left"
                   spacing={2}>
                <Stack>
                    age:{(Date.now() - falseDate.getTime()) / 6000 / 60} Hours
                </Stack>
                <Stack>
                    <AwesomeButton type="primary" size="medium">Feed</AwesomeButton>
                </Stack>
                <Stack>
                    <AwesomeButton type="primary" size="medium">Play</AwesomeButton>
                </Stack>
            </Stack>
            <Stack>
                partner:{partner}
            </Stack>
            <Stack>
                Bought at {lastPrice} icp
            </Stack>
            <Stack direction="row"
                // justifyContent="left"
                   alignItems="left"
                   spacing={2}>
                <Stack>Operation: </Stack>
                <Stack>
                    <AwesomeButton type="primary" size="medium">Sell</AwesomeButton>
                </Stack>
                <Stack>
                    <AwesomeButton type="primary" size="medium">Abandon</AwesomeButton>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default InfoCard;