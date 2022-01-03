import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function UserProfile({ path }) {
  var { username } = useParams();
  const validated = useRef();

  const [userDetail, setUserDetail] = useState();
  const [onEditUserFullName, setOnEditUserFullName] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userIcon, setUserIcon] = useState("");
  const [fullName, setFullName] = useState();
  const [showFullNameModal, setShowFullNameModal] = useState(false);

  useEffect(() => {
    const func = async () => {
      if (firstLoading) {
        setLoading(true);
        const authorization = await axios
          .get(`${path}/${username}`, { mode: "cors", withCredentials: true })
          .then((result) => {
            validated.current = username;
            setUserDetail(result.data);
            setUserIcon(result.data.avatar);
            setFullName(result.data.fullName);
            return validated.current;
          })
          .catch(() => {
            validated.current = "anonymous";
            return validated.current;
          })
          .finally(() => {
            setFirstLoading(false);
            setLoading(false);
          });
      }
    };

    func();
    console.log(userDetail);
  }, [firstLoading]);

  const handleModifyFullName = () => {
    if (userDetail.fullName !== fullName) {
      setShowFullNameModal(true);
    } else {
      setOnEditUserFullName(!onEditUserFullName);
    }
  }

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div className="user-profile">
          <div className="user-profile-container">
            <div className="user-profile-info">
              <img src={userIcon}></img>
              <i className="fas fa-image"></i>
              {(onEditUserFullName) ? <div className="user-profile-container-user-name-input"><input type="text" value={fullName} onChange={(e) => { setFullName(e.target.value) }} onFocus={() => { }} /> <i className="fas fa-check" onClick={() => handleModifyFullName()}></i></div> : <div className="user-full-name">
                {fullName} <i className="fas fa-pencil-alt" onClick={() => { setOnEditUserFullName(!onEditUserFullName) }}></i>
              </div>}
              <h5>
                @{userDetail.username} <i className="fas fa-pencil-alt"></i>
              </h5>
              <div className="user-profile-follow-container">
                <div>
                  Songs <div>100</div>
                </div>
                <div>
                  Followers <div>0</div>
                </div>
                <div>
                  Following <div>0</div>
                </div>
              </div>
            </div>
            <div className="user-profile-overview"></div>
          </div>

          <Modal className="custom-modal-01 custom-modal-fullname" show={showFullNameModal} onHide={() => {setShowFullNameModal(false)}}>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button className="custom-close-btn" variant="secondary" onClick={() => {setShowFullNameModal(false)}}>
                Close
              </Button>
              <Button className="custom-close-btn" variant="primary" onClick={() => {setShowFullNameModal(false)}}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

        </div>
      )}
    </>
  );
}
