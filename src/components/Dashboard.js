import Cd from './Cd'
import Control from './Control'
import Progress from './Progress'
import Header from './Header'
import ChangeList from './ChangeList'
import SongWave from './SongWave'

import { useEffect } from 'react'
import ChangeTheme from './ChangeTheme'
import UserIcon from './UserIcon'

export default function Dashboard({userDetail, validated, userIcon ,songState ,volumeIcon, volumeBackground, modifyClassTheme, modifySongRegion, songDetail, modifySongPlay, modifyIsPlaying, percentage, modifyPercentage, modifyCurruntTime, songCount, modifySongState, songs, ModifySongVolume}) {
    useEffect(()=>{
        if (songs.length !== 0) modifySongPlay(songDetail.songIndex,true);
        // eslint-disable-next-line
    }, [])
    return (
        <div key={`${songDetail.songRegion} ${songDetail.classTheme}`} className="dashboard">
            <div className="volume-container"><div className={volumeBackground}></div><i className={`${volumeIcon} volume-icon`} onClick={() => {ModifySongVolume()}}/></div>
            <SongWave isPlaying={songDetail.isPlaying}/>
            <ChangeTheme modifyClassTheme={modifyClassTheme}/>
            {(validated)? <UserIcon userDetail={userDetail} validated={validated} userIcon={userIcon}/> : ((validated === undefined && !userIcon)? <ChangeList songRegion={songDetail.songRegion} modifySongRegion={modifySongRegion}></ChangeList> : <UserIcon userDetail={userDetail} validated={validated} userIcon={userIcon}/>)}
            {(validated === undefined && !userIcon)? <UserIcon className="user-icon-home" userIcon={"https://trunkey2003.github.io/general-img/default-profile-pic.jpg"}></UserIcon> : <></>}
            <Header song={songDetail.song} singer={songDetail.singer} />
            <Cd image={songDetail.cdThumb} isPlaying={songDetail.isPlaying} modifyIsPlaying={modifyIsPlaying} />
            <Control songState={songState} modifySongState={modifySongState} songCount={songCount} songIndex={songDetail.songIndex} isPlaying={songDetail.isPlaying} modifySongPlay={modifySongPlay} modifyIsPlaying={modifyIsPlaying} />
            <Progress cdThumb={songDetail.cdThumb} duration={songDetail.duration} percentage={percentage} modifyPercentage={modifyPercentage} modifyCurruntTime={modifyCurruntTime} />
        </div>
    )
}