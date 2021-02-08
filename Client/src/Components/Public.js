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
                <h3><Link to="/">Who we are</Link></h3>
                <ul>
                    <li><Link to="/Vision">Vision</Link></li>
                    <li><Link to="/Mission">Mission</Link></li>
                    <li><Link to="/History">History</Link></li>
                    <li><Link to="/Board_Members">Board Members</Link></li>
                    <li><Link to="/Field_of_Work">Field of Work</Link></li>
                    <li><Link to="/Governance">Governance</Link></li>
                    <li><Link to="/Standards">Standards</Link></li>
                    <li><Link to="/Finances">Finances</Link></li>
                </ul>
                </div>
            <div className="container-ango">
                <Where/>
                <h3><Link to="/">Where we work</Link></h3>
                    <p>[Link to countries page]</p>
            </div>
            <div className="container-menu">
                <Blog/>
                <h3><Link to="/">Blog</Link></h3>
                    <ul>
                        <li><Link to="/News">News</Link></li>
                        <li><Link to="/Publications">Publications</Link></li>
                    </ul>
            </div>
            <div className="container-more">
                <More/>
                <h5><Link to="/">More</Link></h5>
                    <ul>
                        <li><Link to="/Careers">Careers</Link></li>
                        <li><Link to="/Contact">Contact</Link></li>
                        <li><Link to="/Privacy">Privacy</Link></li>
                        <li><Link to="/Cookies">Cookies</Link></li>
                    </ul>
            </div>
        </div>
    );
}

export default Public;