export const ActionType = {
  CHANGE_CITY: `ChangeCity`,
  SORT_CARS: `SortCars`,
  ACTIVE_CARD: `ActiveCard`,
  LOAD_CARS: `LoadCars`,
  DELETE_CARD: `DeleteCard`,
  UPDATE_CARD: `UpdateCard`,
};

export const ActionCreator = {
  selectCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  sortCars: (sort) => ({
    type: ActionType.SORT_CARS,
    payload: sort,
  }),
  activeCard: (activeCard) => ({
    type: ActionType.ACTIVE_CARD,
    payload: activeCard,
  }),
  loadCars: (cars) => ({
    type: ActionType.LOAD_CARS,
    payload: cars,
  }),
  deleteCard: (card) => ({
    type: ActionType.DELETE_CARD,
    payload: card,
  }),
  updateCard: (card) => ({
    type: ActionType.UPDATE_CARD,
    payload: card,
  })
};

const compareCar = {
  default: (CarOfferA, CarOfferB) => CarOfferA.id - CarOfferB.id,
  priceToHigh: (CarOfferA, CarOfferB) => CarOfferA.price - CarOfferB.price,
  priceToLow: (CarOfferA, CarOfferB) => CarOfferB.price - CarOfferA.price,
  year: (CarOfferA, CarOfferB) => CarOfferB.year - CarOfferA.year,
};

export const sortCars = (cars, sortType) => {

  switch (sortType) {
    case `Популярные`:
      return cars.slice().sort(compareCar.default);
    case `Цена: по возрастанию`:
      return cars.slice().sort(compareCar.priceToHigh);
    case `Цена: по убыванию`:
      return cars.slice().sort(compareCar.priceToLow);
    case `Год выпуска`:
      return cars.slice().sort(compareCar.year);
  }

  return cars;
};
