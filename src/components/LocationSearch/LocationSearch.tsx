import React, { useContext, useEffect, useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import useSearchLocation from '../../hooks/useSearchLocation';
import SearchResultList from '../SearchResultList';
import styles from './LocationSearch.module.css';
import { Context as SearchContext } from "../../contexts/SearchContext";

const LocationSearch = () => {
    const { state: { locations, selectedLocation } } = useContext(SearchContext)
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const { loading } = useSearchLocation(debouncedQuery);
    const [showResults, setShowResults] = useState(false);
    const listRef = useRef<any>();

    const copyLocation = () => {
        if (navigator) {
            let location_url = window.location.href;
            navigator.clipboard.writeText(location_url);
        }
    };

    useDebounce(() => {
        setDebouncedQuery(query)
    }, [query], 600);

    useEffect(() => {
        const callback = (e: any) => {
            if (listRef.current && !listRef.current?.contains(e.target)) {
                setShowResults(false);
            }
        };
        window.addEventListener('click', callback);
        return () => {
            window.removeEventListener('click', callback);
        }
    }, []);

    return (
        <div className={`jumbotron bg-light text-center py-5`}>
            <h1 className={`my-4 ${styles.heading}`}>
                Sky Locations
            </h1>
            <div className='d-flex justify-content-center align-items-center'>
                <div className={styles.searchContainer}>
                    <input
                        className='form-control'
                        placeholder='Search location'
                        onClick={(e) => { e.stopPropagation(); setShowResults(true); }}
                        value={query}
                        onChange={({ target }) => setQuery(target.value)}
                        type='search'
                    />
                    <div className='my-2 px-2'>
                        {loading && <div className={styles.loader}>Loading...</div>}
                    </div>

                    {showResults &&
                        <SearchResultList
                            locations={locations}
                            listRef={listRef}
                            hideList={() => setShowResults(false)}
                            query={query}
                        />
                    }

                    <div
                        className={`${styles.locationName} text-success mt-2`}
                        onClick={copyLocation}
                    >
                        {selectedLocation?.display_name}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LocationSearch;