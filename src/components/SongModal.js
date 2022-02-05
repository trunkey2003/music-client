import NCTSongs from "./NCTSongs"
import Spinner from "react-bootstrap/esm/Spinner";
import {
    searchByKeyword
  } from "nhaccuatui-api-full";
import {useCallback, useState} from 'react';
import { debounce } from "debounce";
import UserModifyLoading from "./UserModifyLoading";

export default function SongModal(props) {
    const [PostSongsLoading, setPostSongsLoading] = useState(false)
     // eslint-disable-next-line
    const debounceSearchSong = useCallback(debounce((value) => searchSong(value), 1000), []);
    const searchSong = (value) => {
        searchByKeyword(value).then((data) => {
            console.log(data);
            if (data.status === 'success') { console.log(data.search); props.setSongsList(data.search.song.song); props.setLoading(false); props.setError(false); }
            else if (data.status === 'error') {
                console.log("Error search");
                props.setError(true);
            }
        })
        .catch((err) => {console.log(err)})
        ;
    }

    const handleInputOnchange = (value) => {
        if (!value) return;
        props.setLoading(true);
        debounceSearchSong(value);
    };

    if (props.error) {
        return (
            <div className="error"><img alt="failed-loading" src="https://firebasestorage.googleapis.com/v0/b/trunkey-music-player.appspot.com/o/error.jpg?alt=media&token=8411cc5c-4456-489d-b0a1-3eb129ddd564"></img></div>
        )
    }
    // if (props.loading)
    //     return (
    //         <div className="songs-modal-loading"><h4>Loading <Spinner animation="border" className="spinner" variant="info" /></h4></div>
    //     )

    return (
        <div>
            {(PostSongsLoading)? <UserModifyLoading /> : <></>}
            <input onChange={(e) => { handleInputOnchange(e.target.value); }} className="search-song-input"></input>
            {props.songsList && (props.loading)? <div className="songs-modal-loading"><h4>Loading <Spinner animation="border" className="spinner" variant="info" /></h4></div> : props.songsList.map((song, index) => {
                return (
                    <NCTSongs modifyPostSongsLoading={(bl) => setPostSongsLoading(bl)}index={index} userDetail={props.userDetail} addSongToDatabase={props.addSongToDatabase} modifySongPlay={props.modifySongPlay} songs={props.songs} handleAddSong={props.handleAddSong} id={song.key} song={song.title} artists={song.artists} image={song.thumbnail} />
                )
            })}
        </div>
    )
}
    // (!error) ? <>{((songsList) ? ((!loading) ? songsList.map((song, index) => {
    //     return (
    //         <SongsModal index={index} userDetail={props.userDetail} addSongToDatabase={addSongToDatabase} modifySongPlay={props.modifySongPlay} songs={props.songs} handleAddSong={props.handleAddSong} id={song.key} song={song.title} artists={song.artists} image={song.thumbnail}></SongsModal>
    //     )
    // }) : <div className="songs-modal-loading"><h4>Loading <Spinner animation="border" className="spinner" variant="info" /></h4></div>) : "")}</> : <div className="error"><img alt="failed-loading" src="https://firebasestorage.googleapis.com/v0/b/trunkey-music-player.appspot.com/o/error.jpg?alt=media&token=8411cc5c-4456-489d-b0a1-3eb129ddd564"></img></div>