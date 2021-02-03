import React from 'react';

function ButtonSignup(props) {
    return (
        <nav>
            <button onClick={props.handleClick}>
                Signup
            </button>
        </nav>
    );
}

export default ButtonSignup;