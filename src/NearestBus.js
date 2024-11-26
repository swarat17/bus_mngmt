import markerIcon from "./buslogo.png";

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
  Image,
  Stack,
  VStack,
  Tag
} from '@chakra-ui/react'                                                      // Importing Chakra UI Elements


import { FaLocationArrow, FaTimes, FaYoast, 
FaPlusCircle } from 'react-icons/fa'                      // Importing React Icons

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api'                                                // Importing react-google-maps


import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";



const locationOptions = [
  { label: "4A - LD1 Bus Stop", value: { lat: 22.784822, lng: 86.200700 } },
  { label: "4A - LD1 Contractors Canteen", value: { lat: 22.784370, lng: 86.202895 } },
  { label: "4A - GBF East Gate", value: { lat: 22.791326, lng: 86.202658 } },
  { label: "4A - Safety and Ergonomics", value: { lat: 22.798693, lng: 86.193388 } },
  { label: "4A - Load Despatch Center", value: { lat: 22.798513, lng: 86.198020 } },
  { label: "2A - SNTI Training Shop", value: { lat: 22.794149, lng: 86.187950} },  // 6) 2A Stop 1,
  { label: "2A - Tata Steel N Road Gate", value: { lat: 22.792275, lng: 86.187661} }, // 5) 2A Stop 5,
  { label: "2A - PH3 Gate", value: { lat: 22.780501, lng: 86.186377} }, // 4) 2A Stop 4,
  { label: "2A - Cont Canteen", value: { lat: 22.789880, lng: 86.189937} }, // 3) 2A Stop 3,
  { label: "2A - WGO", value: { lat: 22.790199, lng: 86.194035} }, // 2) 2A Stop 2,
  { label: "2A - Coke Plant", value: { lat: 22.793511, lng: 86.193959} },
];

const locations = locationOptions.map(location => location.value);


