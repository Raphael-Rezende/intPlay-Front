import React from 'react';
import { getDataStringFormat } from '../Utils/DateTimeUtil'
import './Content.css';

const Content = ({ movie, onClose, type }) => {
  let genres = [];
  for (let i in movie.generos) {
    genres.push(movie.generos[i].genero);
  }


  return (
    <section className="featured" style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url(${encodeURI(process.env.REACT_APP_PUBLIC_URL + movie.backdrop.replaceAll('\\', '/'))})`
    }}>
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{movie.titulo}</div>
          <div className="featured--info">
            <div className="featured--year">{getDataStringFormat(movie.ano, 'yyyy')}</div>
            {/*<div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_season !== 1 ? 's' : ''}</div>*/}
          </div>
          <div className="featured--description">{movie.sinopse}</div>
          <div className="featured--buttons">
            <a href={`/details/${type}/${movie._id}`} className="featured--watchbutton">► Assistir</a>
          </div>
          <div className="featured--genres">Gêneros: <strong> {genres.join(', ')} </strong></div>
          <button className="featured--close" onClick={onClose}>
            <img
              style={{ width: "30px" }}
              src={"./close.png"}
              alt="close icon"
              onClick={onClose}
            />
          </button>
        </div>
      </div>


    </section>



  )

}

export default Content;
