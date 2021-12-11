import { useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner';

import {
  searchByKeyword,
} from "nhaccuatui-api-full";
import SongsModal from './SongsModal';

export default function AddSong(props) {
  const valueRef = useRef();
  const [show, setShow] = useState(false);
  const [songsList, setSongsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleInputOnchange = (value) => {
    if (!value) return;
    setLoading(true);
    searchByKeyword(value).then((data) => {
      if (data.status == 'success') { if (valueRef.current.value === value) setSongsList(data.search.song.song); setLoading(false); setError(false); }
      else if (data.status == 'error') {
        console.log("Error search");
        setError(true);
      }
    });
  };

  async function addSongToDatabase(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
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
          <h2 className="text-center">Search song</h2>
          <input ref={valueRef} onChange={(e) => { handleInputOnchange(e.target.value); }} className="search-song-input"></input>
          <div className="songs-modal-container">
            {(!error) ? <>{((songsList) ? ((loading == false) ? songsList.map((song, index) => {
              return (
                <SongsModal userDetail={props.userDetail} addSongToDatabase={addSongToDatabase} modifySongPlay={props.modifySongPlay} songs={props.songs} handleAddSong={props.handleAddSong} id={song.key} song={song.title} artists={song.artists} image={song.thumbnail}></SongsModal>
              )
            }) : <div className="songs-modal-loading"><h4>Loading <Spinner animation="border" className="spinner" variant="info" /></h4></div>) : "")}</> : <div className="error"><img src="https://firebasestorage.googleapis.com/v0/b/trunkey-music-player.appspot.com/o/error.jpg?alt=media&token=8411cc5c-4456-489d-b0a1-3eb129ddd564"></img></div>}
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