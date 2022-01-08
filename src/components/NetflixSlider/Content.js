import React from 'react';
import IconCross from './../Icons/IconCross';
import './Content.scss';

const Content = ({ movie, onClose }) => (
  <div className="content">
    <div className="content__background">
      <div className="content__background__shadow" />
      <div
        className="content__background__image"
        style={{ 'background-image': `url(${encodeURI(process.env.REACT_APP_PUBLIC_URL + movie.backdrop.replaceAll('\\', '/'))})` }}
      />
    </div>
    <div className="content__area">
      <div className="content__area__container">
        <div className="content__title">{movie.titulo}</div>
        <div className="content__description">
         {movie.sinopse}
        </div>
      </div>
      <button className="content__close" onClick={onClose}>
        <IconCross />
      </button>
    </div>
  </div>
);

export default Content;
