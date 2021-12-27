import React from 'react'

export default function Footer() {
    return (
        <footer id="mainfoot" className="main-foot page-footer bg-light rounded footer-adj" style={{display: "block"}}>
            <br />
            <p className="text-center"><img src="logo.png" border="0" height="100px" /><br /><br />Pet Love NFT Market on the Internet Computer<br /><span style={{fontSize: "13px"}}>Beta Version v0.2.0</span></p>
            <p className="text-center text-light foottxt">
                <a href="/#/home" target="_blank">HOME</a> • <a href="https://dfinity.org" target="_blank">IC DAPP</a> • <a href="https://twitter.com/abitroller" target="_blank">TWITTER</a> • <a href="https://www.zju.edu.cn" target="_blank">SCHOOL</a> • <a href="/" target="_blank">DOCS</a>
            </p>
        </footer>
    )
}