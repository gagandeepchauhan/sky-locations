import createDataContext from "./createDataContext";
import api from "../api";
import axios from "axios";

const getSearches = () => {
    const savedLocations = JSON.parse(localStorage.getItem('SKY_LOCATIONS_SEARCHES') ?? '{}');
    return Object.values(savedLocations);
    // savedLocations = { place_id : { place_id: '', lat: '', lon: '', display_name: '' }, ... }
};

const addToSearches = ({ lat, lon, place_id, display_name }) => {
    const savedLocations = JSON.parse(localStorage.getItem('SKY_LOCATIONS_SEARCHES') ?? '{}');
    savedLocations[place_id] = {
        place_id,
        lat,
        lon,
        display_name
    };
    localStorage.setItem('SKY_LOCATIONS_SEARCHES', JSON.stringify(savedLocations));
};

const searchReducer = (state, action) => {
    switch (action.type) {
        case 'add_locations':
            return { ...state, locations: action.payload };
        case 'clear_locations':
            return { ...state, locations: getSearches() };
        case 'set_selected_location':
            return { ...state, selectedLocation: action.payload };
        default:
            return state;
    }
};

const getLocations = dispatch => async (query, setCanceler, errorCb) => {
    if (!query) {
        dispatch({
            type: 'clear_locations'
        });
        return;
    }
    try {
        const res = await api.get('/', {
            params: {
                method: 'GET',
                url: `${api.defaults.params.url}/search?q=${query}&format=json&addressdetails=1&polygon_geojson=1`
            },
            cancelToken: new axios.CancelToken(setCanceler)
        });
        // console.log('data - ', res.data);
        dispatch({
            type: 'add_locations',
            payload: res.data?.filter(loc => loc.type === "administrative") // filter the locations which are of administrative type so that we can draw a polygon 
        });
    } catch (err) {
        if (axios.isCancel(err)) return;
        errorCb();
    } finally {

    }
};

const getSearchLocation = dispatch => async ({ lat, lon }, setCanceler, errorCb) => {
    try {
        const res = await api.get('/', {
            params: {
                method: 'GET',
                url: `${api.defaults.params.url}/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&polygon_geojson=1`
            },
            cancelToken: new axios.CancelToken(setCanceler)
        });
        // console.log('data 2 - ', res.data);
        const location = res.data;
        dispatch({
            type: 'set_selected_location',
            payload: location
        });
        addToSearches(location);
    } catch (err) {
        if (axios.isCancel(err)) return;
        errorCb();
    } finally {

    }
};

const initialValue = {
    locations: getSearches() || [],
    selectedLocation: {
        display_name: 'Boston MA',
        lat: 42.3554334,
        lon: -71.060511
    }
};

export const { Context, Provider } = createDataContext(
    searchReducer,
    { getLocations, getSearchLocation },
    initialValue
);