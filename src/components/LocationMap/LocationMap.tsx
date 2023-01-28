import React from 'react';
import styles from './LocationMap.module.css';
import MapContainer from '../MapContainer';

const LocationMap = () => {

    return (
        <div className={`${styles.locationMapContainer}`}>
            <MapContainer />
        </div>
    )
};

export default LocationMap;