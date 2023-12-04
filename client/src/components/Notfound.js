import React from "react"

export const NotFound = () => {
    return(
        <div className="text-white" style={{display: 'grid', height: '100vh', placeItems: 'center'}}>
            <div>
                <h1>404 Not Found</h1>
                <div>
                    <h3>The page you're looking for does not exist</h3>
                    <h3>OOPS!!! We are sorry</h3>
                </div>
            </div>
        </div>
    )
}