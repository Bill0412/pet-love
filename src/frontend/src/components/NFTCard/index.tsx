import React, {useContext} from 'react';

import {Image} from "antd";
import {HeartFilled, SketchOutlined, UserOutlined} from "@ant-design/icons";

import './index.scss';
import {randomInt} from "../../utils/random";
import {Link} from "react-router-dom";
import appContext from "../../api/context";
import {formatPrincipal} from "../../utils/fstring";

interface NFTCardProps {
    nft: {
        id: string
        name: string
        price: number
        owner: string
        image: string
    }
}

const NFTCard = (props: NFTCardProps) => {
    const {id, name, price, image} = props.nft
    // console.log(price)
    const owner = props.nft.owner[0]
    return (
        <div className='nftcard'>
            <Link to={{
                pathname: `/market/nft/${id}`
            }} state={{
                nft:props.nft
            }} >
                <div className='nftimage'>
                    <Image src={image} style={{background: '#F2E3DC'}} preview={false} placeholder={true}/>
                </div>
                <div className='nftinfo'>
                    <div className='nftinfo-item name'>{name}</div>
                    <div className='nftinfo-item type'>
                        <div className='type-name'>Cat</div>
                    </div>
                    <div className='nftinfo-item with-icon'>
                        <SketchOutlined style={{fontSize: '17px', marginRight: '8px'}}/>
                        {Number(price)}
                    </div>
                    <div className='nftinfo-item with-icon'>
                        <HeartFilled style={{fontSize: '17px', marginRight: '8px'}}/>
                        {randomInt(10, 300)}
                    </div>
                    <div className='nftinfo-owner with-icon' style={{marginTop: '18px'}}>
                        <UserOutlined style={{fontSize: '17px', marginRight: '8px'}}/>
                        {formatPrincipal(owner)+"..."}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default NFTCard