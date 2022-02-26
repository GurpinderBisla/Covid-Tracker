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
    <VStack>
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
