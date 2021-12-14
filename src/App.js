import Home from './components/Home';
import HomeUser from './components/HomeUser';
import { Routes, Route} from "react-router-dom";
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home path="https://api-trunkeymusicplayer.herokuapp.com/api"/>}/>
        <Route exact path="/user/:username" element={<HomeUser path="https://api-trunkeymusicplayer.herokuapp.com/api/user"/>}/>
        <Route path="/user/login" element={<Login></Login>}></Route>
      </Routes>
    </div>
  )
}

export default App;

