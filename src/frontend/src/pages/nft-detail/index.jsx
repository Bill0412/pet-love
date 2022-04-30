import {Menu} from "antd";
import NFTCard from "../../components/NFTCard";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";

const NFTDetailPage = (props) => {

    const params = useParams()

    useEffect(() => {
      console.log(params)
    })

    return(
        <div className='background'>
            <div className='header-wrapper'/>
            123
        </div>
    )
}

export default NFTDetailPage