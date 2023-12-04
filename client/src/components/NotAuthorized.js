import React from "react"

export const NotAuthorized = () => {
    return(
        <div className="text-white" style={{display: 'grid', height: '100vh', placeItems: 'center'}}>
            <div>
                <h1>403 Forbidden</h1>
                <div>
                    <h3>You're not Not Authorized </h3>
                    <h3>Log In to access this page</h3>
                </div>
            </div>
        </div>
    )
}