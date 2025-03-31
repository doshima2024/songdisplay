import './App.css'
import SongDisplay from "./components/SongDisplay"
import AddSong from "./components/AddSong"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
return (
  <Router>
    <Routes>
      <Route path="/" element={
        
        <SongDisplay/>
        
        } />
      
    </Routes>
  </Router>
)
}

export default App
