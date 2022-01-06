import React, {useEffect, useState} from 'react'
import ScrollToTop from 'react-scroll-to-top'
import LoadingOverlay from 'react-loading-overlay';
import Modal from 'react-modal';

import './HomePage.css'
import ReactPlaceholder from "react-placeholder";
import NFTCard from "../../components/nft-card/NFTCard";

const HomePage = () => {

    const ContextLoadingTimeMs = 5000;
    const QueryLoadingTimeMs = 7000;

    let [onLoading, setOnLoading] = useState(true);
    let [onQuerying, setOnQuerying] = useState(true);
    let [showModal, setShowModal] = useState(true);

    // loading resources.
    useEffect(() => {
        setTimeout(() => {
            setOnLoading(false)
        }, ContextLoadingTimeMs)

        setTimeout(() => {
            setOnQuerying(false)
        }, QueryLoadingTimeMs)
    }, [])

    // query for data
    useEffect(() => {
        // TODO query resources
    })

    // if (document.body && document.getElementById("mainfoot")) {
    //     document.body.style.backgroundImage = "url(bg.jpg)";
    //     document.getElementById("mainfoot").style.display = "none";
    // }

    return (
        <div>
            <ScrollToTop smooth/>
            <LoadingOverlay
                active={onLoading}
                spinner
                transition={false}
                text={'Waiting on context loading...'}
                styles={{
                    overlay: (base) => ({
                        ...base,
                        background: 'rgba(0, 0, 0, 0.95)',
                        position: 'fixed'
                    }),
                    wrapper: {
                        width: '100%',
                        height: '100%',
                        borderRadius: '25px'
                    }
                }}
            >
                <div className="col-auto mx-4 align-middle" style={{marginTop: "3vh"}}>
                    <h4 className="mb-0 font-weight-normal">Pet Love on Internet Computer</h4>
                </div>
                <div className="row">
                    <div className="col-md-12" align="center">
                        <div className="row">
                            <div className="col-md-12 my-auto align-middle" style={{
                                background: "#000000",
                                display: "table-cell",
                                maxWidth: "800px",
                                margin: "0 auto",
                                padding: "30px",
                                borderRadius: "25px"
                            }}>
                                <h2><span className="rainbowtxt1">WELCOME</span>&nbsp;&nbsp;&nbsp;<span
                                    className="rainbowtxt2">TO</span><br/><span className="rainbowtxt3">PET LOVE </span>
                                </h2>
                                <h4 className="text-light" style={{fontWeight: "800"}}>Adopt A Cute, Sharable Pet With The One You Love</h4>
                                <div className="row">
                                    <div className="col-md-6" align="center">
                                        <a type="button" href="/#/market"
                                           className="btn btn-primary rounded m-3 homeButton swapbtn">ADOPT PET</a>
                                    </div>
                                    <div className="col-md-6" align="center">
                                        <a type="button" href='/#/user'
                                           className="btn btn-primary rounded m-3 homeButton swapbtn">MY PET</a>
                                    </div>
                                    <p className="text-light" style={{fontSize: "19px", fontWeight: "600"}}>Zero % Fees! In IC (Internet Computer), the cost to store data is so low!</p>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div className="row">
                            <div className="col-md-3" align="center" style={{padding: "30px"}}>
                                <h3 className="text-light"><p><i className="fas fa-wallet fa-2x"
                                                                 style={{color: "#999"}}></i></p>Connect with your Identity
                                </h3>
                                <p className="text-secondary">You will be connected with your identity from Plug or II, just
                                    click the Login Button and finish the authorization. Then you will be able to market with your
                                    wallet.</p>
                            </div>
                            <div className="col-md-3" align="center" style={{padding: "30px"}}>
                                <h3 className="text-light"><p><i className="fas fa-piggy-bank fa-2x"
                                                                 style={{color: "#999"}}></i></p>Pick A Cute Pet
                                </h3>
                                <p className="text-secondary">Find a cute pet with your lover or shopping by yourself.
                                    You can go to market to look for popular pets, or just purchase one that is new born
                                    in this page.</p>
                            </div>
                            <div className="col-md-3" align="center" style={{padding: "30px"}}>
                                <h3 className="text-light"><p><i className="fas fa-gift fa-2x"
                                                                 style={{color: "#999"}}></i></p>Purchase It with Lover
                                </h3>
                                <p className="text-secondary">Then click into detail page and purchase it. You are supposed
                                    to fill the principal of your lover, and ask for his/her agreement. Then you can own this
                                    pet with each other. So sweet!</p>
                            </div>
                            <div className="col-md-3" align="center" style={{padding: "30px"}}>
                                <h3 className="text-light"><p><i className="fas fa-venus-double fa-2x"
                                                                 style={{color: "#999"}}></i></p>Adopt and Play with it
                                </h3>
                                <p className="text-secondary">Adopt the pet in your "lover zone". You can feed it or play
                                    with it. You can have the happiness in virtual world and the pet is a witness to your
                                    relationship.</p>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div className="row justify-content-around explore-adj">
                            <h4 className="text-light">Newest Sold Pets </h4>
                            <ReactPlaceholder type='rect' ready={!onQuerying} showLoadingAnimation={true}
                                              color='#333' style={{
                                width: '300px',
                                height: '350px',
                                marginTop: '15px',
                                borderRadius: '15px'
                            }}>
                                <NFTCard size={{width: '300px', height: '350px'}}/>
                            </ReactPlaceholder>
                            <ReactPlaceholder type='rect' ready={!onQuerying} showLoadingAnimation={true}
                                              color='#333' style={{
                                width: '300px',
                                height: '350px',
                                marginTop: '15px',
                                borderRadius: '15px'
                            }}>
                                <NFTCard size={{width: '300px', height: '350px'}}/>
                            </ReactPlaceholder>
                            <ReactPlaceholder type='rect' ready={!onQuerying} showLoadingAnimation={true}
                                              color='#333' style={{
                                width: '300px',
                                height: '350px',
                                marginTop: '15px',
                                borderRadius: '15px'
                            }}>
                                <NFTCard size={{width: '300px', height: '350px'}}/>
                            </ReactPlaceholder>
                        </div>
                        <br/>
                        <br/>
                        <div className="row justify-content-around explore-adj">
                            <h4 className="text-light">Newest Born Pets </h4>
                            <ReactPlaceholder type='rect' ready={!onQuerying} showLoadingAnimation={true}
                                              color='#333' style={{
                                width: '300px',
                                height: '350px',
                                marginTop: '15px',
                                borderRadius: '15px'
                            }}>
                                <NFTCard size={{width: '300px', height: '350px'}}/>
                            </ReactPlaceholder>
                            <ReactPlaceholder type='rect' ready={!onQuerying} showLoadingAnimation={true}
                                              color='#333' style={{
                                width: '300px',
                                height: '350px',
                                marginTop: '15px',
                                borderRadius: '15px'
                            }}>
                                <NFTCard size={{width: '300px', height: '350px'}}/>
                            </ReactPlaceholder>
                            <ReactPlaceholder type='rect' ready={!onQuerying} showLoadingAnimation={true}
                                              color='#333' style={{
                                width: '300px',
                                height: '350px',
                                marginTop: '15px',
                                borderRadius: '15px'
                            }}>
                                <NFTCard size={{width: '300px', height: '350px'}}/>
                            </ReactPlaceholder>
                        </div>
                    </div>
                </div>
            </LoadingOverlay>
        </div>
    )
}

export default HomePage;