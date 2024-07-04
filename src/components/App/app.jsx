import React from 'react';
import MainPage from '../main-page/main-page';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {CitiesListTypes} from '../prop-types/car-card';
import '../../App.css';

const App = (props) => {
  const {sortingList, citiesList} = props;

  return (
    <BrowserRouter  basename="/cars_shop">
      <Switch>
        <Route exact path="/">
          <MainPage
            sortingList={sortingList}
            citiesList={citiesList}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  citiesList: PropTypes.arrayOf(CitiesListTypes).isRequired,
  sortingList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
