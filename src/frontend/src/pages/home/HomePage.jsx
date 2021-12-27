import React, {Component, useEffect, useState} from 'react'
import {render} from "react-dom";
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
                        {/*<div className="row justify-content-around">*/}
                        {/*    <h4 className="text-light">Fresh off the mint!</h4>*/}
                        {/*    <ReactPlaceholder type='rect' ready={falsemint} showLoadingAnimation={true}*/}
                        {/*                      color='#333' style={{*/}
                        {/*        width: '300px',*/}
                        {/*        height: '300px',*/}
                        {/*        marginTop: '15px',*/}
                        {/*        borderRadius: '15px'*/}
                        {/*    }}>*/}
                        {/*        {this.state.mimages.reverse().map((id, key) => {*/}
                        {/*            return (*/}
                        {/*                (key < 5) ? (*/}
                        {/*                    (falsemint === true) ?*/}
                        {/*                        (*/}
                        {/*                            <div key={key} className="col-md-2 card bg-light m-3 p-2">*/}
                        {/*                                <div className="m-2 row" align="center">*/}
                        {/*                                    <div className="col-6">*/}
                        {/*                                        <a href=""*/}
                        {/*                                           onClick={(e) => this.like(e, this.state.mimageData_owner[key], this.state.mimageData_id[key])}><span*/}
                        {/*                                            id={"count" + this.state.mimageData_id[key]}>{this.state.mimageData_likecount[key]}</span>*/}
                        {/*                                            <i className="fa fa-heart like"*/}
                        {/*                                               id={"like" + this.state.mimageData_id[key]}></i></a>*/}
                        {/*                                    </div>*/}
                        {/*                                    <div className="col-6">*/}
                        {/*                                        <a href=""*/}
                        {/*                                           onClick={(e) => this.ice(e, this.state.mimageData_owner[key], this.state.mimageData_id[key])}><span*/}
                        {/*                                            id={"counti" + this.state.mimageData_id[key]}>{this.state.mimageData_icecount[key]}</span>*/}
                        {/*                                            <i className="fas fa-gem ice"*/}
                        {/*                                               id={"ice" + this.state.mimageData_id[key]}></i></a>*/}
                        {/*                                    </div>*/}
                        {/*                                </div>*/}
                        {/*                                <Link to={{*/}
                        {/*                                    pathname: `/nft/${this.state.mimageData_id[key]}`,*/}
                        {/*                                    // state: {name: "vikas"}*/}
                        {/*                                }}>*/}
                        {/*                                    <form onSubmit={(event) => {*/}

                        {/*                                    }}>*/}

                        {/*                                        <div className="col-auto max-250">*/}

                        {/*                                            <div className="text-secondary idbadge"*/}
                        {/*                                                 align="center">ID*/}
                        {/*                                                #{this.state.mimageData_id[key]}</div>*/}
                        {/*                                            {(typeof this.state.mimageData_nftData[key] !== 'undefined') ? (*/}

                        {/*                                                (this.state.mimageData_mimeType[key] === "image/jpeg" || this.state.mimageData_mimeType[key] === "image/png" || this.state.mimageData_mimeType[key] === "image/gif") ? (*/}
                        {/*                                                    <Img alt="NFT" className="token rounded"*/}
                        {/*                                                         src={"https://ipfs.sy.finance/ipfs/" + this.state.mimageData_nftData[key]}*/}
                        {/*                                                         cache*/}
                        {/*                                                         style={{background: "#000"}}/>*/}
                        {/*                                                ) : (this.state.mimageData_mimeType[key] === "video/mp4") ? (*/}
                        {/*                                                    <video alt="NFT"*/}
                        {/*                                                           className="token rounded"*/}
                        {/*                                                           autoPlay playsInline muted loop*/}
                        {/*                                                           controls*/}
                        {/*                                                           src={"https://ipfs.sy.finance/ipfs/" + this.state.mimageData_nftData[key]}*/}
                        {/*                                                           type="video/mp4">*/}
                        {/*                                                        <source*/}
                        {/*                                                            src={"https://ipfs.sy.finance/ipfs/" + this.state.mimageData_nftData[key]}*/}
                        {/*                                                            type="video/mp4"></source>*/}
                        {/*                                                    </video>*/}
                        {/*                                                ) : (this.state.mimageData_mimeType[key] === "model/gltf-binary") ? (*/}
                        {/*                                                    <model-viewer*/}
                        {/*                                                        src={"https://ipfs.sy.finance/ipfs/" + this.state.mimageData_nftData[key]}*/}
                        {/*                                                        alt={this.state.mimageData_name[key]}*/}
                        {/*                                                        ar*/}
                        {/*                                                        ar-modes="webxr scene-viewer quick-look"*/}
                        {/*                                                        environment-image="neutral"*/}
                        {/*                                                        auto-rotate camera-controls style={{*/}
                        {/*                                                        width: "100%",*/}
                        {/*                                                        height: "250px"*/}
                        {/*                                                    }}></model-viewer>*/}
                        {/*                                                ) : (null)*/}
                        {/*                                            ) : (null)*/}
                        {/*                                            }*/}

                        {/*                                        </div>*/}
                        {/*                                        <div className="m-2"*/}
                        {/*                                             align="center">{this.state.mimageData_name[key]}</div>*/}
                        {/*                                        /!* <div className="m-2" align="center">{this.state.approved[key] ? ( "Price: " + this.state.imageData_price[key] )*/}
                        {/*                        : ( "Not For Sale" )*/}
                        {/*                        }*/}
                        {/*                            <img alt="main" className="eth-class" src="../logo.png" />*/}
                        {/*                        </div> *!/*/}


                        {/*                                    </form>*/}
                        {/*                                </Link>*/}
                        {/*                            </div>*/}
                        {/*                        ) : null*/}
                        {/*                ) : null*/}
                        {/*            )*/}
                        {/*        })*/}
                        {/*        }*/}
                        {/*    </ReactPlaceholder>*/}
                        {/*    <ReactPlaceholder type='rect' ready={falsemint} showLoadingAnimation={true}*/}
                        {/*                      color='#333' style={{*/}
                        {/*        width: '300px',*/}
                        {/*        height: '300px',*/}
                        {/*        marginTop: '15px',*/}
                        {/*        borderRadius: '15px'*/}
                        {/*    }}>*/}
                        {/*        <span style={{display: "none"}}>&nbsp;</span>*/}
                        {/*    </ReactPlaceholder>*/}
                        {/*    <ReactPlaceholder type='rect' ready={falsemint} showLoadingAnimation={true}*/}
                        {/*                      color='#333' style={{*/}
                        {/*        width: '300px',*/}
                        {/*        height: '300px',*/}
                        {/*        marginTop: '15px',*/}
                        {/*        borderRadius: '15px'*/}
                        {/*    }}>*/}
                        {/*        <span style={{display: "none"}}>&nbsp;</span>*/}
                        {/*    </ReactPlaceholder>*/}
                        {/*</div>*/}
                        <br/>
                        {/*<div className="row">*/}
                        {/*    <div className="col-md-3" align="center" style={{padding: "30px"}}>*/}
                        {/*        <h3 className="text-light"><p><i className="fas fa-wallet fa-2x"*/}
                        {/*                                         style={{color: "#999"}}></i></p>Set up your wallet*/}
                        {/*        </h3>*/}
                        {/*        <p className="text-secondary">Once you’ve set up your wallet with Metamask, connect*/}
                        {/*            it to Syfin by clicking the "Connect Wallet" button in the top right corner.*/}
                        {/*            Only Metamask is supported.</p>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-md-3" align="center" style={{padding: "30px"}}>*/}
                        {/*        <h3 className="text-light"><p><i className="fas fa-piggy-bank fa-2x"*/}
                        {/*                                         style={{color: "#999"}}></i></p>Add your collection*/}
                        {/*        </h3>*/}
                        {/*        <p className="text-secondary">Click "Mint a NFT" and set up your Syfin NFT*/}
                        {/*            collection. You can also edit your profile to get a biography, profile avatar,*/}
                        {/*            and name stored on chain.</p>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-md-3" align="center" style={{padding: "30px"}}>*/}
                        {/*        <h3 className="text-light"><p><i className="fas fa-hand-pointer fa-2x"*/}
                        {/*                                         style={{color: "#999"}}></i></p>Mint your NFTs*/}
                        {/*        </h3>*/}
                        {/*        <p className="text-secondary">Upload your work (image, video, audio, or 3D model),*/}
                        {/*            add a name, category, and description, it is cheaper than ever before with Syfin*/}
                        {/*            on the Fantom network.</p>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-md-3" align="center" style={{padding: "30px"}}>*/}
                        {/*        <h3 className="text-light"><p><i className="fas fa-gavel fa-2x"*/}
                        {/*                                         style={{color: "#999"}}></i></p>List them for sale*/}
                        {/*        </h3>*/}
                        {/*        <p className="text-secondary">Choose between auctions (coming soon) and fixed-price*/}
                        {/*            listings. By selling an NFT you receive Syfin (SYF) which rewards you Spookyswap*/}
                        {/*            (BOO)</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </LoadingOverlay>
        </div>
    )
}

export default HomePage;