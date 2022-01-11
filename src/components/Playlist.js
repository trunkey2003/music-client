import AddSong from './AddSong'
import Song from './Song'
import UserModifyLoading from "./UserModifyLoading";
import { useState } from 'react';

export default function Playlist(props) {
    const [loadingDelete, setLoadingDelete] = useState(false);
    return (
        <div key={props.songRegion + " " + props.classTheme} className="playlist">
            {(loadingDelete)? <UserModifyLoading /> : <></>}
            {((props.validated && props.songs) ?
                (
                    <>
                        {props.songs.map((song, index) => {
                            return (
                                <Song modifyLoadingDelete={(param) => setLoadingDelete(param)} songid={song.songid} username={props.userDetail.username} validated={props.validated} handleSoftDelte={props.handleSoftDelte} thumb={song.image} title={song.name} src={song.path} singer={song.singer} songIndex={props.songIndex} index={index} key={index} modifySongPlay={props.modifySongPlay} modifyIsPlaying={props.modifyIsPlaying} />
                            )
                        })}
                        <AddSong userDetail={props.userDetail} modifySongPlay={props.modifySongPlay} songs={props.songs} handleAddSong={props.handleAddSong} />
                    </>
                )
                :
                <>
                    {props.songs.map((song, index) => {
                        return (
                            <Song objectid={song.id} validated={props.validated} handleSoftDelte={props.handleSoftDelte} thumb={song.image} title={song.name} src={song.path} singer={song.singer} songIndex={props.songIndex} index={index} key={index} modifySongPlay={props.modifySongPlay} modifyIsPlaying={props.modifyIsPlaying} />
                        )
                    })}
                </>
            )
            }
        </div>
    )
}