import { useState } from 'react'
import LoginModal from './LoginModal';


export default function UserIcon(props){
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <img onClick={() => {setModalShow(true)}} className={(props.className)? props.className : "user-icon"} src={props.userIcon} alt="user-icon"/>
            <LoginModal show={modalShow} onHide={() => setModalShow(false)} signin={() => {setModalShow(true)}} closeable="true"/>
        </div>
    )
}