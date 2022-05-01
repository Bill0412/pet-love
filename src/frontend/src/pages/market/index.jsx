import React from 'react';
import {Menu} from "antd";

import './index.scss'
import NFTCard from "../../components/NFTCard";

const testData = Array(16).fill({
    id: 0,
    name: 'DoggieX',
    price: 16,
    owner: 'Andrew L.',
    imageUrl: 'https://bafybeiercnchpy27fencjvkw5rzxwfvzooknkpyci3mn7plo4q6xuu5asy.ipfs.dweb.link/17.png'
})

const MarketPage = () => {

    return (
        <div className='market'>
            <Menu mode='horizontal' className='market-menu' defaultSelectedKeys={['0']}>
                <Menu.Item key='0'>New Born Pets</Menu.Item>
                <Menu.Item key='1'>Pets To Raise</Menu.Item>
                <Menu.Item key='2'>Festival Special List</Menu.Item>
            </Menu>
            <div className='market-content'>
                {
                    testData.length && testData.map((item, key) => (
                        <NFTCard nft={item} key={key}/>
                    ))
                }
            </div>
        </div>
    )
}

export default MarketPage