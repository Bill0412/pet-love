import React, {useContext, useEffect, useState} from 'react'

import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import Jazzicon, {jsNumberForAddress} from 'react-jazzicon'; // icon for ethereum user
import UserContext from '../../context/user-context';

import './Header.css'
import {Principal} from "@dfinity/principal";
import {idlFactory} from "../../../../declarations/PetLove";
import {idlFactory as idlTokenFactory} from "../../../../declarations/token";
export default function Header() {
    const context = useContext(UserContext)
    const [user,setUser]=useState(context.user)
    let [verified, setVerified] = useState(false)
    const [account, setAccount] = useState({
        principal: "principal",
        QBit: "123",                // QBit
        cycle: "124",              // cycles
        token: "125.123213122312", // our token
        toDoNumber: "10",          // decision to do
    })

    useEffect(()=>{
        if (user != null) return;
        if (sessionStorage.getItem("principal")) {
            setUser(Principal.fromText(sessionStorage.getItem("principal")));
        }
    },[])

    let handleClickLoginBtn = async () => {
        // Show loading when the user is trying to allow connecting to IC wallet
        // this.handleOpenLoginLoading();



        // This is an official canister for user verification
        let whitelist = [];

        if(user.backendCanisterId) whitelist.push(user.backendCanisterId);
        if(user.cryptoCanisterId) whitelist.push(user.cryptoCanisterId);

        // Initialise Agent, expects no return value
        await window?.ic?.plug?.requestConnect({
            whitelist,
        });

        if (window.ic == null) {
            console.log("ic wallet is not installed yet.");
            // handleOpenInstallICWarning();
            //提示安装plug
            return;
        }

        // Create an actor to interact with the NNS Canister
        // we pass the NNS Canister id and the interface factory
        const backendActor = await window.ic.plug.createActor({
            canisterId: user.backendCanisterId,
            interfaceFactory: idlFactory,
        });
        console.log("backendActor:", backendActor);

        const tokenActor = await window.ic.plug.createActor({
            canisterId: user.cryptoCanisterId,
            interfaceFactory: idlTokenFactory
        });
        console.log("user:", user)
        console.log("tokenActor:", tokenActor);

        // We can use any method described in the Candid (IDL)
        // for example the get_stats()
        // See https://github.com/dfinity/nns-dapp/blob/cd755b8/canisters/nns_ui/nns_ui.did
        // const stats = await actor.get_stats();
        // console.log('NNS stats', stats);

        // Get the user principal id
        const principal = await window.ic.plug.agent.getPrincipal();
        console.log("principal id:", principal);

        setUser({
            principal: principal,
            backendActor: backendActor,
            tokenActor: tokenActor
        })
        context.user.principal = principal
        context.user.backendActor= backendActor
        context.user.tokenActor= tokenActor

        // in case the DOM refreshes
        sessionStorage.setItem("principal", principal.toText());

        tokenActor.mint(principal, BigInt(100000));

        // this.handleCloseLoginLoading();
        let balance=await tokenActor.balanceOf(user.principal).then(res => res.toString())
        setVerified(context.user.principal!=null)

        console.log(user.principal.toString())
        console.log(balance)

        setAccount((prevState) => ({
            ...prevState,
            principal: user.principal.toString(),
            QBit: balance+"",}))
        console.log(account)
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">
                <img alt="icon" className="icon-image d-inline-block align-top" src="petlove-logo.png"
                     style={{marginLeft: "10px", marginRight: "30px", maxHeight: "50px", maxWidth: "100px"}}/>{' '}
            </Navbar.Brand>

            <Navbar.Collapse id="responsive-navbar-nav">
                <>
                    <Nav className="me-auto">
                        <Nav.Link href="/#/market">
                            <input
                                type='submit'
                                className='btn btn-block btn-outline-light rounded '
                                value="Market 🪟"
                            />
                        </Nav.Link>

                        <Nav.Link href="/#/home">
                            <input
                                type='submit'
                                className='btn btn-block btn-outline-light rounded '
                                value="Search 🔎"
                            />
                        </Nav.Link>

                        <Nav.Link href="/#/user" target="_blank">
                            <input
                                type='submit'
                                className='btn btn-block btn-outline-light rounded '
                                value="MyLove 🌾"
                            />
                        </Nav.Link>

                        <NavDropdown title={
                            <span className="categorynav dropdown-menu-center"
                                  style={{paddingBottom: "10px"}}>
                                &nbsp;&nbsp;Categories <i className="fas fa-chevron-down"
                                                          style={{fontSize: "12px"}}/>&nbsp;&nbsp;
                            </span>
                        }
                                     id="collasible-nav-dropdown dropdown-menu-center"
                                     flip="true"
                                     style={{margin: "0px", marginTop: "3px"}}>

                            <NavDropdown.Item href="/">💸 Recently Purchased</NavDropdown.Item>
                            <NavDropdown.Item href="/">🎁 Recently Gifted</NavDropdown.Item>
                            <NavDropdown.Item href="/">🔨 Recently Minted</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/">🐧 Dolphin</NavDropdown.Item>
                            <NavDropdown.Item href="/">🐱 Cat</NavDropdown.Item>
                            <NavDropdown.Item href="/">🐶 Doge</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link href="https://dfinity.org/">
                            <input
                                type='submit'
                                className='btn btn-block btn-outline-light rounded '
                                value="IC More 💸"
                            />
                        </Nav.Link>

                    </Nav>

                    <Nav>

                        <Nav.Link>
                            <a
                                type='button'
                                className='btn login-btn'
                                onClick={handleClickLoginBtn}
                            >Login</a></Nav.Link>
                        <NavDropdown title={
                            <div style={{position: "relative", width: "38px", margin: "0 auto"}}>
                                <Jazzicon diameter={38} seed={Math.round(Math.random() * 10000000)}/>
                                {(verified === true) ? (
                                    <div style={{position: "absolute", bottom: "-2px", right: "-1px"}}>
                                        <svg width="14" height="14" viewBox="0 0 12 12" fill="#4E78FF"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z"
                                                fill="#FFF"/>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z"
                                                  fill="#000"/>
                                        </svg>
                                    </div>
                                ) : null
                                }
                            </div>
                        } id="collasible-nav-dropdown dropdown-menu-right" className="dropdown-menu-right" alignRight
                                     flip="true">
                            {(verified === true && account !== null) ? (
                                <div>
                                    <NavDropdown.Item href="#" target="_blank">Get
                                        Verified <svg width="14" height="14" viewBox="0 0 12 12" fill="#4E78FF"
                                                      xmlns="http://www.w3.org/2000/svg" style={{marginBottom: "3px"}}>
                                            <path
                                                d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z"
                                                fill="#FFF"></path>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z"
                                                  fill="#000"></path>
                                        </svg>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        href="#">Principal: {account.principal.substring(0, 15) + "..."}</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item
                                        href="#"
                                        target="_blank" align="center" className="bal">{account.QBit + " "}
                                        <span style={{
                                            fontSize: "14px",
                                            fontWeight: "bold"
                                        }}>QBit</span></NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#/user">Decision To
                                        Do: {account.toDoNumber}</NavDropdown.Item>
                                    <NavDropdown.Item href="#/user">Edit Profile</NavDropdown.Item>
                                </div>
                            ) : (
                                <div>
                                    <NavDropdown.Item href="#" target="_blank">Haven't
                                        Verified Yet
                                    </NavDropdown.Item>
                                </div>
                            )}

                            {/*        <NavDropdown.Item href={"/collection/" + this.state.account}>View Public*/}
                            {/*            Collection</NavDropdown.Item>*/}
                            {/*        <NavDropdown.Divider/>*/}
                            {/*        <NavDropdown.Item href={"https://info.wraithswap.finance"} target="_blank">Analytics*/}
                            {/*            🡕</NavDropdown.Item>*/}
                            {/*        <NavDropdown.Item href={"https://vote.wraithswap.finance/#/wraithswap.eth"} target="_blank">Voting*/}
                            {/*            🡕</NavDropdown.Item>*/}
                            {/*        <NavDropdown.Item href={"https://syfinance.gitbook.io/sy-finance/"} target="_blank">Documentation*/}
                            {/*            🡕</NavDropdown.Item>*/}
                            {/*        <NavDropdown.Item href={"https://github.com/sy-finance/nftmarket-frontend"} target="_blank">Github*/}
                            {/*            🡕</NavDropdown.Item>*/}
                        </NavDropdown>
                    </Nav>
                </>
            </Navbar.Collapse>
        </Navbar>
    )
}

