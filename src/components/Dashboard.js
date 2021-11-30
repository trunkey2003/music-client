import React from 'react'
import Cd from './Cd'
import Control from './Control'
import Progress from './Progress'
// import Audio from './Audio'
import Header from './Header'
import ChangeList from './ChangeList'

export default function Dashboard({modifySongRegion, songDetail, modifySongPlay, modifyIsPlaying, percentage, modifyPercentage, modifyCurruntTime, songCount, modifySongState}) {
    return (
        <div className="dashboard">
            <ChangeList modifySongRegion={modifySongRegion}/>
            <Header song={songDetail.song} singer={songDetail.singer}/>
            <Cd image={songDetail.cdThumb} isPlaying={songDetail.isPlaying} modifyIsPlaying={modifyIsPlaying}/>
            <Control modifySongState={modifySongState} songCount={songCount} songIndex={songDetail.songIndex} isPlaying={songDetail.isPlaying} modifySongPlay={modifySongPlay} modifyIsPlaying={modifyIsPlaying}/>
            <Progress cdThumb={songDetail.cdThumb} duration={songDetail.duration} percentage={percentage} modifyPercentage={modifyPercentage} modifyCurruntTime={modifyCurruntTime}/>
        </div>
    )
}