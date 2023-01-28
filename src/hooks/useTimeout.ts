import { useCallback, useEffect, useRef } from 'react';

const useTimeout = (callback: () => void, delay: number) => {
    const callbackRef = useRef(callback);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
    }, [delay]);

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []);

    useEffect(() => {
        set();
        return clear;
    }, [set, clear, delay]);

    const reset = useCallback(() => {
        clear();
        set();
    }, [set, clear]);

    return {
        clear,
        reset
    }
};

export default useTimeout;