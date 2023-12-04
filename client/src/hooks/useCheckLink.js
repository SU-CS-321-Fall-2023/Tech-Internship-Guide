import { useEffect, useState } from "react";

export const useCheckLink = (url) => {
    const [valid, setValid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkLink = async() => {
            try{
                const response = await fetch('http://localhost:4000/validate-link', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({url: url})
                })
                response.status === 200 ? setValid(true) : setValid(false)
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