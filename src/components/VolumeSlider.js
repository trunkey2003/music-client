import React from 'react'

export default function VolumeSlider({handleOnChangeVolume}) {
    return (
        <input id="volume" onChange={(e) => {handleOnChangeVolume(e)}} className="slider" type="range" step="0.01" min="0" max="1"></input>
    )
}