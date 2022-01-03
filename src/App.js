import Home from './components/Home';
import HomeUser from './components/HomeUser';
import { Routes, Route} from "react-router-dom";
import Login from './components/Login';
import UserProfile from './components/UserProfile';

const productionPath = "https://api-trunkeymusicplayer.herokuapp.com/api";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home path={productionPath}/>}/>
        <Route exact path="/user/:username" element={<HomeUser path={`${productionPath}/user`}/>}/>
        <Route exact path="/user/login" element={<Login></Login>}/>
        <Route exact path="/user/profile/:username" element={<UserProfile path={`${productionPath}/user`}/>}/>
      </Routes>
    </div>
  )
}

export default App;

