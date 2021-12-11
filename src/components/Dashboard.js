import Cd from './Cd'
import Control from './Control'
import Progress from './Progress'
import Header from './Header'
import ChangeList from './ChangeList'
import SongWave from './SongWave'

import { useEffect } from 'react'
import ChangeTheme from './ChangeTheme'
import UserIcon from './UserIcon'

export default function Dashboard({validated, userIcon ,songState ,volumeIcon, volumeBackground, modifyClassTheme, modifySongRegion, songDetail, modifySongPlay, modifyIsPlaying, percentage, modifyPercentage, modifyCurruntTime, songCount, modifySongState, songs, ModifySongVolume}) {
    useEffect(()=>{
        if (songs.length !== 0) modifySongPlay(songDetail.songIndex,true);
    }, [songCount])
    return (
        <div key={`${songDetail.songRegion} ${songDetail.classTheme}`} className="dashboard">
            <div className="volume-container"><div className={volumeBackground}></div><i className={`${volumeIcon} volume-icon`} onClick={() => {ModifySongVolume()}}/></div>
            <SongWave isPlaying={songDetail.isPlaying}/>
            <ChangeTheme modifyClassTheme={modifyClassTheme}/>
            {(validated)? <UserIcon userIcon={userIcon}/> : ((validated === undefined)? <ChangeList songRegion={songDetail.songRegion} modifySongRegion={modifySongRegion}></ChangeList> : <UserIcon userIcon={userIcon}/>)}
            <Header song={songDetail.song} singer={songDetail.singer} />
            <Cd image={songDetail.cdThumb} isPlaying={songDetail.isPlaying} modifyIsPlaying={modifyIsPlaying} />
            <Control songState={songState} modifySongState={modifySongState} songCount={songCount} songIndex={songDetail.songIndex} isPlaying={songDetail.isPlaying} modifySongPlay={modifySongPlay} modifyIsPlaying={modifyIsPlaying} />
            <Progress cdThumb={songDetail.cdThumb} duration={songDetail.duration} percentage={percentage} modifyPercentage={modifyPercentage} modifyCurruntTime={modifyCurruntTime} />
        </div>
    )
}