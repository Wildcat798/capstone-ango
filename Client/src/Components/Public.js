import { 
    Link,
    } from 'react-router-dom';
import Nav from "./Nav"
import Ango from "./1_Public/Ango"
import Blog from "./1_Public/Blog"
import Who from "./1_Public/Who"
import Where from "./1_Public/Where"
import More from "./1_Public/More"

function Public () {
    return (
        <div>
            <Nav title="Asian Non Governmental Organization (ANGO)"/>
            <Ango/>
            <div className="container">
            <Who/>
                <h3><a href="/">Who we are</a></h3>
                <ul class="col-sm-8">
                    <li><a href="/Vision">Vision</a></li>
                    <li><a href="/Mission">Mission</a></li>
                    <li><a href="/History">History</a></li>
                    <li><a href="/Board_Members">Board Members</a></li>
                    <li><a href="/Field_of_Work">Field of Work</a></li>
                    <li><a href="/Governance">Governance</a></li>
                    <li><a href="/Standards">Standards</a></li>
                    <li><a href="/Finances">Finances</a></li>
                </ul>
            {/* <div className="container-links">
                <ButtonSignup/>
                <ButtonLogin/>
                <ButtonLogout/>
                <ButtonDonate/>
            </div> */}
            <div className="container-ango">
                <Where/>
                <h3><a href="/">Where we work</a></h3>
                    <p>[Link to countries page]</p>
            </div>
            <div className="container-menu">
                <Blog/>
                <h3><a href="/">Blog</a></h3>
                    <ul class="col-sm-4">
                        <li><a href="/News">News</a></li>
                        <li><a href="/Publications">Publications</a></li>
                    </ul>
            </div>
            <div className="container-more">
                <More/>
                <h5><a href="/">More</a></h5>
                    <ul class="col-sm-4">
                        <li><a href="/Careers">Careers</a></li>
                        <li><a href="/Contact">Contact</a></li>
                        <li><a href="/Privacy">Privacy</a></li>
                        <li><a href="/Cookies">Cookies</a></li>
                    </ul>
            </div>
            </div>
        </div>
        );
    }

export default Public;