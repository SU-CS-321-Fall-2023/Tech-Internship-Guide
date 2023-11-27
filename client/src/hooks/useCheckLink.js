import { useEffect, useState } from "react";

export const useCheckLink = (url) => {
    const [valid, setValid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkLink = async() => {
            try{
                const response = await fetch(url, {method: "HEAD"})
                response?.status >= 200 && response?.status < 300 ? setValid(true) : setValid(false)
                setLoading(false);
                return
            }
            catch(err){
                setLoading(false);
                setError(err);
            }
        }
        checkLink()
    }, [url])

    return {valid, loading, error}
}