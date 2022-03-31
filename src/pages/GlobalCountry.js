import Header from "../components/Header";
import DataCard from "../components/DataCard";
import LineGraph from "../components/LineGraph";
import GlobalMap from "../components/GlobalMap";

import { Button } from "@chakra-ui/button";
import axios from "axios";
import { Flex, Center, HStack, Heading } from "@chakra-ui/layout";
import { useState } from "react";
import { useEffect } from "react";
import { Select } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { WrapItem, Wrap } from "@chakra-ui/react";

const blue = "blue.200";
const red = "red.400";

const GlobalCountry = () => {
  const [totalCases, setTotalCases] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);

  const [country, setCountry] = useState();
  const [isGlobal, setIsGlobal] = useState(true);
  const [countryArray, setCountryArray] = useState([]);
  const [newCases, setNewCases] = useState(0);
  const [newDeaths, setNewDeaths] = useState(0);

  useEffect(() => {
    axios
      .get("https://api.covid19api.com/summary")
      .then((result) => {
        let arr = [];
        result.data.Countries.map((elem) => arr.push(elem.Country));
        setCountryArray(arr);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (country === "Global" || country === undefined) {
      return;
    }

    axios
      .get("https://api.covid19api.com/summary")
      .then((result) => {
        const countryData = result.data.Countries.find((c) => {
          if (c.Country === country) return c;
          else return null;
        });
        setTotalCases(countryData.TotalConfirmed);
        setTotalDeaths(countryData.TotalDeaths);
        setNewCases(countryData.NewConfirmed);
        setNewDeaths(countryData.NewDeaths);
      })
      .catch((error) => console.log(error));
  }, [country]);

  useEffect(() => {
    if (!isGlobal) {
      return;
    }
    axios
      .get("https://api.covid19api.com/summary")
      .then((result) => {
        setTotalDeaths(result.data.Global.TotalDeaths);
        setTotalCases(result.data.Global.TotalConfirmed);
        setNewCases(result.data.Global.NewConfirmed);
        setNewDeaths(result.data.Global.NewDeaths);
      })
      .catch((error) => console.log(error));
  }, [isGlobal]);

  const changeCountry = () => {
    const select = document.getElementById("select").value;
    setCountry(select);
    if (select === "Global") {
      setIsGlobal(true);
    } else {
      setIsGlobal(false);
    }
  };

  const displayLineGraph = () => {
    if (!isGlobal) {
      return (
        <Center>
        <Box w={"75vw"}>
          <LineGraph
            country={country}
            name={country}
            compare={"Confirmed"}
            p={[5, 0]}
            cards={false}
          />
        </Box>
      </Center>
      );
    }
  };

  return (
    <>
      <Header />
      <Heading align="center" m={[5, 10]}>
        {" "}
        Global Status{" "}
      </Heading>

      <Center w="100vw">
        <HStack m={[5, 10]}>
          <Flex alignContent="flex-start">
            <Box display="flex" alignItems="baseline">
              <Box color="gray.500" fontWeight="semibold">
                <label>Select Country</label>
              </Box>
              <Select id="select">
                <option value={"Global"}>Global</option>
                {countryArray.map((country) => (
                  <option value={country} key={country}>
                    {country}
                  </option>
                ))}
              </Select>
            </Box>
            <Button colorScheme="blue" onClick={changeCountry}>
              Submit
            </Button>
          </Flex>
        </HStack>
      </Center>

      <Flex padding={3} justify="center">
        <Wrap spacing="24px" justify="space-evenly">
          <WrapItem>
            <DataCard
              data={totalCases}
              name="Total Cases"
              newData={newCases}
              bgColor={blue}
            />
          </WrapItem>
          <WrapItem>
            <DataCard
              data={totalDeaths}
              name="Total Deaths"
              newData={newDeaths}
              bgColor={red}
            />
          </WrapItem>
        </Wrap>
      </Flex>
      {displayLineGraph()}
      <Heading align="center" m={[5, 10]}>
        {" "}
        Global Total Status{" "}
      </Heading>
      <Center>
        <Box w={"75vw"} padding={3}>
          <GlobalMap />
        </Box>
      </Center>
    </>
  );
};

export default GlobalCountry;