const currentLocations  = [  

  { id: "4A", 
    coords: [
    {timestamp: "2023-02-02 14:52:17", gps: {lat: 22.784740, lng: 86.200668} },
    {timestamp: "2023-02-02 14:52:29", gps: {lat: 22.784400, lng: 86.201065} },
    {timestamp: "2023-02-02 14:54:15", gps: {lat: 22.784231, lng: 86.201950} },
    {timestamp: "2023-02-02 14:55:57", gps: {lat: 22.784439, lng: 86.202827} },
    {timestamp: "2023-02-02 14:56:24", gps: {lat: 22.784471, lng: 86.202957} },
    {timestamp: "2023-02-02 14:56:48", gps: {lat: 22.784507, lng: 86.203048} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.785522, lng: 86.203315} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.785944, lng: 86.203361} }, // not changed timestamp
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.786550, lng: 86.203430} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.786958, lng: 86.203491} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.787260, lng: 86.203559} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.787260, lng: 86.203559} }, 
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.788063, lng: 86.203811} }, // Stop
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.788454, lng: 86.203788} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.789276, lng: 86.203506} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.789930, lng: 86.203193} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.790693, lng: 86.202766} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.791229, lng: 86.202598} }, //end]}
    {timestamp: "2023-02-02 14:52:17", gps: {lat: 22.791452, lng: 86.202545} },
    {timestamp: "2023-02-02 14:52:29", gps: {lat: 22.792152, lng: 86.202392} },
    {timestamp: "2023-02-02 14:54:15", gps: {lat: 22.794687, lng: 86.201675} },
    {timestamp: "2023-02-02 14:55:57", gps: {lat: 22.795139, lng: 86.201576} },
    {timestamp: "2023-02-02 14:56:24", gps: {lat: 22.795415, lng: 86.201446} },
    {timestamp: "2023-02-02 14:56:48", gps: {lat: 22.795835, lng: 86.201164} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.796052, lng: 86.200775} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.796196, lng: 86.200218} }, // not changed timestamp
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.796459, lng: 86.199295} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.796615, lng: 86.198707} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.796857, lng: 86.198104} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.797243, lng: 86.195510} }, 
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.797227, lng: 86.194839} }, // Stop
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.797239, lng: 86.194671} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.797287, lng: 86.193786} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.798868, lng: 86.193733} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.799100, lng: 86.194656} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.799076, lng: 86.195632} }, //end]}
    {timestamp: "2023-02-02 14:52:17", gps: {lat: 22.799098, lng: 86.196517} },
    {timestamp: "2023-02-02 14:52:29", gps: {lat: 22.798986, lng: 86.197303} },
    {timestamp: "2023-02-02 14:54:15", gps: {lat: 22.797142, lng: 86.199974} },
    {timestamp: "2023-02-02 14:55:57", gps: {lat: 22.796655, lng: 86.200553} },
    {timestamp: "2023-02-02 14:56:24", gps: {lat: 22.796121, lng: 86.201011} },
    {timestamp: "2023-02-02 14:56:48", gps: {lat: 22.795755, lng: 86.201332} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.795211, lng: 86.201698} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.795093, lng: 86.201721} }, // not changed timestamp
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.794385, lng: 86.202034} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.793624, lng: 86.202232} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.792762, lng: 86.202270} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.792337, lng: 86.202339} }, 
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.791252, lng: 86.202659} }, // Stop
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.791091, lng: 86.202713} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.790525, lng: 86.202896} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.789806, lng: 86.203178} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.789325, lng: 86.203437} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.789302, lng: 86.203453} }, //end]}
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.789302, lng: 86.203453} }, //end]}
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.789123, lng: 86.203552} },
    {timestamp: "2023-02-02 14:57:10", gps: {lat: 22.788229, lng: 86.203994} },

    
    ]},

    { id: "2A", 
    coords: [
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.793983, lng: 86.187828 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.793592, lng: 86.187667 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.790792, lng: 86.187065 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.790664, lng: 86.186981 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.790227, lng: 86.186737 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.789951, lng: 86.186584 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.789690, lng: 86.186607 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.789289, lng: 86.186462 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.789133, lng: 86.186340 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.788818, lng: 86.186119 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.788402, lng: 86.185783 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.787937, lng: 86.185432 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.787662, lng: 86.185279 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.787138, lng: 86.185028 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.786785, lng: 86.185005 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.781312, lng: 86.186340 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.781789, lng: 86.185989 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.782230, lng: 86.185600 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.782896, lng: 86.185256 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.786228, lng: 86.185028 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.787187, lng: 86.185081 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.790693, lng: 86.187080 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.791187, lng: 86.187477 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.791908, lng: 86.187690 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.794147, lng: 86.187965 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.794862, lng: 86.188438 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.795318, lng: 86.189155 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.795576, lng: 86.189926 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.795782, lng: 86.190345 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.795795, lng: 86.190452 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.795822, lng: 86.190917 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.795530, lng: 86.191146 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.795253, lng: 86.191322 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.794820, lng: 86.190765 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.794366, lng: 86.190162 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.793947, lng: 86.189552 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.793128, lng: 86.189300 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.792480, lng: 86.189010 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.792060, lng: 86.188858 }}, 
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.790025, lng: 86.189781 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.789892, lng: 86.190330 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.789722, lng: 86.190933 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.789438, lng: 86.192108 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.789440, lng: 86.192932 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.789459, lng: 86.193382 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.789800, lng: 86.193931 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.790248, lng: 86.194068 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.790248, lng: 86.194068 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.790687, lng: 86.194206 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.791084, lng: 86.194290 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.791734, lng: 86.194236 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.792551, lng: 86.194343 }},
      {timestamp: "2023-02-02 14:52:17", gps: { lat: 22.792863, lng: 86.194213 }},
      

    
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
      { lat: 22.791326, lng: 86.202658 }, // 4) GBF East Gate,
      { lat: 22.784370, lng: 86.202895 }, // 2) LD1 Contractors Canteen
      { lat: 22.784822, lng: 86.200700 }  // 15) LD1 bus stop
    ]
  },
  {
    id: "2A",
    locations: [
      { lat: 22.794149, lng: 86.187950 },  // 6) 2A Stop 1, 
      { lat: 22.792275, lng: 86.187661 }, // 5) 2A Stop 2,
      { lat: 22.780501, lng: 86.186377 }, // 4) 2A Stop 3,
      { lat: 22.789880, lng: 86.189937 }, // 3) 2A Stop 4,
      { lat: 22.790199, lng: 86.194035 }, // 2) 2A Stop 5,
      { lat: 22.793511, lng: 86.193959 } // 1) 2A Stop 6,   
    ]
  }
];


