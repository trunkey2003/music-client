import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { useState, useCallback } from "react";
import { debounce } from "debounce";
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

export default function SignUpModal(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingUserName, setLoadingUserName] = useState(true);
  const [validUserName, setValidUserName] = useState();
  const [validConfirmPassword, setValidConfirmPassword] = useState();
  const [checkAutoSignIn, setCheckAutoSignIn] = useState(false);
  const [alert, setAlert] = useState(false);

  async function signUp(url = '', data = {}) {
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
    e.preventDefault();

    const url = `${process.env.REACT_APP_API_ENDPOINT}/user/signup`;
    const newUser = {};
    const userid = uuidv4();
    newUser.username = username;
    newUser.password = password;
    newUser.email = email;
    newUser.userid = userid;

    setLoading(true);
    await signUp(url, newUser)
      .then(async data => {
        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/user/signup/${userid}`);
        return data;
      })
      .then(data => {
        if (checkAutoSignIn && data) {
          const submitData = {};
          submitData.username = username;
          submitData.password = password;
          const url = `${process.env.REACT_APP_API_ENDPOINT}/user/login`;
          axios.post(url, submitData, { mode: 'cors', credentials: 'include', withCredentials: true }).then((result) => {
            if (result.status === 200 && result.data.username) window.location = `/user/${result.data.username}`;
            setLoading(false);
          })
        } else window.location = `/user/login`;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => { setLoading(false); })
  }

  const validateUserName = (username) => {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
  }

  const fetchUserAndCheck = (username) => {
    if (!validateUserName(username)) {
      setLoadingUserName(false);
      setValidUserName(false);
      return;
    }
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/user/signup/checkusername`, { username: username })
      .then((res) => { setLoadingUserName(false); setValidUserName(res.data) });
  }

  // eslint-disable-next-line
  const debounceCheck = useCallback(debounce((value) => fetchUserAndCheck(value), 1000), []);

  const handleUserNameOnChanged = (e) => {
    setUsername(e.target.value);
    setLoadingUserName(true);
    if (e.target.value) debounceCheck(e.target.value);
  }

  const handlePasswordOnchange = (value) => {
    setPassword(value);

    if (value.length === 0) {
      setValidConfirmPassword(undefined);
      return;
    }

    if (value !== confirmPassword) setValidConfirmPassword(false); else setValidConfirmPassword(true);
  }

  const handleConfirmPasswordOnchange = (value) => {
    setConfirmPassword(value);

    if (value.length === 0) {
      setValidConfirmPassword(undefined);
      return;
    }

    setConfirmPassword(value);
    if (value !== password) setValidConfirmPassword(false); else setValidConfirmPassword(true);
  }

  const popUpAlert = () => {
    setAlert("This service isn't available right now")
  }

  return (
    <Modal
      show={props.show} onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal-login"
    >
      <Modal.Body>
        <h4 className="text-center text-info pb-3 custom-header-login on-hover">
          Sign Up
        </h4>
        {alert && <div className="alert-box">
          {alert} <i className="fas fa-exclamation-circle"></i>
          <button onClick={() => { setAlert(false) }}><i className="fas fa-times"></i></button>
        </div>}
        {props.closeable ? (
          <button
            type="button"
            className="custom-btn-close-modal"
            onClick={props.onHide}
            aria-label="Close"
          >
            <i className="fas fa-times"></i>
          </button>
        ) : (
          <></>
        )}
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formSignUpUserName">
            <Form.Label>User name {(username === "") ? <></> : ((loadingUserName) ? <Spinner animation="border" variant="info" size="sm"></Spinner> : ((validUserName) ? <BsFillCheckCircleFill className="text-info" /> : <BsFillXCircleFill className="text-danger" />))}</Form.Label>
            <Form.Control
              onChange={(e) => handleUserNameOnChanged(e)}
              type="text"
              placeholder="Enter your username"
              minlength="3"
              maxlength="16"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSignUpEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email@email.com"
              maxlength="40"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSignUpPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => handlePasswordOnchange(e.target.value)}
              type="password"
              placeholder="Password"
              minlength="3"
              maxlength="20"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password {(validConfirmPassword === undefined) ? "" : (validConfirmPassword) ? <BsFillCheckCircleFill className="text-info" /> : <BsFillXCircleFill className="text-danger" />}</Form.Label>
            <Form.Control
              onChange={(e) => handleConfirmPasswordOnchange(e.target.value)}
              type="password"
              placeholder="Confirm assword"
              minlength="3"
              maxlength="20"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={(e) => { setCheckAutoSignIn(e.target.checked); }} type="checkbox" label="Auto Sign In" />
          </Form.Group>
          <Button
            className="custom-login-button"
            variant="primary"
            type="submit"
          >
            Sign Up
            {loading ? (
              <Spinner animation="border" variant="info" size="sm"></Spinner>
            ) : (
              <></>
            )}
          </Button>
        </Form>
        <div className="mt-4">
          <div className="text-center text-info mb-3 on-hover">
            or use a social network
          </div>
          <div className="d-flex justify-content-center social-buttons">
            <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Twitter" onClick={() => { popUpAlert() }}>
              <i className="fab fa-twitter"></i>
            </button>
            <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Facebook" onClick={() => { popUpAlert() }}>
              <i className="fab fa-facebook"></i>
            </button>
            <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Linkedin" onClick={() => { popUpAlert() }}>
              <i className="fab fa-google"></i>
            </button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="text-center">
          <div className="on-hover">Already have an account ?</div>{" "}
          <u onClick={() => { props.onHide(); props.signin() }} className="to-sign-up text-info">Sign In</u>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
