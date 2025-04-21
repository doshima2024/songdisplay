import './App.css'
import SongDisplay from "./components/SongDisplay"
import AddSong from "./components/AddSong"
import LandingPage from "./components/LandingPage"
import NavBar from "./components/NavBar"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
return (
  <Router>
    <NavBar />
    <Routes>
      <Route path="/songs" element={
        
        <SongDisplay/>
        
        } />
      <Route path="/" element={
        
        <LandingPage/>
        
        } />
      
    </Routes>
  </Router>
)
}

export default App
