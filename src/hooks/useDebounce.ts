import { useEffect } from 'react';
import useTimeout from './useTimeout';

const useDebounce = (callback: () => void, dependencies: any, delay: number) => {
    const { reset, clear } = useTimeout(callback, delay);
    useEffect(reset, [...dependencies]);
    useEffect(clear, []);
};

export default useDebounce;