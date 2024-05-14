import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import {Flex,Box,Button} from "@chakra-ui/react"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function App({data_list}) {
  const [index, setIndex] = useState(0);
  const mapContainer = useRef(null);
  const data = data_list;
  const [start, setStart] = useState([data[0].bin_lat, data[0].bin_lng]);
  const [end, setEnd] = useState([data[1].bin_lat, data[1].bin_lng]);

  const [optimumRoute,setOptimumRoute] = useState([]);



  useEffect(() => {
    setStart([data[index].bin_lat, data[index].bin_lng]);
    setEnd([data[index + 1].bin_lat, data[index + 1].bin_lng]);
  }, [index]);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: end,
      zoom: 16,
    });

    map.on("load", () => {
      getRoute(map, start, end);

      map.addLayer({
        id: "start",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: start,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#3887be",
        },
      });

      map.addLayer({
        id: "end",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: end,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#f30",
        },
      });
    });

    return () => map.remove();
  }, [start, end]);

  async function getRoute(map, start, end) {
    try {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: "GET" }
      );

      const json = await query.json();
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      console.log(data);
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };

      if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
      } else {
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }

      const instructions = document.getElementById("instructions");
      const steps = data.legs[0].steps;

      let tripInstructions = "";

      for (const step of steps) {
        tripInstructions += `<li>${step.maneuver.instruction}</li>`;
      }

      instructions.innerHTML = `<p><strong>Trip duration: ${(
        data.duration
      )} sec </strong></p><ol>${tripInstructions}</ol>`;
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  }

  return (
    <Flex width={"100%"}  px="5%" alignItems={"center"} bgColor="gray.800" justifyContent="space-between" flexDir={"row-reverse"}>
      <Box width="80%" h={"70vh"}>
      <Box ref={mapContainer} width="100%" height={"100%"}/>
      </Box>
      
      <Flex align={"center"} flexDir="column">
        <Box maxWidth={"100%"} my="20px">

          <Button  colorScheme={"green"} width="10rem" mr={"1rem"}
              onClick={() =>
                index < data.length - 2
                  ? setIndex((prev) => (prev = prev - 1))
                  : setIndex(0)
              }
              className="next">
              Prev
            </Button>
            <Button  colorScheme={"green"} width="10rem"
              onClick={() =>
                index < data.length - 2
                  ? setIndex((prev) => (prev = prev + 1))
                  : setIndex(0)
              }
              className="next">
              Next
            </Button>
        </Box>
        <Box background={"gray.300"} width="20vw" mr={"20px"} height="40vh" padding="10%" id= "instructions"></Box>
        </Flex>
      </Flex>
  );
}
