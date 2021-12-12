import * as React from "react";
import { Link } from "react-router-dom"
import Footer from "./components/footer";

const Login = () => {
    return (
        
        <div>
            {/* For test purpose only, you may remove the content here */}
            <h1>Login Placeholder</h1>
            
            <ul>
                <li><Link to="/random_pet">Random Pet</Link></li>
                <li><Link to="/pet_market">Pet Market</Link></li>
                <li><Link to="/personal">Personal Center</Link></li>
                <li><Link to ="/landing">Go to Landing</Link></li>
            </ul>
            {/*<Footer />*/}

        </div>
    );
};

export default Login; 