import { VStack } from "@chakra-ui/layout";
import { Heading, Text } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";

const DataCard = (props) => {
  const cardData = props.data;
  const cardName = props.name;
  const cardNewData = props.newData;
  const bgColor = props.bgColor;

  return (
    <Badge bg={bgColor} padding={3} maxW="sm" maxH="sm">
      <VStack>
        <Heading letterSpacing={"tighter"} fontSize="2.5vw">
          {cardName} {cardData}
        </Heading>
        <Text>+ ({cardNewData}) today</Text>
      </VStack>
    </Badge>
  );
};

export default DataCard;
