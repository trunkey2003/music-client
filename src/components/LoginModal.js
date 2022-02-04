import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import SignUpModal from './SignUpModal';
import Alert from "react-bootstrap/Alert";

const axios = require('axios');

export default function LoginModal(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalSignUp, setModalSignUp] = useState(false);
    const [alert, setAlert] = useState(false);


    const handleSubmit = async (e) => {
        try{
        // eslint-disable-next-line
        const url = `${process.env.REACT_APP_API_ENDPOINT}/user/login`;
         // eslint-disable-next-line
        const urldev = "http://localhost:5000/api/user/login";
        e.preventDefault();
        const submitData = {};
        submitData.username = username;
        submitData.password = password;
        if (!username || !password) return;
        setLoading(true);
        const result = await axios.post(url, submitData, { mode: 'cors', credentials: 'include', withCredentials: true });
        if (result.status === 200 && result.data.username) {
            window.location = `/user/${result.data.username}`;
        }
        setLoading(false);
    }   catch (error) {
            setLoading(false);
            if (error.toString().includes("403") || error.toString().includes("409")) setAlert("Wrong username or password");
        }
    }

    const popUpAlert = () => {
        setAlert("This service isn't available right now")
    }

    return (
        <>
            <Modal
                show={props.show} onHide={props.onHide}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="custom-modal-login"
            >
                <Modal.Body>
                    <h4 className="text-center text-info pb-3 custom-header-login on-hover">Sign in</h4>
                    {alert && <div className="alert-box">
                        {alert} <i className="fas fa-exclamation-circle"></i>
                    <button onClick={() => {setAlert(false)}}><i className="fas fa-times"></i></button>
                    </div>}
                    {(props.closeable) ? <button type="button" className="custom-btn-close-modal" onClick={props.onHide} aria-label="Close"><i className="fas fa-times"></i></button> : <></>}
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User name</Form.Label>
                            <Form.Control required onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Keep Me Logged In" />
                        </Form.Group>
                        <Button className="custom-login-button" variant="primary" type="submit">
                            Login {(loading) ? <Spinner animation="border" variant="info" size="sm"></Spinner> : <></>}
                        </Button>
                    </Form>
                    <div className="mt-4">
                        <div className="text-center text-info mb-3 on-hover">or use a social network</div>
                        <div className="d-flex justify-content-center social-buttons">
                            <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Twitter" onClick={() => {popUpAlert()}}>
                                <i className="fab fa-twitter"></i>
                            </button>
                            <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Facebook" onClick={() => {popUpAlert()}}>
                                <i className="fab fa-facebook"></i>
                            </button>
                            <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Linkedin" onClick={() => {popUpAlert()}}>
                                <i className="fab fa-google"></i>
                            </button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <div className="text-center"><div className="on-hover">Not a member yet? </div><u onClick={() => { props.onHide(); setModalSignUp(true) }} className="to-sign-up text-info">Sign Up</u></div>
                </Modal.Footer>
            </Modal>
            <SignUpModal show={modalSignUp} onHide={() => { setModalSignUp(false) }} signin={() => { props.signin() }} closeable="true"></SignUpModal>
        </>
    );
}
