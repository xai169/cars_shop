import React, {useEffect} from 'react';
import CarsList from '../cars-list/cars-list';
import CitiesList from '../cities-list/cities-list';
import PropTypes from 'prop-types';
import {CarCardTypes, CitiesListTypes} from '../prop-types/car-card';
import Map from '../map/map';
import {connect} from 'react-redux';
import Sorting from '../sorting/sorting';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchCarsList} from "../../store/api-actions";

const MainPage = (props) => {
  const {citiesList, cars, sortingList, isDataLoaded, onLoadData} = props;

  useEffect(() => {
    if (!isDataLoaded) {
      onLoadData();
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            {
              <CitiesList cities={citiesList} />
            }
          </section>
        </div>
        <div className="cities">
          <div className="cities__cars-container container">
            <section className="cities__cars cars">
              <h2 className="visually-hidden">cars</h2>
              <b className="cars__found">{cars.length} {cars.length === 1 ? `автомобиль` : `автомобилей`} доступно</b>
              {<Sorting sortingList={sortingList} />}
              <div className="cities__cars-list cars__list tabs__content">
                {<CarsList cards={cars} />}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {<Map cards={cars} cities={citiesList} />}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

MainPage.propTypes = {
  cars: PropTypes.arrayOf(CarCardTypes).isRequired,
  citiesList: PropTypes.arrayOf(CitiesListTypes).isRequired,
  sortingList: PropTypes.arrayOf(PropTypes.string).isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    city: state.city,
    cars: state.cars,
    isDataLoaded: state.isDataLoaded,
    authorizationStatus: state.authorizationStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchCarsList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
