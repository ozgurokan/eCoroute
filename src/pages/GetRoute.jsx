import React from 'react'
import {Flex} from "@chakra-ui/react"
import Map from '../components/map/MapBox'

function GetRoute() {
  return (
    <Flex width={"100%"} h="80vh" bgColor={"gray.800"}>
       <Map></Map>
    </Flex>
  )
}

export default GetRoute