import { useEffect, useState } from "react"

export const useSignIn = () => {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const check = async() => {
            const response = await fetch("http://localhost:4000/signin", {
                    method: 'GET',
                    credentials: 'include'
                })
            const res = await response.json()
            setStatus(res?.loggedIn)
        }
        check()
    }, [])

    return status 
}