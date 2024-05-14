import React,{useEffect,useState} from 'react'
import {Flex,Box} from "@chakra-ui/react"
import Map from '../components/map/MapBox'
import axios from "axios"

function GetRoute() {

  const [actualData,setActualData] = useState(null)

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/optimum-route/1").then((response) => {
      setActualData(response.data)
    }).catch((err) => console.log(err))
  },[])

  return (
    <Flex width={"100%"} h="80vh" bgColor={"gray.800"}>
      {
        !actualData && <Box>Loading</Box>
      }
      {
        actualData && <Map data_list={actualData}> </Map> 
      }
    </Flex>
  )
}

export default GetRoute