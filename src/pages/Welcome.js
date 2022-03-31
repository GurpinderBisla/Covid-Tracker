import { Button } from "@chakra-ui/button";
import { Flex, Center, VStack, HStack, Heading } from "@chakra-ui/layout";
import { Link } from "react-router-dom";


/**
 * Component that renders the first page the user sees, lets them
 * pick between canadian stats vs global
 * @returns Welcome component
 */
const Welcome = () => {
  return (
    <VStack bgImage="url('https://images.unsplash.com/photo-1647960611306-575d35715bf2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2665&q=80')" bgPosition="centre" bgSize="auto" bgRepeat="no-repeat"> 
      <Heading pt={5} size="3xl" letterSpacing="tighter">
        {" "}
        Another Covid Tracker{" "}
      </Heading>

      {/* 
        Centers the content vertically and horizontally, pretty long
        winded, most likely a better way to do this exists 
      */}
      <Center h="100vh">
        <HStack>
          <Flex alignContent="flex-start">
            <Link to="/canada/provincial">
              <Button size="lg" variant="ghost">
                Canadian Stats
              </Button>
            </Link>
            <Link to="/global/countrystats">
              <Button size="lg" variant="ghost">
                Global Stats
              </Button>
            </Link>
          </Flex>
        </HStack>
      </Center>
    </VStack>
  );
};

export default Welcome;
