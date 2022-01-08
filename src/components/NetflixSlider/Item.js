import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'
import './Item.scss'

const Item = ({ movie }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = currentSlide && currentSlide._id === movie._id;

      return (
        <div
          ref={elementRef}
          style={{cursor: 'pointer'}}
          className={cx('item', {
            'item--open': isActive,
          })}
          onClick={() => onSelectSlide(movie)}
        >
          <img src={process.env.REACT_APP_PUBLIC_URL + movie.capa} alt="" />
          <ShowDetailsButton onClick={() => onSelectSlide(movie)} />
          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
