import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import './index.scss';
import {Image, Modal} from "antd";
import {HeartOutlined, SketchOutlined, UserOutlined} from "@ant-design/icons";
import {estimatePrice} from "../../utils/price";
import Input from "antd/es/input/Input";

const testData = {
    id: 0,
    name: 'Doggie',
    price: 16,
    owner: 'Andrew L.',
    minter: 'Andrew L.',
    birthday: '2021/12/15',
    imageUrl: 'https://bafybeiercnchpy27fencjvkw5rzxwfvzooknkpyci3mn7plo4q6xuu5asy.ipfs.dweb.link/17.png'
}

const NFTDetailPage = (props) => {

    const params = useParams()
    const {id} = params
    const [isModalVisible, setModalVisible] = useState(false)
    const [mateAddress, setMateAddress] = useState('')

    useEffect(() => {
        console.log(id)
    },[])

    function onPurchase() {
        setModalVisible(true)
    }

    function confirmPurchase() {
        setModalVisible(false);
        console.log(mateAddress)
    }

    return (
        <div className='outer'>
            <div className='nftdetail'>
                <div className='nftimage'>
                    <Image src={testData.imageUrl}/>
                </div>
                <div className='nftinfo-container'>
                    <div className='nftinfo'>
                        <div className='name'>{testData.name}</div>
                        <div className='minter'>
                            Created By
                            <div style={{marginLeft: '27px', display: 'flex', alignItems: 'center'}}>
                                {testData.minter}
                                <UserOutlined style={{fontSize: '17px', marginLeft: '4px'}}/>
                            </div>
                        </div>
                        <div className='divider'/>
                        <div className='price'>
                            <SketchOutlined style={{fontSize: '20px', marginRight: '4px'}}/>
                            {testData.price}
                            <div className='dollar'>(${estimatePrice(testData.price)})</div>
                        </div>
                        <div className='description'>
                            <div className='item'>
                                <div className='attr'>Gender</div>
                                <div className='value'>♂ Boy</div>
                            </div>
                            <div className='item'>
                                <div className='attr'>Type</div>
                                <div className='value'>Dog</div>
                            </div>
                            <div className='item'>
                                <div className='attr'>Level</div>
                                <div className='value'>Lv.0 New Born</div>
                            </div>
                            <div className='item'>
                                <div className='attr'>Birthday</div>
                                <div className='value'>{testData.birthday}</div>
                            </div>
                            <div className='item'>
                                <div className='attr'>Number</div>
                                <div className='value'>{testData.id}</div>
                            </div>
                        </div>
                        <div className='operation'>
                            <div className='buy' onClick={onPurchase}>Buy</div>
                            <div className='favorite'>
                                Favorites
                                <HeartOutlined style={{marginLeft: '8px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Confirm Purchase" visible={isModalVisible} onOk={confirmPurchase}
                   onCancel={() => setModalVisible(false)} okText='Send' cancelText='Cancel'>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width:'200px', height:'200px'}} src={testData.imageUrl}/>
                    <div>
                        <div style={{marginBottom: '8px'}}>Input your mate's address:</div>
                        <Input className='input' onChange={(e) => {
                            setMateAddress(e.target.value)
                        }}/>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default NFTDetailPage