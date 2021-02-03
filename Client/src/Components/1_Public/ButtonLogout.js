import React from 'react';

function ButtonLogout(props) {
    return (
        <nav>
            <button onClick={props.handleClick}>
                Logout
            </button>
        </nav>
    );
}

export default ButtonLogout;