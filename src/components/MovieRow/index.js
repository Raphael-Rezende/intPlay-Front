import React, { useState } from 'react';
import './styles.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';

function MovieRow({ title, items, type }) {

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
    let listW = items.length * 200;
    if ((window.innerWidth - listW) > x) {
      x = (window.innerWidth - listW) - 80;
    }
    setScrollX(x);
  }

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="row">

        <div className="movieRow--left" onClick={handleLeftArrow}>
          <NavigateBeforeIcon style={{ fontSize: 50 }} />
        </div>



        <div className="movieRow--listarea">
          <div
            className="movieRow--list"
            style={{
              marginLeft: scrollX,
              width: items.length * 200
            }}
          >
            {
              items.length > 0 &&
              items.map((item, key) => {
                const path = process.env.REACT_APP_PUBLIC_URL + item.capa
                return (
                  item.capa !== null &&
                  <div key={key} className="movieRow--item">
                    <Link to={`/details/${type}/${item._id}`}>
                      <img alt={item.titulo} src={path} />
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="movieRow--right" onClick={handleRightArrow}>
          <NavigateNextIcon style={{ fontSize: 50 }} />
        </div>
      </div>
    </div>
  );
}

export default MovieRow;
