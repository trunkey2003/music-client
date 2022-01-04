import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

export default function UserProfile({ path }) {
  var { username } = useParams();
  const validated = useRef();

  const [userDetail, setUserDetail] = useState();
  const [songs, SetSongs] = useState();
  const [songsCurrunt, setSongCurrunt] = useState();

  const [onChangeUserFullName, setonChangeUserFullName] = useState(false);
  const [fullName, setFullName] = useState();
  const [showFullNameModal, setShowFullNameModal] = useState(false);

  const [onChangeUserName, setonChangeUserName] = useState(false);
  const [userName, setUserName] = useState();

  const [uploadedAvatar, setUploadedAvatar] = useState();
  const [showErrorAvatarUpload, setShowErrorAvatarUpload] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);

  const [firstLoading, setFirstLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userIcon, setUserIcon] = useState("");
  const [userIconPreview, setUserIconPreview] = useState("");
  const [modifyDataLoading, setModifyDataLoading] = useState(false);

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
            setUserIconPreview(result.data.avatar);
            setFullName(result.data.fullName);
            setUserName(result.data.username);
            axios.get(`${path}/${userName}/songs`, { mode: 'cors', withCredentials: true }).then((res) => { SetSongs(res.data); console.log(res.data);});
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
      setonChangeUserFullName(!onChangeUserFullName);
    }
  };

  const handleModifyUserName = () => {
    if (userDetail.fullName !== fullName) {
      // setShowFullNameModal(true);
    } else {
      setonChangeUserName(!onChangeUserName);
    }
  };

  const submitModifyFullName = () => {
    setShowFullNameModal(false);
    setModifyDataLoading(true);
    axios.put(`${path}/edit/fullname`, { fullName: fullName }).then(() => {
      setonChangeUserFullName(!onChangeUserFullName);
      userDetail.fullName = fullName;
      setModifyDataLoading(false);
    });
  };

  const handleUploadedAvatar = (e) => {
    if (e.target.files.length && !e.target.files[0].type.includes("image")) {
      e.target.value = null;
      setShowErrorAvatarUpload(true);
      setShowAvatarUpload(false);
      return;
    }

    setUploadedAvatar(e.target.files[0]);
    if (e.target.files.length) { setShowAvatarUpload(true); } else setShowAvatarUpload(false);
  }

  const handleSubmitAvatar = () => {
    const uploadData = new FormData();
    uploadData.append('file', uploadedAvatar);
    const src = URL.createObjectURL(uploadedAvatar);
    console.log(src);
    setUserIconPreview(src);
  }

  const handleSaveChangeAvatar = () => {
    setShowAvatarModal(false);
    if (uploadedAvatar) {
      const src = URL.createObjectURL(uploadedAvatar);
      setUserIcon(src);
    }
  }


  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div className="user-profile">
          {modifyDataLoading ? (
            <div className="user-modify-loading">
              {" "}
              Saving Your Changes <Spinner animation="border" />
            </div>
          ) : (
            <></>
          )}
          <div className="user-profile-container">
            <div className="user-profile-info">
              <img src={userIcon}></img>
              <i
                className="fas fa-image"
                onClick={() => {
                  setShowAvatarModal(true);
                }}
              ></i>
              {onChangeUserFullName ? (
                <div className="user-full-name-input">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                    onFocus={() => { }}
                  />{" "}
                  <i
                    className="fas fa-check"
                    onClick={() => handleModifyFullName()}
                  ></i>
                </div>
              ) : (
                <div className="user-full-name">
                  {fullName}{" "}
                  <i
                    className="fas fa-pencil-alt"
                    onClick={() => {
                      setonChangeUserFullName(!onChangeUserFullName);
                    }}
                  ></i>
                </div>
              )}
              {onChangeUserName ? (
                <div className="user-name-input">
                  <input
                    type="text"
                    value={"@" + userName}
                    onChange={(e) => {
                      var str = e.target.value;
                      str = str.replace("@", "");
                      setUserName(str);
                    }}
                    onFocus={() => { }}
                  />{" "}
                  <i
                    className="fas fa-check"
                    onClick={() => handleModifyUserName()}
                  ></i>
                </div>
              ) : (
                <h5>
                  @{userName}{" "}
                  <i
                    className="fas fa-pencil-alt"
                    onClick={() => {
                      setonChangeUserName(!onChangeUserFullName);
                    }}
                  ></i>
                </h5>
              )}

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

            <div className="user-profile-overview">
              <div className="overview-songs">
                <h5 className="overview-title" >Songs</h5>
                <div className="overview-user-songs-container">
                  {songs && songs.map((song) => {
                    return (<div className="overview-user-song">
                      <img src={song.image}></img>
                      <div className="song-name">{song.name}</div>
                      <div className="song-artists">{song.singer}</div>
                    </div>)
                  })}
                  {/* {
                    <div className="overview-user-song">
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <div className="song-name">Songs</div>
                      <div className="song-artists">Singer Name</div>
                    </div>
                    } */}
                </div>
              </div>

              <div className="overview-songs">
                <h5 className="overview-title" >Playlist</h5>
                <div className="overview-user-playlist-container">
                  <div className="overview-user-playlist">
                    <div className="overview-playlist-thumbnail">
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                    </div>
                    <div className="song-name">Playlist</div>
                    <div className="song-artists">Song Count</div>
                  </div>
                  <div className="overview-user-playlist">
                    <div className="overview-playlist-thumbnail">
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                    </div>
                    <div className="song-name">Playlist</div>
                    <div className="song-artists">Song Count</div>
                  </div>
                  <div className="overview-user-playlist">
                    <div className="overview-playlist-thumbnail">
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                    </div>
                    <div className="song-name">Playlist</div>
                    <div className="song-artists">Song Count</div>
                  </div>
                  <div className="overview-user-playlist">
                    <div className="overview-playlist-thumbnail">
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                    </div>
                    <div className="song-name">Playlistaa</div>
                    <div className="song-artists">Song Count</div>
                  </div>
                  <div className="overview-user-playlist">
                    <div className="overview-playlist-thumbnail">
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                      <img src="https://trunkey2003.github.io/img-us-uk/img-6.png"></img>
                    </div>
                    <div className="song-name">Songs</div>
                    <div className="song-artists">Song Count</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Modal Section */}
          {/* Full Name Modify Modal */}
          <Modal
            className="custom-modal-01 custom-modal-fullname"
            show={showFullNameModal}
            onHide={() => {
              setShowFullNameModal(false);
            }}
          >
            <Modal.Body>
              <Modal.Header>
                <h5>Are you sure you want to change your name ?</h5>
              </Modal.Header>
              <div className="user-preview">
                <img src={userDetail.avatar}></img>
                <div className="user-preview-detail">
                  <h5>{fullName}</h5>
                  <div className="text-secondary">@{userDetail.username}</div>
                </div>
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
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="custom-close-btn"
                variant="secondary"
                onClick={() => {
                  setShowFullNameModal(false);
                }}
              >
                Close
              </Button>
              <Button
                className="custom-close-btn"
                variant="primary"
                onClick={() => {
                  submitModifyFullName();
                }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Avatar Modify Modal */}
          <Modal
            className="custom-modal-01 custom-modal-avatar"
            show={showAvatarModal}
            onHide={() => {
              setShowAvatarModal(false);
            }}
          >
            <Modal.Header>Update Your Avatar</Modal.Header>
            <Modal.Body>
              {showErrorAvatarUpload && <div className="alert-box">
                Invalid image format! Format must be JPG, JPEG, PNG, or GIF <i className="fas fa-exclamation-circle"></i>
                <button onClick={() => { setShowErrorAvatarUpload(false) }}><i className="fas fa-times"></i></button>
              </div>}
              <img src={userIconPreview}></img>
              <Form.Group onChange={(e) => { handleUploadedAvatar(e) }} controlId="formFile" className="mb-3 avatar-upload">
                <Form.Control type="file" accept="image/*" />
                {(showAvatarUpload) ? <i className="fas fa-upload" onClick={() => { handleSubmitAvatar() }}></i> : <></>}
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button
                className="custom-close-btn"
                variant="secondary"
                onClick={() => {
                  setShowAvatarModal(false);
                }}
              >
                Close
              </Button>
              <Button
                className="custom-close-btn"
                variant="primary"
                onClick={() => {
                  handleSaveChangeAvatar();
                }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}
