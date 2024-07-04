import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {CarCardTypes} from '../prop-types/car-card';
import leaflet from 'leaflet';
import "leaflet/dist/leaflet.css";
import {connect} from 'react-redux';

const Map = (props) => {
  const {cards, activeCard, cities, city} = props;
  const mapRef = useRef();

  useEffect(() => {
    const currentCity = cities.slice().find((town) => town.city === city);

    mapRef.current = leaflet.map(`map`, {
      center: {
        lat: currentCity.lat,
        lng: currentCity.lng
      },
      zoom: 11
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(mapRef.current);
    return () => {
      mapRef.current.remove();
    };
  }, [city, cards]);

  useEffect(() => {
    cards.forEach((card) => {
      const customIcon = leaflet.icon({
        iconUrl: card.id === activeCard.id ? `./pin-active.svg` : `./pin.svg`,
        iconSize: [27, 39]
      });

      leaflet.marker({
        lat: card.latitude,
        lng: card.longitude
      },
        {
          icon: customIcon,
        })
        .addTo(mapRef.current)
        .bindPopup(card.name);
    });
  });

  return (
    <>
      <div id="map" style={{height: `100%`}}></div>
    </>
  );
};

Map.propTypes = {
  cards: PropTypes.arrayOf(CarCardTypes).isRequired,
  activeCard: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  cars: state.cars,
  activeCard: state.activeCard,
});

export default connect(mapStateToProps, null)(Map);
