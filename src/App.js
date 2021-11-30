import './App.css';
import Dashboard from './components/Dashboard';
import Playlist from './components/Playlist';
import { useState, useRef, useEffect } from 'react';
import Loading from './components/Loading';


function App() {
  const songVn = useRef();
  const songUs = useRef();
  const [songRegion, setSongRegion] = useState("usuk");
  // const songs = (songRegion == "usuk")? songUs.current : songVn.current;
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef();
  const [songIndex, setSongIndex] = useState(0);
  const [src, setSrc] = useState("songs[songIndex].path");
  const [cdThumb, setCdThumb] = useState("songs[songIndex].image");
  const [song, setSong] = useState("songs[songIndex].name");
  const [singer, setSinger] = useState("songs[songIndex].singer");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [activeRandom, setActiveRandom] = useState(false);
  const [activeRepeat, setActiveRepeat] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);

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

  useEffect(async () => {
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
      const songs = (songRegion == "usuk") ? songUs.current : songVn.current;
      setSongs(songs);
      setCdThumb(songs[0].image);
      setSong(songs[0].name);
      setSinger(songs[0].singer);
      setSrc(songs[0].path);
      setSongIndex(0);
      setTimeManually(0);
      setPercentage(0);
    } else {
      const songs = (songRegion == "usuk") ? songUs.current : songVn.current;
      setSongs(songs);
      setSongs(songs);
      setCdThumb(songs[0].image);
      setSong(songs[0].name);
      setSinger(songs[0].singer);
      setSrc(songs[0].path);
    }
  }, [songRegion])


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

  const modifySongState = {
    modifyActiveRandom,
    modifyActiveRepeat,
  }

  const updateTime = (e) => {
    const _percentage = e.target.currentTime / duration * 100;
    setPercentage(_percentage);
    if (percentage == 100) {
      if (songIndex == songs.length-1) 
      modifySongPlay(0); else modifySongPlay(songIndex + 1);
    }
  }

  const setTimeManually = (e) => {
    audioRef.current.currentTime = e;
  }

  return (
    <div className={classes}>
      {(loading == true) ? <Loading/> : (<div>
        <Dashboard modifySongRegion={modifySongRegion} modifySongState={modifySongState} songCount={songs.length} songDetail={songDetail} modifyIsPlaying={modifyIsPlaying} modifySongPlay={modifySongPlay} percentage={percentage} modifyPercentage={modifyPercentage} modifyCurruntTime={setTimeManually} />
        <audio ref={audioRef} id="audio" onTimeUpdate={(e) => updateTime(e)} src={src} onLoadedData={(e) => { setDuration(e.currentTarget.duration); }}></audio>
        <Playlist songIndex={songIndex} src={src} modifySongPlay={modifySongPlay} modifyIsPlaying={modifyIsPlaying} songs={songs} />
      </div>)}
    </div>
  );
}

export default App;
