import { Container, Text, Center } from '@chakra-ui/react';


const Footer= ()=>{
  return (<Container as="footer" role="contentinfo" py={{ md: '8' }}
      bgColor="rgb(49, 52, 122)"
      color="white"
      mt={20}
      borderTop="1px"
      borderTopColor="gray.100" maxW="100vw">
      <Center>
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} All rights reserved.
        </Text>
      </Center>
  </Container>);
}

export default Footer;