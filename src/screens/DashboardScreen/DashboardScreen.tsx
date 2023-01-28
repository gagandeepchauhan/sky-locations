import React, { useContext, useEffect, useRef, useState } from 'react';
import LocationMap from '../../components/LocationMap';
import LocationSearch from '../../components/LocationSearch';
import styles from './DashboardScreen.module.css';
import { Context as FlashMessageContext } from '../../contexts/FlashMessageContext';
import { Context as SearchContext } from '../../contexts/SearchContext';
import { useSearchParams } from 'react-router-dom';
import { Canceler } from 'axios';

const DashboardScreen = () => {
    const { state: messages, clearMessage, addMessage } = useContext(FlashMessageContext);
    const { getSearchLocation } = useContext(SearchContext);
    const [params] = useSearchParams();
    const [lat, lon] = [Number(params.get('lat')), Number(params.get('lon'))];
    const [loading, setLoading] = useState(false);
    const firstTimeRef = useRef(true);

    useEffect(() => {
        if (firstTimeRef.current) {
            firstTimeRef.current = false;
            addMessage('You can click on the selected location to copy');
        }
    }, []);

    useEffect(() => {
        let cancel: Canceler;
        if (lat && lon) {
            (async () => {
                setLoading(true);
                await getSearchLocation(
                    {
                        lat, lon
                    },
                    (c: Canceler) => cancel = c,
                    () => addMessage('Unable to locate on map')
                );
                setLoading(false);
            })();
        } else if (lat || lon) {
            addMessage('Invalid query!!');
        }
        return () => {
            if (cancel)
                cancel();
        }; // this cancel refers to the old request not the current one.
    }, [lat, lon]);

    return (
        <div className={styles.dashboardContainer}>
            {messages?.length > 0 &&
                <div className={styles.flashMessagesContainer}>
                    {messages.map((msg: any) => (
                        <div
                            key={msg.id}
                            className={styles.flashMessageContainer}
                        >
                            <div
                                className={styles.close}
                                onClick={() => clearMessage(msg.id)}
                            >
                                x
                            </div>
                            <div className={styles.flashText}>
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            }
            <LocationSearch />
            {loading
                ? <div className={styles.loader}>
                    loading...
                </div>
                : <LocationMap />
            }
        </div>
    )
};

export default DashboardScreen;