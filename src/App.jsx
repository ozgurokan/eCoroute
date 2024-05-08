import './App.css'
import {
Flex,
Box,
Button,

} from "@chakra-ui/react"

import Navbar from "./components/navbar/Navbar"
import {CaptionCarousel} from "./components/carousel/Carousel"

function App() {

  return (
    <>
    <Navbar/>
    <Flex h={"200vh"} w={"full"}>
      <CaptionCarousel/>
    </Flex>
    </>
  )
}

export default App
