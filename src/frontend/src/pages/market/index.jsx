import React, {useContext, useEffect} from 'react';
import {Menu} from "antd";

import './index.scss'
import NFTCard from "../../components/NFTCard";
import appContext from "../../api/context";
import {getAllPetsOnSelling, mint} from "../../api/backendApi";
import {reducerOperation} from "../../api/constant";



const MarketPage = () => {
    const context = useContext(appContext)
    useEffect(async ()=>{
        let market = await getAllPetsOnSelling(context.state.backendActor);
        context.dispatch({type:reducerOperation.setMarket,market})
    },[])
    const showData = context.state.market? context.state.market: Array(16).fill(context.state.defaultPet)
    return (
        <div className='market'>
            <Menu mode='horizontal' className='market-menu' defaultSelectedKeys={['0']}>
                <Menu.Item key='0'>New Born Pets</Menu.Item>
                <Menu.Item key='1'>Pets To Raise</Menu.Item>
                <Menu.Item key='2'>Festival Special List</Menu.Item>
            </Menu>
            <div className='market-content'>
                {
                    showData.length && showData.map((item, key) => (
                        <NFTCard nft={item} key={key}/>
                    ))
                }
            </div>
        </div>
    )
}

export default MarketPage