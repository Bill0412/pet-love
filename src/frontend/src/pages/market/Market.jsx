import React, {useEffect, useState} from 'react'
import ScrollToTop from "react-scroll-to-top";
import ReactPlaceholder from "react-placeholder";
import {Tabs, Tab, PageItem, Pagination} from "react-bootstrap"
import {GoodCard} from "../../components/good-card/GoodCard";

// Note:
// function component is executed serially, so don't use a variable that is beyond the context.
export default function MarketPlace() {
    // page info TODO: improve for page-pageSize
    let [totalPage, setTotalPage] = useState(1);
    let [pageSize, setPageSize] = useState(15);
    let [page, setPage] = useState(0);

    // goods info
    let [ready, setReady] = useState(true)
    let [goods, setGoods] = useState(Array(pageSize).fill({
        id: 123,
        name: "PetName",
        color: "Pink",
        price: "123",
        state: 1
    }))
    let [totalSupply, setTotalSupply] = useState(goods.length)

    // Tab choice
    let [tabFocus, setTabFocus] = useState(0)
    useEffect(() => {
        // TODO obtain data again
    }, [tabFocus])

    return (
        <div>
            <ScrollToTop smooth/>
            <div className="head-title col-auto mx-4">
                <h4 className="mb-0 font-weight-normal">All <strong>{totalSupply}</strong> Cute Pets on PetLove
                </h4>
            </div>
            <div className="container-fluid mb-5 explore-adj">
                <div className="row justify-content-around">
                    <p align="center" className="text-secondary">This is where you can explore all pets that lived in
                        PetLove
                        Platform. Pick one with your lover!
                    </p>
                    <p>
                        <div align="center" style={{maxWidth: "500px", margin: "0 auto"}}><input
                            placeholder="Search for some Pets..." type="text" className="form-control my-2"
                            onChange={(e) => {
                            }} disabled={false}/></div>
                    </p>

                    <Tabs onSelect={(eventKey) => setTabFocus(Number(eventKey))} defaultActiveKey={tabFocus}>
                        <Tab eventKey={0} title="All Pets" className="justify-content-around">
                            <div className="row justify-content-around">
                                <ReactPlaceholder type='rect' ready={ready} showLoadingAnimation={true} color='#333'
                                                  style={{width: '300px', height: '300px', borderRadius: '15px'}}>
                                    {goods.map((good) => (
                                        // TODO modify state
                                        <GoodCard goodInfo={good}/>
                                    ))}
                                </ReactPlaceholder>
                            </div>
                        </Tab>
                        <Tab eventKey={1} title="Pets Sold in Our Platform">
                            <div className="row justify-content-around">
                                <ReactPlaceholder type='rect' ready={ready} showLoadingAnimation={true} color='#333'
                                                  style={{width: '300px', height: '300px', borderRadius: '15px'}}>
                                    {goods.map((good) => (
                                        // TODO modify state
                                        <GoodCard goodInfo={good}/>
                                    ))}
                                </ReactPlaceholder>
                            </div>
                        </Tab>
                        <Tab eventKey={2} title="Pets Lived in Our Platform">
                            <div className="row justify-content-around">
                                <ReactPlaceholder type='rect' ready={ready} showLoadingAnimation={true} color='#333'
                                                  style={{width: '300px', height: '300px', borderRadius: '15px'}}>
                                    {goods.map((good) => (
                                        <GoodCard goodInfo={good}/>
                                    ))}
                                </ReactPlaceholder>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}