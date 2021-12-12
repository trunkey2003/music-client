import LoginModal from "./LoginModal";
import { useState } from "react";
import HomeUser from "./HomeUser";

export default function Login() {
    const [modalShow, setModalShow] = useState(true);
    return(
    <div className="login-page">
        <LoginModal show={modalShow}></LoginModal>
    </div>
    )
}