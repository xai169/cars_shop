import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/app';
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {reducer} from "./store/reducer";
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {createAPI} from "./api/api";

import {CitiesList, Sort} from "./const";

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

ReactDOM.render(
    <Provider store={store}>
      <App
        sortingList={Sort}
        citiesList={CitiesList}
      />
    </Provider>,
    document.querySelector(`#root`)
);
