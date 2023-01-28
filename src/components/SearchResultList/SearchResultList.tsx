import React from 'react';
import SearchResultItem from '../SearchResultItem';
import styles from './SearchResultList.module.css';

interface IProps {
    locations: any[];
    listRef: any;
    hideList: () => void;
    query: string;
}

const SearchResultList: React.FC<IProps> = ({
    locations,
    listRef,
    hideList,
    query
}) => {

    if (locations?.length === 0) {
        return (
            <div
                className={styles.searchList}
                ref={listRef}
            >
                {!query ?
                    <div className='small text-secondary px-1 mb-2'>
                        No Recent searches
                    </div>
                    :
                    <div className='small text-secondary px-1 mb-2'>
                        No location found with the administrative boundaries
                    </div>
                }
            </div>
        )
    }

    return (
        <div
            className={styles.searchList}
            ref={listRef}
        >
            {!query &&
                <div className='small text-secondary px-1 mb-2'>
                    Recent searches
                </div>
            }
            {locations?.map(loc => (
                <SearchResultItem
                    key={loc.osm_id || loc.place_id}
                    location={loc}
                    hideList={hideList}
                />
            ))}
        </div>
    )
};

export default SearchResultList;