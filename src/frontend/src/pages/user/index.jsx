import React, {useContext, useState} from 'react';
import Jazzicon from 'react-jazzicon';

import './index.scss';
import {randomJazzicon} from "../../utils/random";
import {formatPrincipal} from "../../utils/fstring";
import {Menu, Modal} from "antd";
import {useNavigate} from 'react-router-dom'
import EventCard from "../../components/eventCard";
import appContext from "../../api/context";
import {responseACK, responseNAK} from "../../api/backendApi";

const UserPage = () => {
    const navigate = useNavigate()
    const [selectedMenu, setSelectedMenu] = useState('0')
    const [isModalVisible, setModalVisible] = useState(false)
    const iconSeed = randomJazzicon()
    const context = useContext(appContext)
    const [item,setSelectedItem] = useState(null)
    function menuChange(e) {
        setSelectedMenu(e.key)
        if (e.key === '1') {
            navigate('/pet')
        }
    }

    function viewEvent(item) {
        setModalVisible(true)
        setSelectedItem(item)
    }

    async function confirmEvent() {
        if (item!==null){
            debugger
            let res = await responseACK(context.state.backendActor,item.eventId)
            console.log('ACK: ',res)
        }
        setModalVisible(false)
    }
    async function cancelEvent(){
        if (item!==null){
            let res = await responseNAK(context.state.backendActor,item.eventId)
            console.log('NAK: ',res)
        }
        setModalVisible(false)
    }


    return (
        <div className='background'>
            <div className='user-wrapper'/>
            <div className='profile'>
                <Jazzicon diameter={100} seed={iconSeed}/>
                <div className='principal'>{formatPrincipal(context.state.userPrincipal)}...</div>
            </div>
            <div className='user-main'>
                <Menu
                    defaultSelectedKeys={['0']}
                    mode="inline"
                    className='menu'
                    onSelect={menuChange}
                >
                    <Menu.Item key='0'>My Profile</Menu.Item>
                    <Menu.Item key='1'>My Pet</Menu.Item>
                    <Menu.Item key='2'>Message</Menu.Item>
                    <Menu.Item disabled>Pet Record</Menu.Item>
                    <Menu.Item disabled>My Wallet</Menu.Item>
                </Menu>

                {
                    selectedMenu === '2' ?
                        <div className='content-1'>
                            <div className='events'>
                                {context.state.event.length && context.state.event.map((item, key) => (
                                    <div key={key} onClick={() => viewEvent(item)}>
                                        <EventCard event={item} key={key} />
                                        <div className='divider'/>
                                    </div>
                                ))}
                            </div>
                        </div>
                        :
                        <div className='content-0'>
                            <div className='content-profile'>
                                <Jazzicon diameter={90} seed={iconSeed}/>
                                <div className='desc'>Adopt a pet with The One...</div>
                            </div>
                            <div className='info'>
                                <div className='item'>
                                    <div className='key'>Name</div>
                                    <div className='value'>{formatPrincipal(context.state.userPrincipal)}...</div>
                                </div>
                                <div className='item'>
                                    <div className='key'>Mate</div>
                                    <div className='value'>{formatPrincipal(context.state.userProfile.matePrincipal)}...</div>
                                </div>
                                <div className='item'>
                                    <div className='key'>Location</div>
                                    <div className='value'>China</div>
                                </div>
                            </div>
                        </div>
                }
            </div>
            <Modal title="Confirm your choice" visible={isModalVisible} onOk={confirmEvent}
                   onCancel={cancelEvent} okText='Confirm' cancelText='Cancel'>
                <div>Confirm the transaction?</div>
            </Modal>
        </div>
    )
}

export default UserPage;