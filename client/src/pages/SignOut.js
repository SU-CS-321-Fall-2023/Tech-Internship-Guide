import React from 'react'
import { useSignOut } from '../hooks/useSignOut'
import { Navigate } from 'react-router'

export const SignOut = () => {
    useSignOut()

    return (
        <Navigate to={'/'}/>
    )
}
