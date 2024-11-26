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
    VStack
  } from '@chakra-ui/react'                                                      // Importing Chakra UI Elements
  
  import NavBar from "./NavBar";
  import routePDF from "./routes.jpg";

  function pdf(){

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
        <Box position='absolute' left={20} top={0} h='100%' w='100%'>
            <img src={routePDF} alt="route"></img>
        </Box> 
        </Flex>
          </div>
    )

  }

  export default pdf