import './App.css'
import SongDisplay from "./components/SongDisplay"
import AddSong from "./components/AddSong"
import LandingPage from "./components/LandingPage"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
return (
  <Router>
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
