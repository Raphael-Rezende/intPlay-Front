import React, { useState } from 'react';
import './styles.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title, items }) => {

    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setScrollX(x);
    }
    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = 1 * 150;
        if (window.innerWidth - listW > x) {
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);
    }

    return (

        <div className="movieRow">

            <h2>{title}</h2>
            <div className="movieRow-left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>
            <div className="movieRow-right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: 150
                }}>

                    <div key='1' className="movieRow--item">

                    </div>

                </div>
            </div>
        </div>
    );
}