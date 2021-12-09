export default function ChangeTheme(props) {
    function handleChangeThemeBtnOnClick() {
        props.modifyClassTheme();
    }

    return (
        <i className="fas fa-paint-roller change-theme-btn" onClick={() => {handleChangeThemeBtnOnClick()}}></i>
    )
}