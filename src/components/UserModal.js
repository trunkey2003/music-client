import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function UserModal(props) {
    const signOut = () => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/signout`, {mode: 'cors', withCredentials: true})
        .then(() => window.location = window.location.origin)
        .catch((err) => console.log(err))
    }
    return (
        <Modal show={props.show} size="sm" onHide={props.onHide} className="custom-modal-user">
            <Modal.Body>
                <div className="modal-user-box">
                    <img className="on-hover" alt="user-avatar" src={props.userIcon}></img>
                    {(props.userDetail?.onAccess !== props.userDetail?.username)? <Button onClick={() => {window.location = `/user/profile/${props.userDetail.onAccess}`}}>Home <i className="fas fa-home"></i></Button> : <></>}
                    <Button onClick={() => {window.location = `/user/profile/${props.userDetail.username}`}}>Profile <i className="fas fa-user-circle"></i></Button>
                    {(props.userDetail?.onAccess === props.userDetail?.username)? <Button onClick={() => {signOut()}} >Log Out <i className="fas fa-sign-out-alt"></i></Button> : <></>}
                </div>
            </Modal.Body>
        </Modal>
    )
}