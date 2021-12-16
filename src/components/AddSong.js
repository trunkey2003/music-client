import { debounce } from "debounce";
import {
  searchByKeyword
} from "nhaccuatui-api-full";
import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SongModal from './SongModal';
import LocalSongsModal from './LocalSongsModal';

export default function AddSong(props) {
  const [show, setShow] = useState(false);
  const [songsList, setSongsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [platform, setPlatform] = useState("nhaccuatui");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const debounceSearchSong = useCallback(debounce((value) => searchSong(value), 1000), []);

  const searchSong = (value) => {
    searchByKeyword(value).then((data) => {
      if (data.status === 'success') { setSongsList(data.search.song.song); setLoading(false); setError(false); }
      else if (data.status === 'error') {
        console.log("Error search");
        setError(true);
      }
    });
  }

  const handleInputOnchange = (value) => {
    if (!value) return;
    setLoading(true);
    debounceSearchSong(value);
  };

  function songsPlatform(platform) {
    if (platform === "nhaccuatui") return <SongModal setError={(error) => {setError(error)}} setLoading={(loading) => {setLoading(loading)}} setSongsList={(songs) => {setSongsList(songs)}} error={error} loading={loading} songsList={songsList} userDetail={props.userDetail} addSongToDatabase={addSongToDatabase} modifySongPlay={props.modifySongPlay} songs={props.songs} handleAddSong={props.handleAddSong} />
    if (platform === "local") return <LocalSongsModal handleAddSong={props.handleAddSong} userDetail={props.userDetail}></LocalSongsModal>
  }

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



  return (
    <>
      <div className="add-song-section" onClick={handleShow}>
        Add your own song
      </div>
      <Modal size="lg" className="custom-modal-01" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your song to the playlist</Modal.Title>
          <button type="button" className="custom-btn-close-modal" onClick={handleClose} aria-label="Close"><i className="fas fa-times"></i></button>
        </Modal.Header>
        <Modal.Body>
          {/* <input onChange={(e) => { handleInputOnchange(e.target.value); }} className="search-song-input"></input> */}
          <div className="songs-modal-header">
            <button onClick={() => setPlatform("nhaccuatui")} className={(platform === "nhaccuatui")? "btn-active" : "btn-unactive"}>NhacCuaTui</button>
            <button onClick={() => setPlatform("zingmp3")} className={(platform === "zingmp3")? "btn-active" : "btn-unactive"}>ZingMP3</button>
            <button onClick={() => setPlatform("local")} className={(platform === "local")? "btn-active" : "btn-unactive"}>Local</button>
            <button onClick={() => setPlatform("uploadfiles")} className={(platform === "uploadfiles")? "btn-active" : "btn-unactive"}>Upload Files</button>
          </div>
          <div className="songs-modal-container">
            {songsPlatform(platform)}
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="custom-close-btn" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className="custom-download-btn" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}