const busdata = [
  {
    busid: "1001",
    busno: "JH05AD1001",
    location: {lat: 22.784740, lng: 86.200668} // 4A Start Point
  },
  {
    busid: "2001",
    busno: "JH05AK2001",
    location: {lat: 22.792152, lng: 86.202392} // 4A Nearer to Safety and Ergonomics
  },
  {
    busid: "3003",
    busno: "JH05AH3003",
    location: { lat: 22.793983, lng: 86.187828 }
  }
]


const buses = [
  {
    busid: "1001",
    busno: "JH05AD 1001",
    routeid: ["4A"]
  },
  {
    busid: "2001",
    busno: "JH05AK 2001",
    routeid: ["4A"]
  },
  {
    busid: "3003",
    busno: "JH05AH 3003",
    routeid: ["2A"]
  },
];

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

var busids = []
var routeIds = []
var busLoc = []
var currRoute = []
var waypts = []




function App() {

  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAx7E2uzLxoYnNiLsIF4xy5_xyRAFhTqis",
  })
 
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [center, setCenter] = useState({lat: 22.7863, lng: 86.1981})
  const [index, setIndex] = useState(0);
  
  const [nearestBus, setNearestBus] = useState(null);
  const [nearestBusId, setNearestBusId] = useState(null);
  const [nearestBusLocation, setNearestBusLocation] = useState(null);

  const [start,setStart] = useState()
  const [end, setEnd] = useState()

  const [click, setClick] = useState(false);
  const [liveLoc, setLiveLoc] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (click) {
      checkRoutes();
    }
  }, [click]);

  const handleClick = () => {
    setClick(true);
  };

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


  const checkRoutes = () => {
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
        currentLocations.forEach(singleRoute => {
          if (singleRoute.id === route.id){
            busLoc = singleRoute.coords
          }
        })
        routeIds.push(route.id);
        currRoute = route.locations;
        waypts = currRoute.slice(1, currRoute.length - 1).map(location => ({ location }));
        console.log(waypts)
      }
    });

    if (routeIds.length > 0) {
      console.log("Routes found with IDs: " + routeIds);
      checkBus(routeIds, buses)
    } else {
      alert("No Route Available.");
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
    setNearestBusId(nearest.busno);
    setNearestBusLocation(nearest.location);
    console.log(nearest)
    setIndex(busLoc.findIndex(obj => obj.gps.lat === nearestBusLocation.lat && obj.gps.lng === nearestBusLocation.lng))
    setLiveLoc(nearestBusLocation)
    map.panTo(nearestBusLocation)
    map.setZoom(15)
  };

  async function calculateETA() {                            
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
    
    const currentTime = new Date();
    const durationInMilliseconds = results.routes[0].legs[0].duration.value * 1000;
    const newTime = new Date(currentTime.getTime() + durationInMilliseconds);
    let hours = newTime.getHours();
    let minutes = newTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
  
    setDuration(formattedTime)
    setIsOpen(true)
  }

  

  async function calculateRoute() {                                // Finding directions
    if (currRoute.length === 0 || waypts.length === 0) {
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
    nearestBusLocation = ''
    start= ''
    waypts=[]
    currRoute=[]
    busLoc=[]
  }


  const extractData = (index) => {
    setLiveLoc(busLoc[index].gps)
    console.log(busLoc[index].gps);
  };


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
           <Marker position={liveLoc} icon={{url: markerIcon, scaledSize: {width:24, height:24}}} /> 
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        position="absolute"                               // not needed for phone
        left={0}                                          // not needed for phone
        top={0}                                           // not needed for phone
        borderRadius='lg'
        m={[2, 4]}
        bgColor='white'
        shadow='base'
        //minW={['full','container.md']}                  // needed for phone
        minW={[5, 10]}                                    // not needed for phone
        height={[500]}                                    // not needed for phone
        zIndex='1'
        mb={[2, 4]}
      >

       {/* for phone change VStack to HStack and change spacing to 2 and mt={[1, 2, 3, 4]} */} 
      <VStack spacing={10} mr={[1, 2, 3, 4]} ml={[1, 2, 3, 4]}  mt={[10]} justifyContent='space-evenly'>
      <VStack spcaing={1} justifyContent='space-evenly'>
      <Tag>Start Stop</Tag>
        <Select
          placeholder={locationOptions.find(option => option.value === start)?.label || "Select start point"}
          value={JSON.stringify(start)}
          onChange={(e) => setStart(JSON.parse(e.target.value))}
        >
          {locationOptions.map((option) => (
            <option key={option.label} value={JSON.stringify(option.value)}>
              {option.label}
            </option>
          ))}
        </Select>
        </VStack>
        <VStack spcaing={1} justifyContent='space-evenly'>
          <Tag>End Stop</Tag>
        <Select
          placeholder={locationOptions.find(option => option.value === end)?.label || "Select end point"}
          value={JSON.stringify(end)}
          onChange={(e) => setEnd(JSON.parse(e.target.value))}
        >
          
          {locationOptions.map((option) => (
            <option key={option.label} value={JSON.stringify(option.value)}>
              {option.label}
            </option>
          ))}
        </Select>
        </VStack>
        </VStack>

        
        {/* for phone change VStack to HStack and add ButtonGroup and change spacing to 2 and mt={[1, 2, 3, 4]} */}
        <VStack spacing={10} mb = {3} mt={10} justifyContent='space-evenly'>
          {/* <ButtonGroup> */}

          <Button colorScheme='green' type='submit' onClick={() => { handleClick(); calculateRoute();}}>
               1. Find Bus Route
              </Button>
          <Button colorScheme='green' type='submit' onClick={onButtonClickNearestBus}>
                2. Nearest Bus
            </Button>
          <Button colorScheme='green' type='submit' onClick={() => { calculateETA()}}>
                3. Track Bus
            </Button>

            {/* </ButtonGroup>   */}
          
      </VStack>

      

      </Box>
      <Stack>
      <IconButton
              aria-label='center back'
              bgColor="#FFF1C1 "
              icon={<FaPlusCircle />}
              position = "fixed"
              bottom = "1rem"
              right = "1rem"
              onClick={() => setIsOpen(!isOpen)}
            >
            {isOpen ? "Close":"Open"}
            </IconButton>
            {isOpen && (
              <Box
              borderRadius='lg'
              m={[2, 4]}
              bgColor="#FFF1C1 "
              shadow='base'
              minW={['full','container.md']}
              zIndex='0'
              mb={[2, 4]}
              position="fixed"
              bottom = "4rem"
              right = "1rem"
              >
          <HStack spacing={2} mb = {3} mt={[1, 2, 3, 4]} justifyContent='space-evenly'>
            <Text ><b>Distance: {distance} </b></Text>
            <Text ><b>ETA: {duration} </b></Text>
            <Text ><b>BusNo: {nearestBusId}</b></Text>
            </HStack>

              </Box>
            )}
            
            </Stack>
    </Flex>
    </div>
  )
}

export default App