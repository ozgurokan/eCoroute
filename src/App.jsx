
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"

// page imports
import Home from "./pages/Home"

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route index path="/" element={<Home/>} />
      </Routes>
    <Footer/>
    
    </>
  )
}

export default App
