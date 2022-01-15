import { useState } from 'react'
import LoginModal from './LoginModal';
import UserModal from './UserModal';


export default function UserIcon(props){
    const [modalLoginShow, setModalLoginShow] = useState(false);
    const [modalUserShow, setModalUserShow] = useState(false);

    return (
        <div>
            <img onClick={() => {if(props.validated === undefined) setModalLoginShow(true); else setModalUserShow(true)}} className={(props.className)? props.className : "user-icon"} src={props.userIcon} alt="user-icon"/>
            <LoginModal show={modalLoginShow} onHide={() => setModalLoginShow(false)} signin={() => {setModalLoginShow(true)}} closeable="true"/>
            <UserModal userDetail={props.userDetail} userIcon={props.userIcon} show={modalUserShow} onHide={() => setModalUserShow(false)}></UserModal>
        </div>
    )
}