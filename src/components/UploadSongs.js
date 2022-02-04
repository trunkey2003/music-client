import Form from 'react-bootstrap/Form'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Alert from "react-bootstrap/Alert";

export default function UploadSongs(props) {
    const [song, setSong] = useState();
    const [singer, setSinger] = useState();
    const [image, setImage] = useState();
    const [path, setPath] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleUploadSongsSubmit = (e) => {
        e.preventDefault();
        const username = props.userDetail.username;
        const userid = props.userDetail.userid;
        //Only me is admin 
        if (userid != process.env.REACT_APP_ADMIN_USERID) {
            setShowAlert(true);
            setAlertMessage("Only Admin can take this action")
            return;
        } else {
            setShowAlert(true);
            setAlertMessage("This service isn't available right now")
            return;
        }
        //this URL is outdated
        const url = `https://api-trunkeymusicplayer.herokuapp.com/api/user/${username}/songs`;
        e.preventDefault();
        let newSong = {
            name: song,
            singer,
            image,
            path,
            username,
            userid,
            songid: uuidv4(),
        }
        axios.post(url, newSong).then(() => props.handleAddSong(newSong));
    }
    return (
        <div className="upload-songs-form">
            <Alert show={showAlert} className="alert-error-box" variant="danger">{alertMessage}<i className="fas fa-times" onClick={() => { setShowAlert(false) }}></i></Alert>
            <Form onSubmit={(e) => {handleUploadSongsSubmit(e)}}>
                <Form.Group className="mb-3">
                    <Form.Control onChange={(e) => setSong(e.target.value)} type="text" placeholder="Song Name" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control onChange={(e) => setSinger(e.target.value)} type="text" placeholder="Singer" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control onChange={(e) => setPath(e.target.value)} type="text" placeholder="Path API" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control onChange={(e) => setImage(e.target.value)} type="text" placeholder="Song Thumb API" />
                </Form.Group>
                
                <button type="submit">
                    Submit
                </button>
            </Form>
        </div>
    )
}