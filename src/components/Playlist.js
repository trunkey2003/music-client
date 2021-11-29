import React from 'react'
import Song from './Song'


export default function Playlist(props) {
    return (
        <div className="playlist">
            {props.songs && props.songs.map((song, index) => {
                return (
                    <Song thumb= {song.image} title={song.name} singer={song.singer} songIndex={props.songIndex} index={index} key={index} modifySongPlay={props.modifySongPlay} songs={props.songs} modifyIsPlaying={props.modifyIsPlaying}/>
                )
            })}
        </div>
    )
}