import { VStack, Box } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";

const GeneralDataCard = (props) => {
  const cardData = props.data;
  const cardName = props.name;
  const bgColor = props.bgColor;

  return (
    <Box boxShadow="md" p="6" rounded="md" padding={5} bg={bgColor}>
      <VStack>
        <Heading letterSpacing={"tighter"} fontSize="2.5vw">
          {cardName} {cardData}
        </Heading>
      </VStack>
    </Box>
  );
};

export default GeneralDataCard;
