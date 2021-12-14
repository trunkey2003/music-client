import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";

export default function SignUpModal(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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
    const url = "https://api-trunkeymusicplayer.herokuapp.com/api/user/signup";
    e.preventDefault();
    const newUser = {};
    newUser.username = username;
    newUser.password = password;
    newUser.Email = email;
    console.log(newUser);
    setLoading(true);
    await signUp(url, newUser)
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
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal-01 custom-modal-login"
    >
      <Modal.Body>
        <h4 className="text-center text-info pb-3 custom-header-login on-hover">
          Sign Up
        </h4>
        {props.closeAble ? (
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
            <Form.Label>User name</Form.Label>
            <Form.Control
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter your username"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSignUpEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email@email.com"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSignUpPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Confirm assword"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Simple password" />
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
            <button
              type="button"
              className="btn"
              data-toggle="tooltip"
              data-placement="top"
              title="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </button>
            <button
              type="button"
              className="btn"
              data-toggle="tooltip"
              data-placement="top"
              title="Facebook"
            >
              <i className="fab fa-facebook"></i>
            </button>
            <button
              type="button"
              className="btn"
              data-toggle="tooltip"
              data-placement="top"
              title="Linkedin"
            >
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
