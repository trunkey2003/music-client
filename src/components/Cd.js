export default function Cd(props) { 
    let classes;

    if (props.isPlaying)  classes = "cd-thumb spin"; else{
        classes = "cd-thumb"
    }

    return (
        <div className="cd">
            <div className={classes} style={{ backgroundImage: `url('${props.image}')` }}>
            </div>
        </div>
    )
}