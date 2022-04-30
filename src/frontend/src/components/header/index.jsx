import React from 'react'
import {Image, Layout, Menu} from "antd";

import './index.scss'
import {LogoImage} from "../../../assets/images";
import PlugConnect from "@psychedelic/plug-connect/src/index";
import {canisterWhiteLists} from "../../config";
import {MailOutlined, UserOutlined} from "@ant-design/icons";

const {Header} = Layout

const HeaderComp = () => {

    const login = true;

    return (
        <Header className='header'>
            <div className='logo'>
                <Image className='logo-img' src={LogoImage} />
                <div className='logo-name'>Pet Love</div>
            </div>
            <Menu mode='horizontal' className='menu'>
                <Menu.Item>Home</Menu.Item>
                <Menu.Item>Market</Menu.Item>
                <Menu.Item>My Pet</Menu.Item>
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
                            onConnectCallback={() => console.log("Some callback")}
                        />
                    </>
                }
            </div>
        </Header>
    )

}

export default HeaderComp