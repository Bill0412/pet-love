import * as React from "react";
import './footer.css';
import {Grid} from "@mui/material";


const Footer = () => {
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" className="foot-wrapper">
            <Grid item xs={1}/>
            <Grid item xs={10} container direction="column" justifyContent="center" alignItems="center">
                <Grid item xs={8} className="">
                    Contact : jxphxufh@gmail.com
                </Grid>
                <Grid item xs={8}>
                    Copyright @ aBitRoller-ZJU
                </Grid>
            </Grid>
            <Grid item xs={1}/>
        </Grid>
        // <Footer style={{textAlign: 'center', position: "fixed", bottom: 0, width: "100%"}}>
        //     2021 Created HinsLiu - Course Material in ZJU Blockchain course
        // </Footer>
    )
}

export default Footer;


