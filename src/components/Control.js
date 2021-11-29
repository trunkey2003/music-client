import React from 'react'
import { useState, useRef } from 'react';

export default function Control(props) {
    const activeRandom = useRef(false);  
    const activeRepeat = useRef(false);

    const [classRandom, setClassRandom] = useState("btn btn-random");
    const [classRepeat, setClassRepeat] = useState("btn btn-repeat");

    const handleOnClickBtnPrev = () => {
        if (activeRepeat.current){
            props.modifySongPlay(props.songIndex);
            return;
        }
        if (activeRandom.current){ 
            props.modifySongPlay(Math.round(Math.random()*props.songCount-1));
            return;
        } 
        if (props.songIndex === 0){
            props.modifySongPlay(props.songCount-1);
        } else {
            props.modifySongPlay(props.songIndex-1);
        }
    }

    const handleOnClickBtnNext = () => {
        if (activeRepeat.current){
            props.modifySongPlay(props.songIndex);
            return;
        }
        if (activeRandom.current){
            props.modifySongPlay(Math.round(Math.random()*props.songCount-1));
        } else{
        if (props.songIndex === props.songCount-1){
            props.modifySongPlay(0);
        } else {
            props.modifySongPlay(props.songIndex+1);
        }
        }
    }

    const handleOnClickBtnRepeat = () => {
        activeRepeat.current = !activeRepeat.current;
        (activeRepeat.current)? setClassRepeat("btn btn-repeat active") : setClassRepeat("btn btn-repeat"); 
        props.modifySongState.modifyActiveRepeat(activeRepeat.current);
    }

    const handleOnClickBtnRandom = () =>{
        activeRandom.current = !activeRandom.current;
        (activeRandom.current)? setClassRandom("btn btn-random active") : setClassRandom("btn btn-random");
        props.modifySongState.modifyActiveRandom(activeRandom.current);
    }

    const handleOnClickBtnTogglePlay = () => {
        props.modifyIsPlaying(props.isPlaying)
    }

    return (
        <div className="control">
            <div className={classRepeat} onClick={handleOnClickBtnRepeat}>
                <i className="fas fa-redo"></i>
            </div>

            <div className="btn btn-prev" onClick={() => {handleOnClickBtnPrev()}}>
                <i className="fas fa-step-backward"></i>
            </div>

            <div className="btn btn-toggle-play" onClick={() => {handleOnClickBtnTogglePlay()}}>
                <i className="fas fa-pause icon-pause"></i>
                <i className="fas fa-play icon-play"></i>
            </div>

            <div className="btn btn-next" onClick={() => {handleOnClickBtnNext()}}>
                <i className="fas fa-step-forward"></i>
            </div>

            <div className={classRandom} onClick={handleOnClickBtnRandom}>
                <i className="fas fa-random"></i>
            </div>
        </div>
    )
}