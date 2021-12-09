import { useEffect, useState } from "react";

export default function ChangeList(props) {
    const [src, setSrc] = useState("");

    useEffect(() =>{
        if (props.songRegion === "usuk") setSrc("https://trunkey2003.github.io/img/us.png"); else setSrc("https://trunkey2003.github.io/img/vn.png");
    }, [props.songRegion])

    const handleOnClickChangeListBtn = () =>{
        if (props.songRegion === "usuk") {
            props.modifySongRegion("vn"); 
        } else{
            props.modifySongRegion("usuk");
        }
    }

    return (
        <div>
            <img id="change-list-btn" src={src} alt={props.songRegion} onClick={() => {handleOnClickChangeListBtn()}} />
        </div>
    )
}