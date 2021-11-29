import React from 'react'

export default function Audio(props) {
    console.log(props.ref);
    return (
        <audio id="audio" src={props.src}></audio>
    )
}