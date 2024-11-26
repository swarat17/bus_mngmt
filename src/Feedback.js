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
  } from '@chakra-ui/react' 

  import NavBar from "./NavBar"
function Feedback()
{

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
        <iframe height="100%" width="100%" src="https://forms.office.com/r/3xw7JjxmbE"></iframe>
        </Flex>
          </div>
    )
}

export default Feedback