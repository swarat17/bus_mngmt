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
  import { useRef, useState } from 'react'
  
  
  const locations = [  
    {lat: 22.799564212575273, lng: 86.19123643954111}, // Main Gate                // Replaced by DB
    {lat: 22.795339600730053, lng: 86.20469281179442}, //RMBB1
    {lat: 22.79188787425417, lng: 86.21040741266079}, // Sinter Plant 3
    {lat: 22.789486063215342, lng: 86.21236047629736}, //HSM Lab
    {lat: 22.788190483518164, lng: 86.20783326138648}, //LD2 & slab caster
    // {lat:22.781410865088507, lng: 86.20112791000493}, //LD3 -- > Taken as Origin for demo inside plant
    {lat:22.78135974332161, lng:86.19741294620351}, //WRM Canteen
  
  ]
  
  function ToBusStop() {
  
  
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
            setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
          },
          (error) => {
            console.error(`Error: ${error.message}`);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        setCenter(position)
        console.log(position)
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  
    const onButtonClickNearestLocation = async () => {                    // Get Nearest location on click
      var minDistance = Number.MAX_SAFE_INTEGER;
      var nearest = null;
      var start = position                                                // Original Code
      //var start = ({lat:22.781410865088507, lng: 86.20112791000493})    //LD3, Only for simulation else remove
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
        origin: position,                                           // for original code
        //origin: {lat:22.781410865088507, lng: 86.20112791000493}, // LD3 // for demo inside plant
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
          p={[1, 2, 3, 4]}
          borderRadius='lg'
          m={[1, 2, 3, 4]}
          bgColor='white'
          shadow='base'
          minW={['full', 'full', 'full', 'container.md', 'container.md', 'container.md']}
          zIndex='1'
        >
          <HStack spacing={1} mt={[1, 2, 3, 4]} justifyContent='space-evenly'>
  
            <ButtonGroup>
              <Button colorScheme='pink' type='submit' onClick={onGetCurrentLocationClick}>
                Current Location
              </Button>
              <Button colorScheme='pink' type='submit' onClick={onButtonClickNearestLocation}>
                Nearest Stop
              </Button>
              </ButtonGroup>
          </HStack>
          <HStack spacing={1} mt={[1, 2, 3, 4]} justifyContent='space-evenly'>
          <ButtonGroup>
              <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
                Calculate Route
              </Button>
              <IconButton
                aria-label='center back'
                icon={<FaTimes />}
                onClick={clearRoute}
                > Clear Route </IconButton>
             
            </ButtonGroup>
          </HStack>
          <HStack spacing={1} mt={[1, 2, 3, 4]} justifyContent='space-evenly'>
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
            <IconButton
              aria-label='center back'
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                map.panTo(center)
                map.setZoom(15)
              }}
            />
          </HStack>
        </Box>
      </Flex>
    )
  }
  
  export default ToBusStop
