import React, {useState} from 'react'
import LazyLoad from "react-lazyload";
import {Link} from "react-router-dom";
import Img from "react-cool-img";

// Card for pet goods
export const GoodCard = (props) => {
    // let [info, setInfo] = useState(props.goodInfo)
    let [info, setInfo] = useState(props.goodInfo)

    return (
        <div className="col-md-2 card bg-light m-3 p-2">
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
                        <div className="m-2" align="center">Name: {info.name}</div>
                        <div className="m-2" align="center">Color: {info.color}</div>
                        <div className="m-2" align="center">Price: {info.price} Token</div>
                    </form>
                </Link>
            </LazyLoad>
        </div>
    )
}