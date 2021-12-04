import React from 'react'
import Song from './Song'


export default function Playlist(props) {
    return (
        <div key={props.songRegion + " " + props.classTheme} className="playlist">
            {props.songs && props.songs.map((song, index) => {
                return (
                    <Song handleSoftDelte={props.handleSoftDelte} thumb= {song.image} title={song.name} src={song.path} singer={song.singer} songIndex={props.songIndex} index={index} key={index} modifySongPlay={props.modifySongPlay} modifyIsPlaying={props.modifyIsPlaying}/>
                )
            })}
        </div>
    )
}