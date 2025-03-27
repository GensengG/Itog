import "../App.jsx";
import "../App.css";
import { Films } from "./Films.jsx";
import { Logout } from "./Logout.jsx";
import { useState } from "react";

export const Client = () => {

    // let logoutState = []; 

    function loginBtn(){
        // logoutState = <Logout/>

        setState(state = (
            <Logout/>
        ))
    }    
    
    let [state, setState] = useState((
        <>
            <header className="head">
                <div className="logo">ИДЁМ<p className="logo__B">В</p>КИНО</div>
                <button className="header__btn" onClick={loginBtn}>Войти</button>
            </header>
            <Films/>
        </>
    ));

    return (
        <>
            {/* <header className="head">
                <div className="logo">ИДЁМ<p className="logo__B">В</p>КИНО</div>
                <button className="header__btn" onClick={loginBtn}>Войти</button>
            </header>
            <Films/> */}
            {state}
        </>
    );

};

export default Client;
