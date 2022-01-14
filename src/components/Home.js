import '../css/App.css';
import Dashboard from './Dashboard';
import Playlist from './Playlist';
import { useState, useRef, useEffect } from 'react';
import Loading from './Loading';


function Home({path}) {
  const songVn = useRef();
  const songUs = useRef();
  const [songRegion, setSongRegion] = useState("usuk");
  const [songs, setSongs] = useState([]);
  const [songAdded, setSongAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef();
  const [songIndex, setSongIndex] = useState(0);
  const [src, setSrc] = useState("");
  const [cdThumb, setCdThumb] = useState("");
  const [song, setSong] = useState("");
  const [singer, setSinger] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [percentage, setPercentage] = useState(0);
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
        
        await fetch(`${path}/admin/us`)
          .then((response) => response.json())
          .then((data) => {
            songUs.current = data;
          })
          .catch((next) => console.log(next));

        await fetch(`${path}/admin/vn`)
          .then((response) => response.json())
          .then((data) => {
            songVn.current = data;
          })
          .catch((next) => console.log(next))
          .finally(() => { setLoading(false); setFirstLoading(false); })
        const songs = (songRegion === "usuk") ? songUs.current : songVn.current;
        if (!songs) return;
        setSongs(songs);
        setCdThumb(songs[0].image);
        setSong(songs[0].name);
        setSinger(songs[0].singer);
        setSrc(songs[0].path);
        setSongIndex(0);
        setTimeManually(0);
        setPercentage(0);
      } else {
        let songs;
        if (songs && songRegion === "usuk") songUs.current = songs;
        if (songs && songRegion === "vn") songVn.current = songs;
        songs = (songRegion === "usuk") ? songUs.current : songVn.current;
        if (!songs) return;
        setSongs(songs);
        setCdThumb(songs[0].image);
        setSong(songs[0].name);
        setSinger(songs[0].singer);
        setSrc(songs[0].path);
      }
    }

    func();
    // eslint-disable-next-line
  }, [songRegion, firstLoading])

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
      if (songs[index]){
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
    setSongAdded(true);
  }

  useEffect(() =>{
    if (songAdded){
      modifySongPlay(songs.length-1, true);
      setSongAdded(false);
    }
    // eslint-disable-next-line
  }, [handleAddSong, songAdded])

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
    <div className={`${classes} ${classTheme}`}>
      {(loading === true) ? <Loading /> : (<>
        <Dashboard modifyCurruntTime={setTimeManually} songState={songState} volumeIcon={volumeIcon} volumeBackground={volumeBackground} ModifySongVolume={ModifySongVolume} modifyClassTheme={modifyClassTheme} modifySongRegion={modifySongRegion} modifySongState={modifySongState} songCount={songs.length} songDetail={songDetail} modifyIsPlaying={modifyIsPlaying} modifySongPlay={modifySongPlay} percentage={percentage} modifyPercentage={modifyPercentage} songs={songs} />
        <audio ref={audioRef} id="audio" onTimeUpdate={(e) => updateTime(e)} src={src} onLoadedData={(e) => { setDuration(e.currentTarget.duration); }}></audio>
        <Playlist classTheme={classTheme} songRegion={songRegion} handleSoftDelte={handleSoftDelte} songIndex={songIndex} src={src} modifySongPlay={modifySongPlay} modifyIsPlaying={modifyIsPlaying} songs={songs} handleAddSong={handleAddSong}/>
      </>)}
    </div>
  );
}

export default Home;
