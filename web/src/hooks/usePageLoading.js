import { useState, useEffect } from "react";

const usePageLoading = (...args) => {
    const [loading, setLoading] = useState(true);
    useEffect(
        () => {
            if (args.includes(null) || args.includes(undefined) || args.includes("") ) {
                setLoading(true);
            }
            else {
                setLoading(false);
            }
        }, [args]
    )
    return loading;
}

export default usePageLoading;