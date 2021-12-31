import React from "react";
import './Profile.css';
import PetIcon from "./petIcon/PetIcon";
import userAvatar from '../../../../avatar.png';

const Profile=(props)=>{
    return(
        <div className="profile-container">
            <div className="profile-left-container">
                <div className="profile-left-left-sub-container">
                    <div className="profile-text-p">Gender</div>
                    <div className="profile-text-p">Type</div>
                    <div className="profile-text-p">Level</div>
                    <div className="profile-text-p">主人</div>
                    <div className="profile-text-p">领养日期</div>
                    <div className="profile-text-p">出生日期</div>
                </div>
                <div className="profile-left-right-sub-container">
                    <div className="profile-text-p">♂Boy</div>
                    <div className="profile-text-p">Dog</div>
                    <div className="profile-text-p">a process bar</div>
                    <div className="profile-text-p profile-text-avatar">
                        <div className="profile-avatar-container">
                            <img src={userAvatar} alt="userAvatar" className="profile-avatar"/>
                        </div>
                        <div className="profile-avatar-container">
                            ❤
                        </div>
                        <div className="profile-avatar-container">
                            <img className="profile-avatar" src={userAvatar} alt="userAvatar"/>
                        </div>
                    </div>
                    <div className="profile-text-p">2021年12月30日</div>
                    <div className="profile-text-p">2021年12月30日</div>
                </div>
            </div>
            <div className="profile-right-container">
                <PetIcon/>
            </div>
        </div>
    )
}

export default Profile;