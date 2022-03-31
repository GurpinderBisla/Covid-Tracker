import { VStack, Box } from "@chakra-ui/layout";
import { Heading, Text } from "@chakra-ui/react";

const DataCard = (props) => {
  const cardData = props.data;
  const cardName = props.name;
  const cardNewData = props.newData;
  const bgColor = props.bgColor;

  return (
    <Box boxShadow="md" p="6" rounded="md" padding={5} bg={bgColor}>
      <VStack>
        <Heading letterSpacing={"tighter"} fontSize="2.5vw">
          {cardName} {cardData}
        </Heading>
        <Text>+ ({cardNewData}) today</Text>
      </VStack>
    </Box>
  );
};

export default DataCard;
