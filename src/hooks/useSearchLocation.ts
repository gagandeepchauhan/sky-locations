import { Canceler } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context as FlashMessageContext } from '../contexts/FlashMessageContext';
import { Context as SearchContext } from "../contexts/SearchContext";


const useSearchLocation = (query: string) => {
    const { addMessage } = useContext(FlashMessageContext);
    const { getLocations } = useContext(SearchContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancel: Canceler;
        (async () => {
            setLoading(true);
            await getLocations(
                query,
                (c: Canceler) => cancel = c,
                () => addMessage('Unable to fetch the results')
            );
            setLoading(false);
        })();
        return () => {
            if (cancel)
                cancel();
        }; // this cancel refers to the old request not the current one.
    }, [query]);

    return {
        loading
    };
}

export default useSearchLocation;