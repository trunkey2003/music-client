import Home from './components/Home';
import HomeUser from './components/HomeUser';
import { Routes, Route} from "react-router-dom";
import Login from './components/Login';
import UserProfile from './components/UserProfile';

const path = (process.env.REACT_APP_IS_DEV)? process.env.REACT_APP_API_DEV : process.env.REACT_APP_API_ENDPOINT;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home path={path}/>}/>
        <Route path="/user/:username" element={<HomeUser path={`${path}/user`}/>}/>
        <Route path="/user/:username/:playlistid" element={<HomeUser path={`${path}/user`}/>}/>
        <Route exact path="/user/login" element={<Login></Login>}/>
        <Route exact path="/user/profile/:username" element={<UserProfile path={`${path}/user`}/>}/>
      </Routes>
    </div>
  )
}

export default App;

