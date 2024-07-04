import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {CarCardTypes} from '../prop-types/car-card';

const EditCardForm = ({item, onSave}) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    model: '',
    year: '',
    color: '',
    price: '',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        name: item.name,
        model: item.model,
        year: item.year,
        color: item.color,
        price: item.price,
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form__input"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        className="form__input"
        type="text"
        name="model"
        value={formData.model}
        onChange={handleChange}
      />
      <input
        className="form__input"
        type="number"
        name="year"
        value={formData.year}
        onChange={handleChange}
      />
      <input
        className="form__input"
        type="text"
        name="color"
        value={formData.color}
        onChange={handleChange}
      />
      <input
        className="form__input"
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <button className="form__submit" type="submit">Сохранить</button>
    </form>
  );
};

EditCardForm.propTypes = {
  item: CarCardTypes,
  onSave: PropTypes.func.isRequired,
};

export default EditCardForm;
