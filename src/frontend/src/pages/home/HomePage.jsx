import React, {Component} from 'react'
import {render} from "react-dom";

class HomePage extends Component {

    render() {
        if (document.body && document.getElementById("mainfoot")) {
            document.body.style.backgroundImage = "url(bg.jpg)";
            document.getElementById("mainfoot").style.display = "none";
        }

        return (
            <div>
                <h1>Home</h1>
            </div>
        )
    }
}

export default HomePage;