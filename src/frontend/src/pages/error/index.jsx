import React from 'react';

import './index.scss';
import {Result} from "antd";

const ErrorPage = () => {

    return (
        <Result
            status="404"
            title="404 Not Found"
            subTitle="Sorry, This page is a default Error Page."
        />
    )
}

export default ErrorPage;