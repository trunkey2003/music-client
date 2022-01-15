import { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import axios from "axios";

export default function ThreeDots({ modifyAlertMessage, modifyShowAlert, modifyModifyLoading, playlists, modifyPlaylists, path, link, playlistid, playlistName, playlistSongCount, username, userid }) {
    const [classOption, setClassOption] = useState("option-songs-btn");
    const [showModalDeletePlaylist, setShowModalDeletePlaylist] = useState(false);

    const toogleThreeDot = (e) => { if (e.target.id !== "stopPropagation") return; (classOption === "option-songs-btn") ? setClassOption("option-songs-btn show-option-songs") : setClassOption("option-songs-btn") };

    const copyToClipboard = (link) => {
        const tempInput = document.createElement('input')
        tempInput.value = link;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        toogleThreeDot({ target: { id: "stopPropagation" } }); //just toogle  
    }

    const handleDeletePlaylist = (playlistid) => {
        if (playlistid == userid) {
            modifyAlertMessage("Cannot delete the Default Playlist")
            modifyShowAlert(true);
            return;
        }
        modifyModifyLoading(true);
        const url = `${path}/${username}/playlists/${playlistid}`;
        axios.delete(url)
        .then(() => {
            const newObj = playlists.filter((playlist) => (playlist.playlistid !== playlistid));
            modifyPlaylists(newObj);
        })
        .catch((err) => console.log(err))
        .finally(() => modifyModifyLoading(false));
    }

    return (
        <> 
            <i id="stopPropagation" className="fas fa-ellipsis-h three-dot-user-profile" onClick={(e) => { toogleThreeDot(e); }}>
                <div className={classOption}>
                    <button onClick={() => copyToClipboard(link)}>Copy Link <i className="fas fa-link"></i></button>
                    <button onClick={() => setShowModalDeletePlaylist(true)}>Delete <i className="fas fa-trash"></i></button>
                </div>
            </i>
            <Modal className="custom-modal-01" show={showModalDeletePlaylist} onHide={() => {setShowModalDeletePlaylist(false);}}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this playlist ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="playlist-overview">
                        <div className="playlist-song-count-overview">
                            {playlistSongCount}
                        </div>
                        <div className="playlist-name-overview">
                            {playlistName}<br/>
                            @{username}
                        </div> 
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="custom-close-btn" variant="secondary" onClick={() => {setShowModalDeletePlaylist(false);}}>
                        Close
                    </Button>
                    <Button className="custom-download-btn" variant="primary" onClick={() => {handleDeletePlaylist(playlistid);}}>
                        Delete 
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}