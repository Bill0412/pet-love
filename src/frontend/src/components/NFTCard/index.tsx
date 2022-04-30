import React from 'react';

import {Image} from "antd";
import {PlaceHolderImage} from "../../../assets/images";
import {HeartFilled, SketchOutlined, UserOutlined} from "@ant-design/icons";

import './index.scss';
import {randomInt} from "../../utils/random";
import {Link} from "react-router-dom";

interface NFTCardProps {
    nft: {
        id: string
        name: string
        price: number
        owner: string
        imageUrl: string
    }
}

const NFTCard = (props: NFTCardProps) => {
    const {id, name, price, owner, imageUrl} = props.nft

    return (
        <div className='nftcard' >
            <Link to={{
                pathname: `/market/nft/${id}`,
                state: {
                    data: 1
                }
            }}>
                <div className='nftimage'>
                    <Image src={imageUrl} style={{background: '#F2E3DC'}} preview={false} placeholder={true}/>
                </div>
                <div className='nftinfo'>
                    <div className='nftinfo-item name'>{name}</div>
                    <div className='nftinfo-item type'>
                        <div className='type-name'>Dog</div>
                    </div>
                    <div className='nftinfo-item with-icon'>
                        <SketchOutlined style={{fontSize: '17px', marginRight: '8px'}}/>
                        {price}
                    </div>
                    <div className='nftinfo-item with-icon'>
                        <HeartFilled style={{fontSize: '17px', marginRight: '8px'}}/>
                        {randomInt(10, 300)}
                    </div>
                    <div className='nftinfo-owner with-icon' style={{marginTop: '18px'}}>
                        <UserOutlined style={{fontSize: '17px', marginRight: '8px'}}/>
                        {owner}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default NFTCard