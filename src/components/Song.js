import React from 'react'

export default function Song(props) {
    let classActive="song us-uk";

    const modifySongPlay = function(index){
        props.modifySongPlay(index, true);
        props.modifyIsPlaying(false);
    }

    if (props.songIndex === props.index){
        classActive = "song us-uk active"
    }

    return (
        <div className={classActive} onClick={() => {modifySongPlay(props.index)}}>
            <div className="thumb" style={{ backgroundImage: `url('${props.thumb}')` }}>
            </div>

            <div className="body">
                <h3 className="title">{props.title}</h3>
                <p className="author">{props.singer}</p>
            </div>

            <div className="option">
                <i className="fas fa-ellipsis-h"></i>
            </div>
        </div>
    )
}