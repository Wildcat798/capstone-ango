import { 
    Link,
    } from 'react-router-dom';
import Nav from "./Nav"

function Private () {
    return (
        <div>
            <Nav title="Welcome to the ANGO members only page."/>
            <h3><a href="/">Who we are</a></h3>
            <ul class="col-sm-8">
                <li><a href="/21_chat-rules">Rules for Use of Website & Chat</a></li>
                <li><a href="/21_chat">ANGO-Chat</a></li>
                <li><a href="/22_abod">Message from ANGO Board</a></li>
                <li><a href="/22_aoff">Message from ANGO Officers</a></li>
                <li><a href="/23_cbod">Message from Country Board</a></li>
                <li><a href="/23_coff">Message from Country Officers</a></li>
                <li><a href="/17_careers">Ways You Can Participate</a></li>
                <li><a href="/24_vote">Voting & Election Information</a></li>
            </ul>
            <h3><a href="/">Blog</a></h3>
            <ul class="col-sm-6">
                <li><a href="/Vision">Notices of Events & Meetings</a></li>
                <li><a href="/Mission">Calendar</a></li>
                <li><a href="/History">Travel Notices and Advisories</a></li>
                <li><a href="/Board_Members">Travel Tips and Maps</a></li>
                <li><a href="/Field_of_Work">Help for Conference Organization</a></li>
                <li><a href="/Governance">Conference Registration</a></li>
                <li><a href="/Standards">Information About Projects</a></li>
            </ul>
        </div>
            );
}

export default Private;