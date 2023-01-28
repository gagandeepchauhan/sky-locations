import React, { useContext } from 'react';
import styles from './SearchResultItem.module.css';
import { Context as SearchContext } from "../../contexts/SearchContext";
import { useNavigate } from 'react-router-dom';

interface IProps {
    location: any;
    hideList: () => void;
}

const SearchResultItem: React.FC<IProps> = ({
    location,
    hideList
}) => {
    const navigate = useNavigate();

    const handleItemClick = () => {
        navigate(`/?lat=${location?.lat}&lon=${location?.lon}`);
        hideList();
    };

    return (
        <div
            className={styles.searchItem}
            onClick={handleItemClick}
        >
            <div className=''>
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div>
                {location?.display_name?.substr(0, 80)}
                {location?.display_name?.length > 80 ? '...' : null}
            </div>
        </div>
    )
};

export default SearchResultItem;