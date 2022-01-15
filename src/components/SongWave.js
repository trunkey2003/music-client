import { memo } from 'react';

export default memo(function SongWave(props) {
    let classes;
    if (props.isPlaying) {
        classes = "song-wave song-wave-active";
      } else {
        classes = "song-wave";
      }

    return (
        <div className={classes}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
})
