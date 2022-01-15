import { v4 as uuidv4 } from 'uuid';
import {PlaylistidContext} from "./HomeUser";
import { useContext } from 'react';

export default function LocalSongs(props) {
    const playlistid = useContext(PlaylistidContext);
    
    async function addSongToDatabase(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return response.json();
    }

    const handleAddButton = () => {
        const username = props.userDetail.username;
        const userid = props.userDetail.userid;
        const url = `${process.env.REACT_APP_API_ENDPOINT}/user/${props.userDetail.username}/songs`;
        // eslint-disable-next-line
        const urldev = `http://localhost:5000/api/user/${props.userDetail.username}/songs`;
        let newSong = {
            name: props.song,
            singer: props.singer,
            path: props.path,
            image: props.image,
            username,
            userid,
            songid: uuidv4(),
            playlistid: (playlistid)? playlistid : userid,
        }
        console.log(newSong);
        props.handlePostSongsLoading(true);
        addSongToDatabase(url, newSong)
        .then((response) => { props.handleAddSong(newSong); console.log(response); })
        .catch(() => { console.log("Cannot add song local") })
        .finally(() => props.handlePostSongsLoading(false));
    }

    return (
        <div className="songs-modal" key={props.index}>
            <div className="songs-modal-img">
                <img alt="hello" src={props.image}></img>
            </div>
            <div className="songs-modal-detail">
                <h5 className="songs-modal-detail-song">{props.song}</h5>
                <h4 className="songs-modal-detail-singger">{props.singer}</h4>
                <button onClick={() => { handleAddButton() }} className="song-modal-detail-button custom-download-btn">Add</button>
            </div>
        </div>
    )
}