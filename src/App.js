import './App.css';
import Dashboard from './components/Dashboard';
import Playlist from './components/Playlist';
import { useState, useRef, useEffect } from 'react';
import Loading from './components/Loading';


function App() {
  const songVn = useRef();
  const songUs = useRef();
  const [songRegion, setSongRegion] = useState("usuk");
  // const songs = (songRegion === "usuk")? songUs.current : songVn.current;
  const [songs, setSongs] = useState([]);
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

  // const fetchData = () => {
  //   setLoading(true);
  //   const address = fetch("https://api-trunkeymusicplayer.herokuapp.com/api/us")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       return data;
  //     })
  //     .catch(err => console.log(err))
  //     // .finally(() => setLoading(false));
  // }

  const songDetail = {
    src,
    cdThumb,
    song,
    singer,
    isPlaying,
    songIndex,
    duration,
  }

  useEffect(() => {
    const func = async () => {
      if (firstLoading) {
        setLoading(true);
        await fetch("https://api-trunkeymusicplayer.herokuapp.com/api/us")
          .then((response) => response.json())
          .then((data) => {
            songUs.current = data;
          })
          .catch((next) => console.log(next));

        await fetch("https://api-trunkeymusicplayer.herokuapp.com/api/vn")
          .then((response) => response.json())
          .then((data) => {
            songVn.current = data;
          })
          .catch((next) => console.log(next))
          .finally(() => { setLoading(false); setFirstLoading(false); })
        const songs = (songRegion === "usuk") ? songUs.current : songVn.current;
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
        setSongs(songs);
        setCdThumb(songs[0].image);
        setSong(songs[0].name);
        setSinger(songs[0].singer);
        setSrc(songs[0].path);
      }
    }

    func();
  }, [songRegion, firstLoading])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
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
    classes = "App player playing";
    play();
  } else if (audioRef.current) {
    classes = "App player";
    pause();
  } else {
    classes = "App player";
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
      setSongIndex(index);
      setTimeManually(0);
      setPercentage(0);
      modifySong(songs[index].name);
      modifySinger(songs[index].singer);
      modifySrc(songs[index].path);
      modifyCdThumb(songs[index].image);
    }
  }

  const modifySongState = {
    modifyActiveRandom,
    modifyActiveRepeat,
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

  const handleOnChangeVolume = (e) => {
    setVolume(e.target.value);
  }

  const ModifySongVolume = (e) => {
    switch (volume) {
      case 0.25:
        setVolume(0.5);
        break;
      case 0.5:
        setVolume(0.75);
        break;
      case 0.75:
        setVolume(1);
        break;
      case 1:
        setVolume(0.25);
        break;
      default: break;
    }
  }

  return (
    <div className={`${classes} ${classTheme}`}>
      {(loading === true) ? <Loading /> : (<div className="theme">
        <Dashboard ModifySongVolume={ModifySongVolume} modifyClassTheme={modifyClassTheme} modifySongRegion={modifySongRegion} modifySongState={modifySongState} songCount={songs.length} songDetail={songDetail} modifyIsPlaying={modifyIsPlaying} modifySongPlay={modifySongPlay} percentage={percentage} modifyPercentage={modifyPercentage} modifyCurruntTime={setTimeManually} songs={songs} />
        <audio ref={audioRef} id="audio" onTimeUpdate={(e) => updateTime(e)} src={src} onLoadedData={(e) => { setDuration(e.currentTarget.duration); }}></audio>
        <Playlist handleSoftDelte={handleSoftDelte} songIndex={songIndex} src={src} modifySongPlay={modifySongPlay} modifyIsPlaying={modifyIsPlaying} songs={songs} />
      </div>)}
    </div>
  );
}

export default App;
