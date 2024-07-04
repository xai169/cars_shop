import React, {useCallback, useState} from 'react';
import CarCard from '../car-card/car-card';
import PropTypes from 'prop-types';
import {CarCardTypes} from '../prop-types/car-card';

const CarsList = (props) => {
  const {cards} = props;
  const [, setActiveItem] = useState(null);
  const handleMouseEnter = useCallback((item) => {
    setActiveItem(item);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setActiveItem(null);
  }, []);

  return (
    <div className="cities__cars-list cars__list tabs__content">
      {cards.map((card) => {
        return (
          <div key={card.id}>
            <CarCard
              item={card}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave} />
          </div>
        );
      })}
    </div>
  );
};

CarsList.propTypes = {
  cards: PropTypes.arrayOf(CarCardTypes).isRequired,
};

export default CarsList;
