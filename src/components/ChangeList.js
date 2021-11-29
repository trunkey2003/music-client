import React from 'react'

export default function ChangeList(props) {
    const handleOnClickChangeListBtn = (e) =>{
        if (e.target.src == "https://trunkey2003.github.io/img/us.png"){
            e.target.src = "https://trunkey2003.github.io/img/vn.png";
            e.target.alt = "vn";
            props.modifySongRegion(e.target.alt);
        } else {
            e.target.src = "https://trunkey2003.github.io/img/us.png";
            e.target.alt = "usuk";
            props.modifySongRegion(e.target.alt);
        }
    }
    return (
        <div className="change-list">
                <img id="change-list-btn" src="https://trunkey2003.github.io/img/us.png" alt="us" onClick={(e) => {handleOnClickChangeListBtn(e)}} />
        </div>
    )
}