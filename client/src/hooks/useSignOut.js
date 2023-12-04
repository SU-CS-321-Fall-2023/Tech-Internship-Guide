import { useEffect } from "react"

export const useSignOut = () => {
    useEffect(() => {
        const signout = async() => {
            await fetch("http://localhost:4000/signout", {
                credentials: 'include'
            })
        }
        signout()
    }, [])
}