import React from 'react';

function ButtonCookies(props) {
    return (
        <nav>
            <button onClick={props.handleClick}>
                Accept
            </button>
        </nav>
    );
}

export default ButtonCookies;