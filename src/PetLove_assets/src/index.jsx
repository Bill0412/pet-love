import * as ReactDOM from "react-dom";

import {HashRouter, Routes, Route} from "react-router-dom";
import UserContext from "./Contexts/user-context";

import MarketPlace from "./pages/market/Market";
import Home from "./pages/home/Home";
import ErrorPage from "./pages/error/ErrorPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import {render} from "react-dom";

const App = () => {
    return (
        <div>
            1123
            {/*/!*<UserContext.Provider value={}>*!/*/}
            {/*<Header/>*/}
            {/*<HashRouter>*/}
            {/*    <Routes>*/}
            {/*        <Route exact path="/" component={Home}/>*/}
            {/*        <Route exact path="/home" component={Home}/>*/}
            {/*        <Route exact path="/market" component={MarketPlace}/>*/}
            {/*        <Route path="/*" component={ErrorPage} />*/}
            {/*    </Routes>*/}
            {/*</HashRouter>*/}
            {/*<Footer/>*/}
            {/*/!*</UserContext.Provider>*!/*/}
        </div>
    )
};
render(<App/>, document.getElementById("app"));