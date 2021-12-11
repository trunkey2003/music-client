import Home from './components/Home';
import HomeUser from './components/HomeUser';
import { BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home path="https://api-trunkeymusicplayer.herokuapp.com/api"/>}/>
        <Route path="/user/:username" element={<HomeUser path="https://api-trunkeymusicplayer.herokuapp.com/api/user"/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;

