import React, {useState} from 'react'

import LazyLoad, {forceCheck} from 'react-lazyload';
import Img from "react-cool-img";
import {Link} from "react-router-dom";

const NFTCard = (props) => {
    let [size, setSize] = useState(props.size)

    // let [info, setInfo] = useState(props.info)
    let [info, setInfo] = useState({
        id: 123,
        name: "PetName"
    })

    return (
        <div className="col-md-2 card bg-light m-3 p-2" style={{
            width: size.width,
            height: size.height,
        }}>
            <LazyLoad height={300}>
                <div className="m-2 row" align="center">
                    <div className="col-6">
                        <span id={"count" + info.id}>0 </span>
                        <i className="fa fa-heart like" id={"like" + info.id}/>
                    </div>
                    <div className="col-6">
                        <span id={"counti" + info.id}>0 </span>
                        <i className="fas fa-gem ice" id={"ice" + info.id}/>
                    </div>
                </div>

                <Link to={{
                    pathname: `/good/${info.id}`,
                    // state: {name: "vikas"}
                }}>
                    <form onSubmit={(event) => {

                    }}>

                        <div className="col-auto max-250">
                            <div className="text-secondary idbadge" align="center">ID #{info.id}</div>
                            <Img alt="NFT" className="token rounded"
                                 src="card-img-placeholder.png" cache
                                 style={{backgroundColor: "#FFF"}}/>
                        </div>
                        <div className="m-2" align="center">{info.name}</div>
                    </form>
                </Link>
            </LazyLoad>
        </div>
    )
}

export default NFTCard;