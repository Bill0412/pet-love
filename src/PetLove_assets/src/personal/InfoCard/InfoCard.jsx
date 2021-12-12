import Stack from "@mui/material/Stack";
import {AwesomeButton} from "react-awesome-button";
import * as React from "react";
import {useState} from "react";
import "react-sweet-progress/lib/style.css";
import {Paper} from "@mui/material";
import './InfoCard.css';
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
        <div className="board">
            <div className="content">
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="left"
                    spacing={2}
                    // height="80vh"
                    // maxWidth="50vw"
                >
                    <Stack spaceing={0}>
                        adopt:{adoptDate}
                    </Stack>

                    <Stack>
                        age:{(Date.now() - falseDate.getTime()) / 6000 / 60} Hours
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
            </div>
        </div>
    )
}

export default InfoCard;