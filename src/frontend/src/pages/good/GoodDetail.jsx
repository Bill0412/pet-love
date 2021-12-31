import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import ReactPlaceholder from "react-placeholder";
import Img from "react-cool-img";
import Jazzicon from "react-jazzicon";

const GoodDetailPage = (props) => {
    // id is the NFT id obtained in route.
    const {id} = useParams()

    // ready to show
    let [readyShow, setReadyShow] = useState(true)

    // data
    let [goodDetail, setGoodDetail] = useState({
        name: "Pet123",
        description: "this is a demo description of pet",
        image: "card-img-placeholder.png",
        likecount: 100,
        icecount: 50,
        price: 100,
        owner1: "0xasdsadas",
        owner2: "0xsadsdasdsa",
        type: "Makabaka",
        hash: "0x12e1dj3u1j1s21k2k12k3k",
        state: "Onsale / Not on sale"
    })

    useEffect(() => {
        // TODO obtain data
    }, [])

    return (
        <div>
            <div className="head-title col-auto mx-4">
                <h4 className="mb-0 font-weight-normal">Pet #{id} Details</h4>
            </div>
            <div className="nft-detail-adj">
                <div className="row">
                    <div className="col-md-6">
                        <ReactPlaceholder type='rect' ready={readyShow} showLoadingAnimation={true}
                                          color='#333'
                                          style={{width: '100%', height: '100%', borderRadius: '15px'}}>
                            <h1 className="text-light" align="center">
                                <strong>{goodDetail.name}</strong></h1>
                            <p className="text-light" align="center" style={{
                                backgroundColor: "#000",
                                padding: "20px",
                                borderRadius: "15px"
                            }}>"{goodDetail.description}"</p>

                            <div className="max-400" style={{width: "98%", margin: "0 auto"}}
                                 align="center">
                                <Img alt="NFT" className="homeimage shadow-lg rounded"
                                     src={goodDetail.image}
                                     cache style={{background: "#000", maxWidth: "800px"}}/>
                            </div>

                            <br/>
                        </ReactPlaceholder>

                        <div className="d-flex justify-content-center align-items-center text-light"
                             id="buyanNFT">
                            <div className="mx-2">
                                <button type="submit"
                                        className='btn btn-block btn-primary rounded-15 text-light p-3 buybtn'
                                        disabled={false}>
                                    <strong>ADOPT WITH LOVER</strong>
                                    <br/>{goodDetail.price}&nbsp;Token
                                    ( ≈ 100
                                    <small>USD</small> )
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <ReactPlaceholder type='rect' ready={readyShow} showLoadingAnimation={true}
                                          color='#333' style={{
                            width: '60%',
                            height: '150px',
                            margin: "15px auto",
                            borderRadius: '15px'
                        }}>
                            <div className="row">
                                <div className="col-md-6" align="center">
                                    <div style={{
                                        color: "white",
                                        marginBottom: "5px",
                                        fontWeight: "bold"
                                    }}>Owner 1
                                    </div>

                                    <ReactPlaceholder type='rect' ready={readyShow}
                                                      showLoadingAnimation={true} color='#333' style={{
                                        width: '100px',
                                        height: '100px',
                                        marginTop: "10px",
                                        borderRadius: '15px'
                                    }}>
                                        <div style={{position: "relative", width: "75px"}}>
                                            <Jazzicon diameter={75}
                                                      seed={Math.round(Math.random() * 10000000)}/>
                                            <div style={{
                                                position: "absolute",
                                                bottom: "5px",
                                                right: "5px"
                                            }}>
                                                <svg width="16" height="16"
                                                     viewBox="0 0 12 12" fill="#4E78FF"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z"
                                                        fill="#FFF"></path>
                                                    <path fillRule="evenodd"
                                                          clipRule="evenodd"
                                                          d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z"
                                                          fill="#000"></path>
                                                </svg>
                                            </div>
                                        </div>

                                        <p style={{color: "white"}}>
                                            {goodDetail.owner1.substring(0, 15) + "..."}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor"
                                                 className="bi bi-arrow-up-right-square-fill"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
                                            </svg>
                                        </p>
                                    </ReactPlaceholder>
                                    <br/>
                                </div>

                                <div className="col-md-6" align="center">
                                    <div style={{
                                        color: "white",
                                        marginBottom: "5px",
                                        fontWeight: "bold"
                                    }}>Owner 2
                                    </div>

                                    <ReactPlaceholder type='rect' ready={readyShow}
                                                      showLoadingAnimation={true} color='#333' style={{
                                        width: '100px',
                                        height: '100px',
                                        marginTop: "10px",
                                        borderRadius: '15px'
                                    }}>
                                        <div style={{position: "relative", width: "75px"}}>
                                            <Jazzicon diameter={75}
                                                      seed={Math.round(Math.random() * 10000000)}/>
                                            <div style={{
                                                position: "absolute",
                                                bottom: "5px",
                                                right: "5px"
                                            }}>
                                                <svg width="16" height="16"
                                                     viewBox="0 0 12 12" fill="#4E78FF"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z"
                                                        fill="#FFF"></path>
                                                    <path fillRule="evenodd"
                                                          clipRule="evenodd"
                                                          d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z"
                                                          fill="#000"></path>
                                                </svg>
                                            </div>
                                        </div>

                                        <p style={{color: "white"}}>
                                            {goodDetail.owner2.substring(0, 15) + "..."}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor"
                                                 className="bi bi-arrow-up-right-square-fill"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
                                            </svg>
                                        </p>
                                    </ReactPlaceholder>
                                    <br/>
                                </div>
                            </div>
                        </ReactPlaceholder>

                        <br/>

                        <ReactPlaceholder type='rect' ready={readyShow}
                                          showLoadingAnimation={true} color='#333' style={{
                            width: '100%',
                            height: '75px',
                            marginTop: "10px",
                            borderRadius: '15px'
                        }}>
                            <div className="row" align="center">
                                <div className="col-6" align="center">
                                    <a href="" onClick={() => {
                                    }}><i
                                        className="fa fa-heart fa-2x like"
                                        id={"like" + id}></i></a><br/><span id={"count" + id} style={{
                                    fontSize: "19px",
                                    color: "white"
                                }}>{goodDetail.likecount}</span>
                                </div>
                                <div className="col-6" align="center">
                                    <a href="" onClick={() => {
                                    }}><i
                                        className="fas fa-gem fa-2x ice" id={"ice" + id}></i></a><br/><span
                                    id={"counti" + id}
                                    style={{fontSize: "19px", color: "white"}}>{goodDetail.icecount}</span>
                                </div>
                            </div>
                        </ReactPlaceholder>

                        <br/>

                        <div className="table-adj">
                            <div className="table-responsive">
                                <ReactPlaceholder type='rect' ready={readyShow}
                                                  showLoadingAnimation={true} color='#333' style={{
                                    width: '100%',
                                    height: '400px',
                                    borderRadius: '15px'
                                }} align='center'>
                                    <table className="table table-sm table-borderless">
                                        <tbody className="">
                                        <tr>
                                            <th className="pl-0 w-40" scope="row">
                                                <strong>Code Hash</strong>
                                            </th>

                                            <td style={{fontSize: "14px"}}>
                                                <ReactPlaceholder type='rect'
                                                                  ready={readyShow}
                                                                  showLoadingAnimation={true}
                                                                  color='#333'
                                                                  style={{
                                                                      width: '150px',
                                                                      height: '24px',
                                                                      marginTop: "10px",
                                                                      borderRadius: '15px'
                                                                  }}> {goodDetail.hash.substring(0, 15) + "..."}
                                                </ReactPlaceholder>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-60" scope="row"><strong>State</strong>
                                            </th>
                                            <td>{goodDetail.state}</td>
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-60" scope="row"><strong>Type</strong></th>
                                            <td>{goodDetail.type}</td>
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-60" scope="row"><strong>Last
                                                Price</strong></th>
                                            <td>{goodDetail.price}
                                                <small> Token </small>
                                                ( ≈ 100
                                                <small> USD </small>)
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-60" scope="row"><strong>For Sale</strong>
                                            </th>
                                            <td><ReactPlaceholder type='rect' ready={readyShow}
                                                                  showLoadingAnimation={true} color='#333'
                                                                  style={{
                                                                      width: '150px',
                                                                      height: '24px',
                                                                      marginTop: "10px",
                                                                      borderRadius: '15px'
                                                                  }}>
                                                {"Available for Purchase"}
                                            </ReactPlaceholder>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-60" scope="row"><strong>More</strong></th>
                                            <td><a
                                                href="#"
                                                target="_blank" className="button btn btn-primary">View More
                                            </a>&nbsp;&nbsp;&nbsp;
                                            </td>
                                            <td><a
                                                href="#"
                                                target="_blank" className="button btn btn-primary">Share This Pet
                                            </a>&nbsp;&nbsp;&nbsp;
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </ReactPlaceholder>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className="mt-4" align="center">*/}
            {/*    {(this.state.transactionl > 0) ? (*/}
            {/*        <ReactPlaceholder type='rect' ready={this.state.ready} showLoadingAnimation={true}*/}
            {/*                          color='#333'*/}
            {/*                          style={{width: '100%', height: '200px', borderRadius: '15px'}}*/}
            {/*                          align='center'>*/}

            {/*            <h4 className="text-secondary">Transactions</h4>*/}
            {/*            <table className="table table-sm table-borderless" align="center">*/}
            {/*                <thead align="center">*/}
            {/*                <tr align="center">*/}
            {/*                    <th align="center">Buyer</th>*/}
            {/*                    <th align="center">Price in SYF</th>*/}
            {/*                </tr>*/}
            {/*                </thead>*/}
            {/*                <tbody>*/}
            {/*                {this.state.transactions.slice(0).reverse().map((transaction, i) => {*/}
            {/*                    return (*/}
            {/*                        (transaction._tokenId === key) ?*/}
            {/*                            (*/}
            {/*                                <tr key={i} align="center">*/}
            {/*                                    <td align="center">{transaction._buyer} <a*/}
            {/*                                        href={"/collection/" + transaction._buyer}>*/}
            {/*                                        <svg xmlns="http://www.w3.org/2000/svg" width="16"*/}
            {/*                                             height="16" fill="currentColor"*/}
            {/*                                             className="bi bi-arrow-up-right-square-fill"*/}
            {/*                                             viewBox="0 0 16 16">*/}
            {/*                                            <path*/}
            {/*                                                d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>*/}
            {/*                                        </svg>*/}
            {/*                                    </a></td>*/}
            {/*                                    <td align="center">{transaction._price}</td>*/}
            {/*                                </tr>*/}
            {/*                            ) : null*/}
            {/*                    )*/}
            {/*                })*/}
            {/*                }*/}
            {/*                </tbody>*/}
            {/*            </table>*/}
            {/*        </ReactPlaceholder>*/}
            {/*    ) : (null)}*/}
            {/*</div>*/}
        </div>
    )
}

export default GoodDetailPage;