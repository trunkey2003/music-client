import Spinner from "react-bootstrap/Spinner";

export default function UserModifyLoading() {
    return (
        <div className="user-modify-loading">
            Saving Your Changes <Spinner animation="border" />
        </div>
    )
}