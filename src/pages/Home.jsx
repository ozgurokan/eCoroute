import React from 'react'
import {
Flex,
Box,
Button,

} from "@chakra-ui/react"

import {CaptionCarousel} from "../components/carousel/Carousel"

function Home() {
  return (
    <>
    <Flex h={"200vh"} w={"full"}>
      <CaptionCarousel/>
    </Flex>
    </>
  )
}

export default Home