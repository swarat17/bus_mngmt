import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
  } from '@chakra-ui/react'                                                      // Importing Chakra UI Elements
  import { FaLocationArrow, FaTimes, FaYoast } from 'react-icons/fa'                      // Importing React Icons
  
  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    DirectionsRenderer,
  } from '@react-google-maps/api'                                                // Importing react-google-maps
  import React, { useState, useEffect } from "react";
    
  
  
  
    const locationOption = [
      {label: "LD1 Bus Stop", value:{ lat: 22.784822, lng: 86.200700 }},
      {label: "LD1 Contractors Canteen", value:{ lat: 22.784370, lng: 86.202895 }},
      {label: "GBF East Gate", value:{lat: 22.791326, lng: 86.202658}},
      {label: "Safety and Ergonomics", value:{lat: 22.798693, lng: 86.193388}},
      {label: "Load Despatch Center", value:{lat: 22.798513, lng: 86.198020}}
  
    ]
  
  
  
  
    const currentLocations  = [  
  
      { id: "4A", 
        coords: [
        {timestamp: "2023-02-02 14:52:17", gps: {lat: 22.788370, lng: 86.203941} },
        {timestamp: "2023-02-02 14:52:29", gps: {lat: 22.787677, lng: 86.204246} },
        {timestamp: "2023-02-02 14:54:15", gps: {lat: 22.787199, lng: 86.204513} },
        {timestamp: "2023-02-02 14:55:57", gps: {lat: 22.784719, lng: 86.206909} },
        {timestamp: "2023-02-02 14:56:24", gps: {lat: 22.784526, lng: 86.207702} },
        {timestamp: "2023-02-02 14:56:48", gps: {lat: 22.784538, lng: 86.208656} },
        {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.785415, lng: 86.212348} },
        {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.785385, lng: 86.212615} }, // not changed timestamp
        {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.784887, lng: 86.213188} },
        {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.784156, lng: 86.212631} },
        {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.783449, lng: 86.211906} },
        {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.783449, lng: 86.211906} }, 
        {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.782674, lng: 86.211700} }, // Stop
        {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.781993, lng: 86.211380} },
        {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.781364, lng: 86.211074} },
        {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.778392, lng: 86.201271} },
        {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.777767, lng: 86.201057} },
        {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.777071, lng: 86.200668} } //end]}
        ]}        
  
    ]
  
    const routes = [               // Route config as per bus stops
    {
      id: "4A",  // Final
      locations: [
        { lat: 22.784822, lng: 86.200700 }, // 1) LD1 bus stop
        { lat: 22.784370, lng: 86.202895 }, // 2) LD1 Contractors Canteen
        { lat: 22.791326, lng: 86.202658 }, // 4) GBF East Gate,
        { lat: 22.798693, lng: 86.193388 }, // 5) Safety and Ergonomics
        { lat: 22.798513, lng: 86.198020 }, // 6) Load Despatch Center
        { lat: 22.784822, lng: 86.200700 }  // 15) LD1 bus stop
      ]
    },
    {
      id: "2A",
      locations: [
        { lat:22.78135974332161, lng:86.19741294620351}, //WRM Canteen,
        {lat: 22.789486063215342, lng: 86.21236047629736}, //HSM Lab
        {lat: 22.799564212575273, lng: 86.19123643954111}, // Main Gate 
      ]
    }
  ];
  
  
  const busdata = [
    {
      busid: "1001",
      busno: "JH05AD1001",
      location: { lat: 22.799564212575273, lng: 86.19123643954111 } // Main gate
    },
    {
      busid: "2001",
      busno: "JH05AK2001",
      location: {lat: 22.789486063215342, lng: 86.21236047629736} //HSM Lab
    },
    {
      busid: "3003",
      busno: "JH05AH3003",
      location: { lat:22.781410865088507, lng: 86.20112791000493} // LD3
    }
  ]
  
  
  const buses = [
    {
      busid: "1001",
      busno: "JH05AD1001",
      routeid: ["4A"]
    },
    {
      busid: "2001",
      busno: "JH05AK2001",
      routeid: ["4A"]
    },
    {
      busid: "3003",
      busno: "JH05AH3003",
      routeid: ["2A"]
    },
  ];
  
  const start = { lat: 22.784822, lng: 86.200700 } // 1) LD1 bus stop
  const end = { lat: 22.798513, lng: 86.198020 } // 6) Load Despatch Center
  
  const calculateDistance = (origin, destination) => {
    return new Promise((resolve) => {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          resolve(response.rows[0].elements[0].distance.value);
        }
      });
    });
  };
  
  
  
  function NearestBus() {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: "AIzaSyAx7E2uzLxoYnNiLsIF4xy5_xyRAFhTqis",
    })
   
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [position,setPosition] = useState(null)
    const [center, setCenter] = useState({lat: 22.7863, lng: 86.1981})
    const [index, setIndex] = useState(0);
    
    const [nearestBus, setNearestBus] = useState(null);
    const [nearestBusId, setNearestBusId] = useState(null);
    const [nearestBusLocation, setNearestBusLocation] = useState(null);
  
    useEffect(() => {
      if (distance !== '') {
        const intervalId = setInterval(() => {
          if (index === busLoc.length - 1) {
            clearInterval(intervalId);
            console.log ("Stopped")
          } else {
            setIndex((prevIndex) => prevIndex + 1);
            extractData(index);
          }
        }, 3000);
  
        return () => {
          clearInterval(intervalId);
        };
      }
    }, [index, distance]);
  
  
  
    if (!isLoaded) {
      return <SkeletonText />
    }
  
  
  
    var busids = []
    var routeIds = []
    var busLoc = []
    var currRoute = []
  
    function checkRoutes(routes, start, end) {
      routeIds = [];
      routes.forEach(route => {
        let startFound = false;
        let endFound = false;
        for(let i=0; i<route.locations.length; i++){
          let gps=route.locations[i]
          if (gps.lat === start.lat && gps.lng === start.lng) {
            startFound = true;
            for(let j=i+1; j<route.locations.length; j++){
              let gps2=route.locations[j]
              if (gps2.lat === end.lat && gps2.lng === end.lng) {
                endFound = true;
              }
            }
          }
        }
        if (startFound && endFound) {
          //checkBus(route.id, buses)
          currentLocations.forEach(singleRoute => {
            if (singleRoute.id === route.id){
              busLoc = singleRoute.coords
            }
          })
          routeIds.push(route.id);
          currRoute = route.locations;
        }
      });
    
    
      if (routeIds.length > 0) {
        console.log("Routes found with IDs: " + routeIds);
        checkBus(routeIds, buses)
      } else {
        console.log("Route not found");
      }
    }
  
    
    
    function checkBus(routeIds, buses) {
      busids = []
      routeIds.forEach(routeId=>{ 
        for(let i=0;i<buses.length;i++) {
          for(let j=0;j<buses[i].routeid.length;j++){
            if (routeId === buses[i].routeid[j]){
            busids.push(buses[i].busid)
            }
          }
        }
      }) 
      console.log(" Buses running on route: " + busids)
      return (busids)
    }
  
    checkRoutes(routes, start, end);
  
  
    const onButtonClickNearestBus = async () => {
      let minDistance = Number.MAX_SAFE_INTEGER;
      let nearest = null;
  
      for (const bus of busdata) {
        if (busids.includes(bus.busid)) {
          const distance = await calculateDistance(start, bus.location);
          if (distance < minDistance) {
            minDistance = distance;
            nearest = bus;
          }
        }
      }
      setNearestBus(nearest);
      setNearestBusId(nearest.busid);
      setNearestBusLocation(nearest.location);
    };
  
  
    async function calculateETA() {                                // Finding directions
      if (nearestBusLocation === '' || start === '') {
        return
      }
      const directionsService = new window.google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: nearestBusLocation,
        destination: start,     
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)
    }
  
    const waypts = currRoute.slice(1, currRoute.length - 1).map(location => ({ location }));
  
    console.log(waypts)
  
    async function calculateRoute() {                                // Finding directions
      if (nearestBusLocation === '' || start === '') {
        return
      }
      const directionsService = new window.google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: currRoute[0],
         waypoints:waypts,
        destination: currRoute[currRoute.length-1],
        
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      setDirectionsResponse(results)
    }
  
  
  
    function clearRoute() {                                                    // Delete Route
      setDirectionsResponse(null)
      setDistance('')
      setDuration('')
      position = ''
      start= ''
    }
  
  
    const extractData = (index) => {
      console.log(busLoc[index].gps);
    };
  
  
    return (
      <Flex
        position='relative'
        flexDirection='column'
        alignItems='center'
        h={['100vh', '100vh', '100vh', '100vh']}
        w={['100vw', '100vw', '100vw', '100vw']}
      >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
          {/* Google Map Box */}
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
          >
            <Marker position={busLoc[index].gps} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </Box>
        <Box
          borderRadius='lg'
          m={[2, 4]}
          bgColor='white'
          shadow='base'
          minW={['full','container.md']}
          zIndex='1'
        >
  
        <HStack spacing={1} mt={[1, 2, 3, 4]} justifyContent='space-evenly'>
            <ButtonGroup>
                
            </ButtonGroup>
        </HStack>
  
        <HStack spacing={2} mt={[2, 4]} justifyContent='space-evenly'>
              <ButtonGroup>
              <Button colorScheme='pink' type='submit' onClick={onButtonClickNearestBus}>
                  Find Nearest Bus
                </Button>
                <Button colorScheme='pink' type='submit' onClick={() => { calculateETA(); calculateRoute();}}>
                  Bus Route
                </Button>
              <IconButton
                aria-label='center back'
                icon={<FaTimes />}
                onClick={clearRoute}
              />
            </ButtonGroup>
          </HStack>
  
          <HStack spacing={2} mt={[2, 4]} justifyContent='space-evenly'>
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
            <IconButton
              aria-label='center back'
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                map.panTo(start)
                map.setZoom(15)
              }}
            />
          </HStack>
        </Box>
      </Flex>
    )
  }
  
  export default NearestBus
  