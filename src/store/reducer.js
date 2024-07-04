
import {ActionType, sortCars} from './action';

const initialState = {
  city: `Санкт-Петербург`,
  cars: [],
  sort: `Популярные`,
  activeCard: {},
  isDataLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ActionType.SORT_CARS:
      return {
        ...state,
        sort: action.payload,
        cars: sortCars(state.cars, action.payload, state.loadCars),
      };
    case ActionType.ACTIVE_CARD:
      return {
        ...state,
        activeCard: action.payload,
      };
    case ActionType.LOAD_CARS:
      return {
        ...state,
        cars: action.payload,
        isDataLoaded: true,
      };
      case ActionType.DELETE_CARD:
      return {
        ...state,
        cars: state.cars.slice().filter((item) => item.id !== action.payload.id),
      };
      case ActionType.UPDATE_CARD:
      return {
        ...state,
        cars: state.cars.slice().map((item) => item.id === action.payload.id ? action.payload : item),
      };
    default:
      return {
        ...initialState
      };
  }
};

export {reducer};
