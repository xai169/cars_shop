import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {CarCardTypes} from '../prop-types/car-card';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import EditCardForm from '../edit-form/edit-form';

const CarCard = (props) => {
  const {item, onMouseEnter, onMouseLeave, onActiveCard, onDeleteCard, onSave} = props;
  const {id, name, model, year, color, price, latitude, longitude} = item;

  const [isEditing, setIsEditing] = useState(false);

  const handleMouseEnter = () => {
    onMouseEnter(item);
    onActiveCard(item);
  };
  const handleMouseLeave = () => {
    onMouseLeave(item);
    onActiveCard({});
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (updatedCard) => {
    const updatedCardWithCoords = {
      ...updatedCard,
      latitude: latitude,
      longitude: longitude,
    };
    onSave(updatedCardWithCoords);
    setIsEditing(false);
  };

  return (
    <article className="cities__car-card car-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="cities__image-wrapper car-card__image-wrapper">
        <img className="car-card__image" src="./car-golf.jpg" width="260" height="200" alt="car image" />
      </div>
      <div className="car-card__info">
        <div className="car-card__price-wrapper">
          <h2 className="car-card__name">{name} {model}</h2>
          <button className="car-card__edit-button button" onClick={handleEditClick}><img className="car-card__image" src="./icon-edit.svg" width="24" height="24" alt="car image" /></button>
          <button className="car-card__edit-button button" onClick={() => onDeleteCard(item)}><img className="car-card__image" src="./icon-trash.svg" width="24" height="24" alt="car image" /></button>
        </div>
        <div className="car-card__price">
          <b className="car-card__price-value">&#8381;{price}</b>
          <span className="car-card__price-text">&#47;&nbsp;day</span>
        </div>
        <p className="car-card__type car-card__type_color">Цвет: {color} <span className="car-card__color-box" style={{backgroundColor: `${color}`}}></span></p>
        <p className="car-card__type car-card__type_year">Год выпуска: {year}</p>
      </div>
      {isEditing ? (
        <EditCardForm item={item} onSave={handleSave} />) : (<></>)
      }
    </article >
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onActiveCard(activeCard) {
      dispatch(ActionCreator.activeCard(activeCard));
    },
    onDeleteCard(card) {
      dispatch(ActionCreator.deleteCard(card));
    },
    onSave(updatedCard) {
      dispatch(ActionCreator.updateCard(updatedCard));
    },
  };
};

CarCard.propTypes = {
  item: CarCardTypes,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onActiveCard: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export {CarCard};
export default connect(null, mapDispatchToProps)(CarCard);
