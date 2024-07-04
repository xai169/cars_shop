import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import PropTypes from 'prop-types';
import {CitiesListTypes} from '../prop-types/car-card';

const CitiesList = (props) => {
  const {cities, onCitySelect, city} = props;
  const isActive = `tabs__item--active`;

  return (
    <ul className="locations__list tabs__list">
      {
        cities.map((item) => {
          return (
            <li className="locations__item" key={`${item.city}`} onClick={() => onCitySelect(item.city)}>
              <a className={`locations__item-link tabs__item ${city === item.city ? isActive : ``}`} href="#">
                <span>{item.city}</span>
              </a>
            </li>
          );
        })
      }
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    city: state.city
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCitySelect(city) {
      dispatch(ActionCreator.selectCity(city));
    },
  };
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(CitiesListTypes).isRequired,
  onCitySelect: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
};

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
