import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'



export default function Song(props) {
    let classActive = "song";
    const [classOption, setClassOption] = useState("option-songs-btn");
    const [showDownload, setShowDownload] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleCloseDownload = () => setShowDownload(false);
    const handleShowDownload = () => setShowDownload(true);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const modifySongPlay = function (index) {
        props.modifySongPlay(index, true);
        props.modifyIsPlaying(false);
    }

    if (props.songIndex === props.index) {
        classActive = "song active"
    }

    const toogleThreeDot = () => (classOption === "option-songs-btn") ? setClassOption("option-songs-btn show-option-songs") : setClassOption("option-songs-btn");

    return (
        <div className={classActive} id={`song-${props.index}`} onClick={() => { modifySongPlay(props.index) }}>
            <div className="thumb" style={{ backgroundImage: `url('${props.thumb}')` }}>
            </div>

            <div className="body">
                <h3 className="title">{props.title}</h3>
                <p className="author">{props.singer}</p>
            </div>

            <div className="option" onClick={(event) => { event.stopPropagation() }}>
                <i className="fas fa-ellipsis-h three-dot" onClick={() => {toogleThreeDot()}}></i>
                <div className={classOption}>
                    <button onClick={handleShowDownload}>Download <i className="fas fa-download"></i></button>
                    <button onClick={handleShowDelete} >Soft delete <i className="fas fa-trash"></i></button>
                </div>

                <Modal className="custom-modal-01" show={showDownload} onHide={handleCloseDownload}>
                    <Modal.Header closeButton>
                        <Modal.Title>Download {props.title}</Modal.Title>
                        <button type="button" class="custom-btn-close-modal" onClick={handleCloseDownload} aria-label="Close"><i className="fas fa-times"></i></button>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to download this song ?
                        <div class="thumbnail">
                            <img alt={props.title} src={props.thumb} className="thumbnail-img"></img>
                            <div className="thumbnail-content">
                            <h5><b>Song</b> : {props.title}</h5>
                            <h5><b>by</b> {props.singer}</h5>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="custom-close-btn" onClick={handleCloseDownload}>
                            Close
                        </Button>
                        <Button className="custom-download-btn" href={props.src} download>
                            Download <i className="fas fa-download"></i>
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal className="custom-modal-01 darkTheme" show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove {props.title} </Modal.Title>
                        <button type="button" class="custom-btn-close-modal" aria-label="Close" onClick={handleCloseDelete}><i className="fas fa-times"></i></button>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to remove this song from your list ? <br/> <span class="custom-text-note">Note that this song won't be deleted permanently from my database :)</span>
                        <div class="thumbnail">
                            <img alt={props.title} src={props.thumb} className="thumbnail-img"></img>
                            <div className="thumbnail-content">
                            <h5><b>Song</b> : {props.title}</h5>
                            <h5><b>by</b> {props.singer}</h5>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="custom-close-btn" onClick={handleCloseDelete}>
                            Close
                        </Button>
                        <Button variant="danger" className="custom-delete-btn" onClick={() => {props.handleSoftDelte(props.index); toogleThreeDot(); handleCloseDelete();}}>
                            Delete <i className="fas fa-trash"></i>
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}