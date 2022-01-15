import '../css/App.css';
import Dashboard from './Dashboard';
import Playlist from './Playlist';
import { useState, useRef, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
const axios = require('axios');

export const PlaylistidContext = createContext();

function HomeUser({ path }) {
  var { username, playlistid } = useParams();
  const validated = useRef();
  const userDetail = useRef();
  const [userIcon, setUserIcon] = useState("https://trunkey2003.github.io/general-img/default-profile-pic.jpg");
  const [songRegion, setSongRegion] = useState("usuk");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef();
  const [songIndex, setSongIndex] = useState(0);
  const [src, setSrc] = useState("");
  const [cdThumb, setCdThumb] = useState("https://i1.sndcdn.com/avatars-000606604806-j6ghpm-t500x500.jpg");
  const [song, setSong] = useState("Song");
  const [singer, setSinger] = useState("Singer");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [percentage, setPercentage] = useState();
  const [activeRandom, setActiveRandom] = useState(false);
  const [activeRepeat, setActiveRepeat] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [classTheme, setClassTheme] = useState("defualt-theme");
  const [volume, setVolume] = useState(1);
  const [volumeBackground, setVolumeBackground] = useState("volume-background");
  const [volumeIcon, setVolumeIcon] = useState("fas fa-volume-up");


  const songDetail = {
    src,
    cdThumb,
    song,
    singer,
    isPlaying,
    songIndex,
    duration,
    classTheme,
    songRegion,
  }

  useEffect(() => {
    const func = async () => {
      if (firstLoading) {
        setLoading(true);
        axios.get(`${path}/${username}`, {mode: 'cors', withCredentials: true})
        .then((result) => {
          if (result.data.userid) validated.current = true;
          if (result.data.username != result.data.onAccess && result.data.onAccess) validated.current = false;
          userDetail.current = result.data;
          setUserIcon(userDetail.current.avatar);
          const additionalPath = (playlistid)? `/${playlistid}` : '';
          axios.get(`${path}/${username}${additionalPath}/songs`, {mode: 'cors', withCredentials: true})
          .then((songs) => {setSongs(songs.data);})
          .finally(() =>{
            setLoading(false);
            setFirstLoading(false);
            console.log("Validated : " + validated.current);
          })
        })
        .catch((err) => {
          console.log(err);
          // window.location.href = "/user/login";
        })
      }
    }

    func();
    // eslint-disable-next-line
  }, [firstLoading])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    // eslint-disable-next-line
  }, [volume, audioRef.current])


  let classes;

  const play = () => {
    const audio = audioRef.current;
    audio.play();
  }

  const pause = () => {
    const audio = audioRef.current;
    audio.pause();
  }

  if (isPlaying && audioRef.current) {
    classes = "player playing";
    play();
  } else if (audioRef.current) {
    classes = "player";
    pause();
  } else {
    classes = "player";
  }

  const modifySrc = function (url) {
    setSrc(url);
  }

  const modifyActiveRandom = function (param) {
    setActiveRandom(param);
  }

  const modifyActiveRepeat = function (param) {
    setActiveRepeat(param);
  }

  const modifyCdThumb = function (url) {
    setCdThumb(url);
  }

  const modifySong = function (url) {
    setSong(url);
  }

  const modifySinger = function (url) {
    setSinger(url);
  }

  const modifyIsPlaying = function (isPlaying) {
    setIsPlaying(!isPlaying);
  }

  const modifyPercentage = function (percentage) {
    setPercentage(percentage);
  }

  const modifySongRegion = function (region) {
    setSongIndex(0);
    setSongRegion(region);
  }

  const modifySongPlay = function (index, isForced) {
    if (songs) {
      if (!isForced) {
        if (activeRandom) {
          index = Math.round(Math.random() * songs.length);
        }
        if (activeRepeat) {
          index = songIndex;
        }
      }
      if (songs[index]) {
        setSongIndex(index);
        setTimeManually(0);
        setPercentage(0);
        modifySong(songs[index].name);
        modifySinger(songs[index].singer);
        modifySrc(songs[index].path);
        modifyCdThumb(songs[index].image);
      }
    }
  }

  const modifySongState = {
    modifyActiveRandom,
    modifyActiveRepeat,
  }

  const songState = {
    activeRandom,
    activeRepeat
  }

  const modifyClassTheme = () => {
    (classTheme === "defualt-theme") ? setClassTheme("custom-theme-01") : ((classTheme === "custom-theme-01") ? setClassTheme("custom-theme-02") : ((classTheme === "custom-theme-02") ? setClassTheme("custom-theme-03") : setClassTheme("defualt-theme")));
  }

  const updateTime = (e) => {
    const _percentage = e.target.currentTime / duration * 100;
    setPercentage(_percentage);
    if (percentage === 100) {
      if (songIndex === songs.length - 1)
        modifySongPlay(0); else modifySongPlay(songIndex + 1);
    }
  }

  const setTimeManually = (e) => {
    audioRef.current.currentTime = e;
  }

  const handleSoftDelte = (index) => {
    let newSongs = [...songs];
    newSongs.splice(index, 1);
    setSongs(newSongs);
  }

  const handleAddSong = (song) => {
    let newSongs = [...songs];
    newSongs.push(song);
    setSongs(newSongs);
  }

  const ModifySongVolume = (e) => {
    switch (volume) {
      case 0:
        setVolume(0.4);
        setVolumeBackground("volume-background-02");
        setVolumeIcon("fas fa-volume-down");
        break;
      case 0.4:
        setVolume(0.65);
        setVolumeBackground("volume-background-03");
        setVolumeIcon("fas fa-volume-down");
        break;
      case 0.65:
        setVolume(0.8);
        setVolumeBackground("volume-background-04");
        setVolumeIcon("fas fa-volume-down");
        break;
      case 0.8:
        setVolume(1);
        setVolumeBackground("volume-background");
        setVolumeIcon("fas fa-volume-up");
        break;
      case 1:
        setVolume(0);
        setVolumeBackground("volume-background-01");
        setVolumeIcon("fas fa-volume-mute");
        break;
      default: alert("Sound Volume error");
    }
  }

  return (
    <PlaylistidContext.Provider value={playlistid}>
    <div className={`${classes} ${classTheme}`}>
      {(loading === true) ? <Loading /> : (<>
        <Dashboard userDetail={userDetail.current} userIcon={userIcon} validated={validated.current} username={username} songState={songState} volumeIcon={volumeIcon} volumeBackground={volumeBackground} ModifySongVolume={ModifySongVolume} modifyClassTheme={modifyClassTheme} modifySongRegion={modifySongRegion} modifySongState={modifySongState} songCount={songs.length} songDetail={songDetail} modifyIsPlaying={modifyIsPlaying} modifySongPlay={modifySongPlay} percentage={percentage} modifyPercentage={modifyPercentage} modifyCurruntTime={setTimeManually} songs={songs} />
        <audio ref={audioRef} id="audio" onTimeUpdate={(e) => updateTime(e)} src={src} onLoadedData={(e) => { setDuration(e.currentTarget.duration); }}></audio>
        <Playlist userDetail={userDetail.current} validated={validated.current} classTheme={classTheme} songRegion={songRegion} handleSoftDelte={handleSoftDelte} songIndex={songIndex} src={src} modifySongPlay={modifySongPlay} modifyIsPlaying={modifyIsPlaying} songs={songs} handleAddSong={handleAddSong} />
      </>)}
    </div>
    </PlaylistidContext.Provider>
  );
}

export default HomeUser;
