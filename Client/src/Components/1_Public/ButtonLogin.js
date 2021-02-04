import React from 'react';

function ButtonLogin(props) {
    return (
        <nav>
            <button onClick={props.handleClick}>
                Login
            </button>
        </nav>
    );
}

export default ButtonLogin;