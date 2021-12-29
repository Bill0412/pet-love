import React, {useState} from "react";
import './User.css';
import avatar from '../../avatar.png';
import {Tabs,Tab} from './VerticalTab';
import FeedRecord from "./user-components/feedRecord/FeedRecord";
import Profile from "./user-components/profile/Profile";
import MyPet from "./user-components/myPet/MyPet";
import Message from "./user-components/message/Message";
import Wallet from "./user-components/wallet/Wallet";

const tagName=['个人资料','我的宠物','最近消息','养宠记录','我的钱包']
const tagElement=[<Profile/>,<MyPet/>,<Message/>,<FeedRecord/>,<Wallet/>]




export default function UserPage() {
    const [nickName, setNickName]=useState("Nickname")
    // 0 for 个人资料
    // 1 for 我的宠物
    // 2 for 消息
    // 3 for 养宠物记录
    // 4 for 钱包
    const tabElements=[]
    for (const tagNameKey in tagName) {
        tabElements.push(
            <Tab label={tagName[tagNameKey]} >
                {tagElement[tagNameKey]}
            </Tab>
        )
    }
    return (
        <div>
            <div className="avatar-background-above">
                <div className="avatar-container">
                        <img src={avatar} alt="Avatar" className="user-center-avatar"/>
                    {nickName}
                </div>
            </div>
            <div className="avatar-background-below">
                <div className="below-main">
                    <Tabs>
                        {tabElements}
                    </Tabs>
                    </div>
                </div>
        </div>
    )
}