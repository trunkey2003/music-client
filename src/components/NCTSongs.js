import {
    getSong,
} from "nhaccuatui-api-full";
import { v4 as uuidv4 } from 'uuid';
import {PlaylistidContext} from "./HomeUser";
import { useContext } from 'react';

export default function NCTSongs({modifyPostSongsLoading, index, userDetail,addSongToDatabase, handleAddSong, song, artists, image, path, id}) {
    var singers = "";
    const username = userDetail.username;
    const userid = userDetail.userid;
    const playlistid =  useContext(PlaylistidContext);
     // eslint-disable-next-line
    const url = `${process.env.REACT_APP_API_ENDPOINT}/user/${username}/songs`;
     // eslint-disable-next-line
    const devUrl = `http://localhost:5000/api/user/${username}/songs`;
    image = (image)? image : "https://i1.sndcdn.com/avatars-000606604806-j6ghpm-t500x500.jpg";
    if (artists) {artists.map((singer, index) => {
        singers = singers + singer.name;
        if (artists.length-1 !== index) singers = singers + " - ";
        return 0;
    })}

    const handleAddButton = async (songID) =>{
        await getSong(songID).then((data) => {console.log(data); path = data.song?.streamUrls[0].streamUrl});
        let newSong = {
            name: song,
            singer: singers,
            path: path,
            image: image,
            playlistid: (playlistid)? playlistid : userid,
        }
        let SongToDabase = Object.assign(newSong, {userid : userid, songid: uuidv4()});
        console.log(SongToDabase);
        modifyPostSongsLoading(true);
        await addSongToDatabase(url, SongToDabase)
        .then((data) => {console.log(data);})
        .catch((err) => console.log(err))
        .finally(() => modifyPostSongsLoading(false))
        await handleAddSong(newSong);
    }
    
    return(
        <div className="songs-modal" key={index}>
            <div className="songs-modal-img">
                <img alt="hello" src={image}></img>
            </div>
            <div className="songs-modal-detail">
                <h5 className="songs-modal-detail-song">{song}</h5>
                <h4 className="songs-modal-detail-singger">{singers}</h4>
                <button onClick={() => {handleAddButton(id)}} className="song-modal-detail-button custom-download-btn">Add</button>
            </div>
        </div>
    )
}