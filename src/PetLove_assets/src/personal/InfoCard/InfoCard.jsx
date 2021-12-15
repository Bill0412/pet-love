import {AwesomeButton} from "react-awesome-button";
import * as React from "react";
import {useEffect, useState} from "react";
import "react-sweet-progress/lib/style.css";
import './InfoCard.css';
import Grid from "@mui/material/Grid";

// This file is deprecated and InfoCard component is moed to Pcenter.jsx

// const InfoCard1 = () => {
//     const falseDate = new Date()
//     falseDate.setMonth(2)
//     falseDate.setFullYear(2020)
//     falseDate.setDate(21)
//     const [adoptDate, adoptDateChanger] = useState(falseDate.toString())
//     const [partner, partnerChanger] = useState("78D8F20BC79...")
//     const [lastPrice, lastPriceChanger] = useState(1e+10)
//     return ()
// }

export default class InfoCard extends React.Component {
    state = {
        adoptDate: '',
        partner: '',
        lastPrice: ''
    }

    componentDidMount() {
        this.setState({
            adoptDate: Date.now(),
            partner: "78D8F20BC79...",
            lastPrice: 1e+10
        })
    }

    render() {
        return (
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
                        <div className="sub-block">{(Date.now()) / 6000 / 60} Hours</div>
                        <div className="sub-block">{this.state.partner}</div>
                        <div className="sub-block">{this.state.lastPrice} icp</div>
                    </Grid>
                </Grid>
        )
    }
}