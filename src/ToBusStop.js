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
  Select,
  VStack
} from '@chakra-ui/react'                                                      // Importing Chakra UI Elements
import { FaLocationArrow, FaTimes, FaYoast, FaRoute } from 'react-icons/fa'                      // Importing React Icons
import NavBar from "./NavBar"
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api'                                                // Importing react-google-maps
import { useRef, useState } from 'react'

import { Link } from 'react-router-dom';


const locationOptions = [
  { label: "LD1 Bus Stop", value: { lat: 22.784822, lng: 86.200700 } },
  { label: "LD1 Contractors Canteen", value: { lat: 22.784370, lng: 86.202895 } },
  { label: "GBF East Gate", value: { lat: 22.791326, lng: 86.202658 } },
  { label: "Safety and Ergonomics", value: { lat: 22.798693, lng: 86.193388 } },
  { label: "Load Despatch Center", value: { lat: 22.798513, lng: 86.198020 } },
  { label:"", value: {lat: 22.794149, lng: 86.187950 }},  // 6) 2A Stop 1,
      { label:"", value: {lat: 22.792275, lng: 86.187661} }, // 5) 2A Stop 2,
      { label:"", value: {lat: 22.780501, lng: 86.186377} }, // 4) 2A Stop 3,
      { label:"", value: {lat: 22.789880, lng: 86.189937} }, // 3) 2A Stop 4,
      { label:"", value: {lat: 22.790199, lng: 86.194035} }, // 2) 2A Stop 5,
      { label:"", value: {lat: 22.793511, lng: 86.193959} } // 1) 2A Stop 6,   
];

const locations = locationOptions.map(location => location.value);

function App() {


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAx7E2uzLxoYnNiLsIF4xy5_xyRAFhTqis",
  })
 
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [position,setPosition] = useState(null)
  const [nearestLocation, setNearestLocation] = useState(null);
  const [center, setCenter] = useState({lat: 22.7863, lng: 86.1981})
  

  if (!isLoaded) {
    return <SkeletonText />
  }



  const onGetCurrentLocationClick = () => {                         // Get current location on click
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({lat:22.791888, lng:86.179237}) // for the demo
          //setPosition({ lat: position.coords.latitude, lng: position.coords.longitude }); // for real
        },
        (error) => {
          console.error(`Error: ${error.message}`);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
     
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
    //setPosition({lat: 22.7760344, lng: 86.2571442});  // in case of VPN error
    //setCenter({lat: 22.7760344, lng: 86.2571442}) // in case of VPN error
      setCenter(position)
      console.log(position)
      onButtonClickNearestLocation()
  }

  const onButtonClickNearestLocation = async () => {                    // Get Nearest location on click
    var minDistance = Number.MAX_SAFE_INTEGER;
    var nearest = null;
    //var start = position                                                // Original Code
    var start = ({lat:22.791888, lng:86.179237}) // SNTI Only for simulation else remove
    for (const location of locations) {
      const distance = await calculateDistance(start, location);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = location;
      }
    }
    console.log(nearest)
    setNearestLocation(nearest);
  }


 const calculateDistance = (origin, destination) => {                  // Calculate distance between two points 
    return new Promise((resolve) => {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: 'WALKING'
      }, (response, status) => {
        if (status === 'OK') {
          resolve(response.rows[0].elements[0].distance.value);
        }
      });
    });
  }
 
  async function calculateRoute() {                                // Finding directions
    if (position === '' || nearestLocation === '') {
      return
    }
    const directionsService = new window.google.maps.DirectionsService()
    const results = await directionsService.route({
      //origin: position,                                           // for original code
      origin: {lat:22.791888, lng:86.179237}, // SNTI // for demo inside plant
      destination: nearestLocation,
      //destination: {lat:22.78135974332161, lng:86.19741294620351}, //WRM Canteen,
      travelMode: window.google.maps.TravelMode.WALKING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {                                                    // Delete Route
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    position = ''
    nearestLocation = ''
  }

  return (
    <div>
    <NavBar/>
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
          <Marker position={nearestLocation} />
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        position="absolute"                               // not needed for phone
        left={0}                                          // not needed for phone
        top={0}                                           // not needed for phone 
        p={1}
        borderRadius='lg'
        m={[1, 2]}
        bgColor='white'
        shadow='base'
        //minW={['full', 'container.md']}
        width={[200]}                                    // not needed for phone
        height={[500]}                                    // not needed for phone
        zIndex='1'
      >
        <VStack spacing={10}>
        {/* for phone change VStack to HStack and change spacing to 2 and mt={[1, 2, 3, 4]} */} 
        <VStack spacing={10} ml = {[1,2]} mt={[1, 2, 3, 4]} justifyContent='space-evenly'>
          
            <Button colorScheme='green' type='submit' onClick={onGetCurrentLocationClick}>
              Find Nearest Stop
            </Button>
            {/* <Button colorScheme='green' type='submit' onClick={onButtonClickNearestLocation}>
              Nearest Stop
            </Button> */}
            <Button colorScheme='green' type='submit' onClick={calculateRoute}>
              Go to Stop
            </Button>
            {/* <IconButton
              aria-label='center back'
              colorScheme = 'green'
              icon={<FaRoute />}
              onClick={calculateRoute}
              > Calculate Route </IconButton> */              // Reruired for phone } 
          }
              
            
        </VStack>
        <VStack spacing={10} mt={[5]} justifyContent='space-evenly'>
          <Text><b>Distance: {distance}</b> </Text>
          <Text><b>Duration: {duration}</b> </Text>
          <HStack spacing={5}>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
          <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
              > Clear Route </IconButton>
              </HStack>
        </VStack>
        </VStack>

      </Box>
    </Flex>
    </div>
  )
}

export default App
