import { 
    Link,
    } from 'react-router-dom';
import ButtonSignup from "./1_Public/ButtonSignup"
import ButtonLogin from "./1_Public/ButtonLogin"
import ButtonLogout from "./1_Public/ButtonLogout"
import ButtonDonate from "./1_Public/ButtonDonate"
import ButtonCookies from "./1_Public/ButtonCookies"

function Nav ({title}) {
    return (
        <div>
            <ButtonSignup/>
            <ButtonLogin/>
            <ButtonLogout/>
            <ButtonDonate/>
            <ButtonCookies/>
            <h1>{title}</h1>
            <Link to="/public">Public</Link>
            <br></br>
            <Link to="/private">Private</Link>
            <br></br>
            <Link to="/projects">Projects</Link>
            <br></br>
            <Link to="/chat">Chat</Link>
        </div>
        );
    }

    export default Nav;