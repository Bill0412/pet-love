import React, {useContext} from 'react'
import {Image, Layout, Menu} from "antd";

import './index.scss'
import {LogoImage} from "../../../assets/images";
import PlugConnect from "@psychedelic/plug-connect/src/index";
import {canisterWhiteLists} from "../../config";
import {MailOutlined, UserOutlined} from "@ant-design/icons";
import appContext from "../../api/globalData";
import {operation} from "../../api/reducer";
import {getBackendActor, getTokenActor} from "../../api/getActor";

const {Header} = Layout

const HeaderComp = () => {
    const context= useContext(appContext)
    const login = false;

    return (
        <Header className='header'>
            <div className='logo'>
                <Image className='logo-img' src={LogoImage} preview={false}/>
                <div className='logo-name'>Pet Love</div>
            </div>
            <Menu mode='horizontal' className='menu'>
                <Menu.Item><a href='/#/home'>Home</a></Menu.Item>
                <Menu.Item><a href='/#/market'>Market</a></Menu.Item>
                <Menu.Item><a href='/#/user'>My Pet</a></Menu.Item>
                <Menu.Item><a href='/#/test'>Test</a></Menu.Item>
            </Menu>
            <div className='state'>
                { login ?
                    <>
                        <MailOutlined style={{fontSize: '24px', marginRight: '48px'}}/>
                        <UserOutlined style={{fontSize: '24px'}}/>
                    </> :
                    <>
                        <PlugConnect
                            whitelist={canisterWhiteLists}
                            onConnectCallback={async () => {
                                let backendActor = await getBackendActor()
                                let tokenActor = await getTokenActor()
                                context.dispatch({'type':operation.login,backendActor,tokenActor})
                            }}
                        />
                    </>
                }
            </div>
        </Header>
    )

}

export default HeaderComp