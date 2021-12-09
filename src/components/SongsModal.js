import {
    getSong,
} from "nhaccuatui-api-full";

export default function SongsModal({handleAddSong, song, artists, image, path, id}) {
    var singers = "";
    image = (image)? image : "https://i1.sndcdn.com/avatars-000606604806-j6ghpm-t500x500.jpg";
    if (artists) {artists.map((singer, index) => {
        singers = singers + singer.name;
        if (artists.length-1 != index) singers = singers + " - ";
    })}

    const handleAddButton = async (songID) =>{
        await getSong(songID).then((data) => path = data.song.streamUrls[0].streamUrl);
        console.log(path);
        let newSong = {
            name: song,
            singer: singers,
            path: path,
            image: image,
        }
        await handleAddSong(newSong);
    }
    return(
        <div className="songs-modal">
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