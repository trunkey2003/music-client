import React from 'react'
import Spinner from 'react-bootstrap/Spinner';


export default function Loading() {
    return (
        <div className="Loading">
            <h1>Loading songs from database <Spinner animation="border" variant="danger" /></h1>
        </div>
    )
}