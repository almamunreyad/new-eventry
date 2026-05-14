import { useEffect, useMemo, useRef } from "react";

const useDebounce = (callback, delay) => {
    const callbackRef = useRef(callback);
    const timeoutIdRef = useRef(null);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        };
    }, []);

    return useMemo(
        () =>
            (...args) => {
                if (timeoutIdRef.current) {
                    clearTimeout(timeoutIdRef.current);
                }

                timeoutIdRef.current = setTimeout(() => {
                    callbackRef.current(...args);
                }, delay);
            },
        [delay]
    );
};

export default useDebounce;
