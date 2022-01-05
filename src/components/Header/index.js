
import React from 'react';
import './styles.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    const { button, black, dash } = props;

    return (
        <header className={black ? "black" : ''}>
            <div className="header--logo">
                <img src={process.env.PUBLIC_URL + "/logo192.png"}/>
            </div>
            <div className="header--user">

            </div>
            <div className="header--RegisterButton">
                {dash && button}
            </div>
     


        </header>
    )
}