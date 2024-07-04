import React, {useState} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import PropTypes from 'prop-types';

const Sorting = (props) => {
  const {sortingList, sort, onSortSelect} = props;
  const isActive = `cars__option--active`;
  const [isSortingListShow, setSortingListShow] = useState(false);
  const handleSortingListShow = () => {
    setSortingListShow(!isSortingListShow);
  };

  return (
    <form className="cars__sorting" action="#" method="get" onClick={handleSortingListShow}>
      <span className="cars__sorting-caption">Sort by </span>
      <span className="cars__sorting-type" tabIndex="0">
        {sort}
        <svg className="cars__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
        <img className="cars__sorting-arrow" src="./arrow.png" width="7" height="4" />
      </span>
      <ul className={`cars__options cars__options--custom ${isSortingListShow ? `cars__options--opened` : ``}`}>
        {
          sortingList.map((sortingItem) => {
            return (
              <li className={`cars__option ${sortingItem === sort ? isActive : ``}`} tabIndex="0" key={sortingItem} onClick={() => onSortSelect(sortingItem)}>{sortingItem}</li>
            );
          })
        }
      </ul>
    </form>
  );
};

Sorting.propTypes = {
  sortingList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSortSelect: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    sort: state.sort
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSortSelect(sort) {
      dispatch(ActionCreator.sortCars(sort));
    },
  };
};

export {Sorting};
export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
