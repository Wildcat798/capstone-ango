import React from 'react';

function ButtonDonate(props) {
    return (
        <nav>
            <button onClick={props.handleClick}>
                Donate now!
            </button>
        </nav>
    );
}

export default ButtonDonate;