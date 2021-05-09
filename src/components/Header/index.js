
import React from 'react';
import './styles.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    const { button, black } = props;

    return (
        <header className={black ? "black" : ''}>
            <div className="header--logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png" />
            </div>
            <div className="header--user">

            </div>
            <div className="header--RegisterButton">
                {button}
            </div>
     


        </header>
    )
}