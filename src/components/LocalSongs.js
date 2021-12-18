import { v4 as uuidv4 } from 'uuid';

export default function LocalSongs(props){
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

    const handleAddButton = () =>{
        const username = props.userDetail.username;
        const userid = props.userDetail.userid;
        const url = `https://api-trunkeymusicplayer.herokuapp.com/api/user/${props.userDetail.username}/songs`;
        let newSong = {
            name: props.song,
            singer: props.singer,
            path: props.path,
            image: props.image,
            username,
            userid,
            songid: uuidv4(),
        }
        console.log(newSong);
        addSongToDatabase(url, newSong).then((response) => {props.handleAddSong(newSong); console.log(response);});
    }

    return(
        <div className="songs-modal" key={props.index}>
            <div className="songs-modal-img">
                <img alt="hello" src={props.image}></img>
            </div>
            <div className="songs-modal-detail">
                <h5 className="songs-modal-detail-song">{props.song}</h5>
                <h4 className="songs-modal-detail-singger">{props.singer}</h4>
                <button onClick={() => {handleAddButton()}} className="song-modal-detail-button custom-download-btn">Add</button>
            </div>
        </div>
    )
}