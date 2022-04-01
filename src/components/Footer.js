import { Container, Text, Image, Flex, Center, Spacer, HStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react'

import covidlogo from '../imgs/covidlogo.png';
import gitLogo from '../imgs/gitLogo.png';


const Footer= ()=>{
  return (<Container as="footer" role="contentinfo" py={{ md: '8' }}
      bgColor="rgb(49, 52, 122)"
      color="white"
      mt={20}
      borderTop="1px"
      borderTopColor="gray.100" maxW="100vw">
      
      <Flex color='white' pl={10} pr={10} borderBottom="1px"
      borderBottomColor="gray" pb={5}>
        <Center>
          <Image src={covidlogo} alt="covid website logo" w='100px' />
          <Text fontSize="sm" color="subtle">
            Copyright &copy; {new Date().getFullYear()} Another Covid Tracker. All rights reserved.
          </Text>
        </Center>
        <Spacer />
        <Center>
        <Link href="https://github.com/GurpinderBisla/Covid-Tracker" isExternal>
        <Image src={gitLogo} alt="git website logo" w='40px' h='40px' color="white" />
        </Link>
        </Center>
      </Flex>
      <Center>
        <HStack pl={10} pr={10} pt={10} spacing='24px'>
            <Text>
              Built by :
            </Text>
            <Text>
              Daisy Han
            </Text>
            <Text>
              Gurpinder Bisla
            </Text>
            <Text>
              Arminder Singh
            </Text>
            <Text>
              Tom Vu
            </Text>
        </HStack>
      </Center>
  </Container>);
};

export default Footer;