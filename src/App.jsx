
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"

// page imports
import Home from "./pages/Home"
import GetRoute from "./pages/GetRoute"

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route index path="/" element={<Home/>} />
        <Route path="/getRoute" element={<GetRoute/>} />
      </Routes>
    <Footer/>
    
    </>
  )
}

export default App
