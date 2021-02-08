import { 
    Link,
    } from 'react-router-dom';
import Nav from "./Nav"

function Private () {
    return (
        <div>
            <Nav title="Welcome to the ANGO members only page."/>
            <h3><Link to="/">Who we are</Link></h3>
            <ul>
                <li><Link to="/21_chat-rules">Rules for Use of Website & Chat</Link></li>
                <li><Link to="/21_chat">ANGO-Chat</Link></li>
                <li><Link to="/22_abod">Message from ANGO Board</Link></li>
                <li><Link to="/22_aoff">Message from ANGO Officers</Link></li>
                <li><Link to="/23_cbod">Message from Country Board</Link></li>
                <li><Link to="/23_coff">Message from Country Officers</Link></li>
                <li><Link to="/17_careers">Ways You Can Participate</Link></li>
                <li><Link to="/24_vote">Voting & Election Information</Link></li>
            </ul>
            <h3><Link to="/">Blog</Link></h3>
            <ul>
                <li><Link to="/Vision">Notices of Events & Meetings</Link></li>
                <li><Link to="/Mission">Calendar</Link></li>
                <li><Link to="/History">Travel Notices and Advisories</Link></li>
                <li><Link to="/Board_Members">Travel Tips and Maps</Link></li>
                <li><Link to="/Field_of_Work">Help for Conference Organization</Link></li>
                <li><Link to="/Governance">Conference Registration</Link></li>
                <li><Link to="/Standards">Information About Projects</Link></li>
            </ul>
        </div>
    );
}

export default Private;