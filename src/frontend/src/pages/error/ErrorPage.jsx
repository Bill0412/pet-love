import React from 'react'
import {Link} from "react-router-dom";

export default function ErrorPage() {
    return (
        <div align="center" style={{minHeight: "1000px", backgroundColor: "#000", borderRadius: "15px", padding: "40px"}}>
            <h1 className="text-light">Page not found</h1><br />
            <p style={{textAlign:"center", color: "#FFF"}}>
                <i className="fas fa-exclamation-triangle" style={{fontSize: "158px"}}/>
                <h1 style={{textAlign:"center", color: "#FFF"}} className="fouro">404</h1>
                <Link to="/" style={{textAlign:"center", color: "#FFF", textDecoration: "white"}}>Go Back</Link>
            </p>
        </div>
    )
}