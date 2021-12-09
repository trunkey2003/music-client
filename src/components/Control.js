import {useEffect, useState} from 'react';

export default function Control(props) {
    const [classRandom, setClassRandom] = useState("btn btn-random");
    const [classRepeat, setClassRepeat] = useState("btn btn-repeat");

    useEffect(() =>{
        (props.songState.activeRepeat)? setClassRepeat("btn btn-repeat active") : setClassRepeat("btn btn-repeat");
        (props.songState.activeRandom)? setClassRandom("btn btn-random active") : setClassRandom("btn btn-random");
    }, [props.songState.activeRepeat, props.songState.activeRandom])
    const handleOnClickBtnPrev = () => {
        if (props.songState.activeRepeat){
            props.modifySongPlay(props.songIndex);
            return;
        }
        if (props.songState.activeRandom){ 
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
        if (props.songState.activeRepeat){
            props.modifySongPlay(props.songIndex);
            return;
        }
        if (props.songState.activeRandom){
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
        props.modifySongState.modifyActiveRepeat(!props.songState.activeRepeat);
       
    }

    const handleOnClickBtnRandom = () =>{
        props.modifySongState.modifyActiveRandom(!props.songState.activeRandom);
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