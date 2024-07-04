import {ActionCreator} from "./action";

export const fetchCarsList = () => (dispatch, _getState, api) => (
  api.get(`/vehicles`)
    .then(({data}) => dispatch(ActionCreator.loadCars(data)))
);
