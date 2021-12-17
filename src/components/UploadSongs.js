import Form from 'react-bootstrap/Form'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default function UploadSongs(props) {
    const [song, setSong] = useState();
    const [singer, setSinger] = useState();
    const [image, setImage] = useState();
    const [path, setPath] = useState();

    const handleUploadSongsSubmit = (e) => {
        const username = props.userDetail.username;
        const userid = props.userDetail.userid;
        const url = `http://localhost:5000/api/user/${username}/songs`;
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