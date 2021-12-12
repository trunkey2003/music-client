import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import SignUpModal from './SignUpModal';

export default function LoginModal(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalSignUp, setModalSignUp] = useState(false);

    async function login(url = '', data = {}) {
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

    const handleSubmit = async (e) => {
        const url = "https://api-trunkeymusicplayer.herokuapp.com/api/user/login";
        e.preventDefault();
        const submitData = {};
        submitData.username = username;
        submitData.password = password;
        if (!username || !password) return;
        setLoading(true);
        await login(url, submitData)
            .then(data => {
                setLoading(false);
                return data;
            })
            .then(data => {
                window.location = `http://localhost:3000/user/${data.username}`;
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => { setLoading(false); })
    }

    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="custom-modal-01 custom-modal-login"
            >
                <Modal.Body>
                    <h4 className="text-center text-info pb-3 custom-header-login on-hover">Sign in</h4>
                    {(props.closeAble) ? <button type="button" className="custom-btn-close-modal" onClick={props.onHide} aria-label="Close"><i className="fas fa-times"></i></button> : <></>}
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
                            <Form.Check type="checkbox" label="Auto login" />
                        </Form.Group>
                        <Button className="custom-login-button" variant="primary" type="submit">
                            Login {(loading) ? <Spinner animation="border" variant="info" size="sm"></Spinner> : <></>}
                        </Button>
                    </Form>
                    <div className="mt-4">
                        <div className="text-center text-info mb-3 on-hover">or use a social network</div>
                        <div className="d-flex justify-content-center social-buttons">
                            <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Twitter">
                                <i className="fab fa-twitter"></i>
                            </button>
                            <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Facebook">
                                <i className="fab fa-facebook"></i>
                            </button>
                            <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Linkedin">
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
                    <div className="text-center"><div className="on-hover">Not a member yet? </div> <a onClick={() => {props.onHide(); setModalSignUp(true)}} className="to-sign-up text-info">Sign Up</a></div>
                </Modal.Footer>
            </Modal>
            <SignUpModal show={modalSignUp} onHide={() => setModalSignUp(false)} signIn={() => {props.signIn()}} closeAble={true}></SignUpModal>
        </>
    );
}
