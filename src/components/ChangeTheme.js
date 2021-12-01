import React from 'react'

export default function ChangeTheme(props) {
    function handleChangeThemeBtnOnClick() {
        props.modifyClassTheme();
    }

    return (
        <i class="fas fa-paint-roller change-theme-btn" onClick={() => {handleChangeThemeBtnOnClick()}}></i>
    )
}