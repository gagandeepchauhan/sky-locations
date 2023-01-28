import React, { useContext, useMemo } from 'react';
import styles from './MapContainer.module.css';
import { Map, Marker, GoogleApiWrapper, Polygon } from 'google-maps-react';
import { Context as SearchContext } from '../../contexts/SearchContext';

const parseCoordinates = (coordinates) => {
    if (!coordinates) return [];
    var result = [];
    for (var index = 0; index < coordinates.length; index++) {
        result.push({
            lat: Number(coordinates[index][0]),
            lng: Number(coordinates[index][1]),
        });
    }
    // console.log('result coords - ', result);
    return result;
};

export const MapContainer = ({
    google
}) => {
    const { state: { selectedLocation } } = useContext(SearchContext);
    // console.log('selected location -', selectedLocation);
    const coordinates = useMemo(() => {
        return parseCoordinates(selectedLocation?.geojson?.coordinates);
    }, [selectedLocation]);

    return (
        <Map
            style={{ width: "100%", height: "100%" }}
            google={google} zoom={12}
            initialCenter={{
                lat: selectedLocation.lat,
                lng: selectedLocation.lon
            }}
            center={{
                lat: selectedLocation.lat,
                lng: selectedLocation.lon
            }}
            onClick={(props) => console.log(props)}
        >
            <Marker
                position={{
                    lat: selectedLocation.lat,
                    lng: selectedLocation.lon
                }}
            />
            <Polygon
                path={coordinates}
                options={{
                    fillColor: "red",
                    fillOpacity: 0.4,
                    strokeColor: "#d35400",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                }}
            />
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);