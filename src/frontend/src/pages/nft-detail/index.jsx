import React, {useContext, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import './index.scss';
import {Image, Modal} from "antd";
import {HeartOutlined, SketchOutlined, UserOutlined} from "@ant-design/icons";
import {estimatePrice} from "../../utils/price";
import Input from "antd/es/input/Input";
import appContext from "../../api/context";
import {purchasePet} from "../../api/backendApi";
import {formatPrincipal} from "../../utils/fstring";
import {Principal} from "@dfinity/principal";

const NFTDetailPage = () => {
    const nft = useLocation().state.nft
    const name = nft.name,price= Number(nft.price), owner = nft.owner[0], level = nft.level, birthday = nft.birthday, id = nft.id, image= nft.image
    // const {name, price, owner, image, level,birthday} = props.nft
    const [isModalVisible, setModalVisible] = useState(false)
    const [mateAddress, setMateAddress] = useState('')
    const context=useContext(appContext)

    function onPurchase() {
        setModalVisible(true)
    }

    async function confirmPurchase() {
        let buyResult = await purchasePet(context.state.backendActor,Principal.fromText(mateAddress),id)
        setModalVisible(false);
    }

    return (
        <div className='outer'>
            <div className='nftdetail'>
                <div className='nftimage'>
                    <Image src={image}/>
                </div>
                <div className='nftinfo-container'>
                    <div className='nftinfo'>
                        <div className='name'>{name}</div>
                        <div className='minter'>
                            Created By
                            <div style={{marginLeft: '27px', display: 'flex', alignItems: 'center'}}>
                                {formatPrincipal(owner)}
                                <UserOutlined style={{fontSize: '17px', marginLeft: '4px'}}/>
                            </div>
                        </div>
                        <div className='divider'/>
                        <div className='price'>
                            <SketchOutlined style={{fontSize: '20px', marginRight: '4px'}}/>
                            {price}
                            <div className='dollar'>(${estimatePrice(Number(price))})</div>
                        </div>
                        <div className='description'>
                            <div className='item'>
                                <div className='attr'>Gender</div>
                                <div className='value'>♂ Boy</div>
                            </div>
                            <div className='item'>
                                <div className='attr'>Type</div>
                                <div className='value'>Cat</div>
                            </div>
                            <div className='item'>
                                <div className='attr'>Level</div>
                                <div className='value'>{level}</div>
                            </div>
                            <div className='item'>
                                <div className='attr'>Birthday</div>
                                <div className='value'>{birthday}</div>
                            </div>
                            <div className='item'>
                                <div className='attr'>Number</div>
                                <div className='value'>{id}</div>
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
                    <Image style={{width:'200px', height:'200px'}} src={image}/>
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