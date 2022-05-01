import React from 'react';

import './index.scss';
import {BellOutlined} from "@ant-design/icons";
import {formatDatetime} from "../../utils/fstring";

interface EventCardProps {
    event: {
        title: string,
        content: string,
        time: Date,
        type: number
    }
    key: number
}

const EventCard = (props: EventCardProps) => {
    const {title, content, type, time} = props.event


    return (
        <div className='event'>
            <BellOutlined style={{fontSize: '32px', marginRight: '20px'}}/>
            <div className='mid'>
                <div className='text'>{title}</div>
                <div className='text'>{content}</div>
            </div>
            <div className='right'>
                {formatDatetime(time)}
            </div>
        </div>
    )
}

export default EventCard;