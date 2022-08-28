import React from 'react';
import './button.scss';
import PropTypes from 'prop-types'
const Button = props =>{
    return (
        <button className={`btn ${props.className}`}
                onclick={props.onclick ? () => props.onclick() : null}
        >
            {props.children}
        </button>
    );
    
}
export const OutlineButton = props => {
    return (
        <button className={`btnoutline ${props.className}`}
                onclick={props.onclick ? () => props.onclick() : null}
        >
            {props.children}
        </button>
    );
    
}
Button.prototype = {
    onclick: PropTypes.func
}
export default Button;