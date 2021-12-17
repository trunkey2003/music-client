export default function Progress({percentage, modifyPercentage, modifyCurruntTime, duration, cdThumb}) {
    const handleOnChangeProgress = (e) =>{
        modifyPercentage(e.target.value);
        modifyCurruntTime(duration*e.target.value/100);
    }
    return (
        <input id="progress" onChange={(e) => {handleOnChangeProgress(e)}} className="progress" type="range" step="1" min="0" max="100" style={{backgroundImage : `url(${cdThumb})`}} value={(percentage)? percentage : 0}></input>
    )
}