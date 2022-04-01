import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import DataCard from "../components/DataCard";
import { WrapItem, Wrap, Flex, Center, Heading } from "@chakra-ui/react";
import BarGraph from "../components/BarGraph";
import { Box, VStack } from "@chakra-ui/layout";
import Map from "../components/Map";
import Footer from "../components/Footer";


const blue = "blue.200";
const red = "red.400";
const green = "green.200";
const yellow = "purple.100";

const CanadaProvincial = () => {
  const [stats, setStats] = useState({});

  //Get stats on initial loading of the page
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get("https://api.opencovid.ca/");
        const data = result.data.summary[0]; //data for the latest day available

        setStats({
          new_cases: data.cases,
          new_deaths: data.deaths,
          new_tests: data.testing,
          new_recoveries: data.recovered,
          cases: data.cumulative_cases,
          deaths: data.cumulative_deaths,
          tests: data.cumulative_testing,
          recoveries: data.cumulative_recovered,
        });
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  return (
    <>
    <Box>
      <Header />

      <Box mg={5}>
        <Center padding={5}>
          <Heading letterSpacing="tighter" fontWeight="bold" size={"3xl"}>
            Canadian Stats
          </Heading>
        </Center>

        <Flex padding={3} justify="center" mg={5}>
          <Wrap spacing="24px" justify="space-evenly">
            <WrapItem>
              <DataCard
                name="Cases"
                data={stats.cases}
                newData={stats.new_cases}
                bgColor={blue}
              />
            </WrapItem>
            <WrapItem>
              <DataCard
                name="Deaths"
                data={stats.deaths}
                newData={stats.new_deaths}
                bgColor={red}
              />
            </WrapItem>
            <WrapItem>
              <DataCard
                name="Tested"
                data={stats.tests}
                newData={stats.new_tests}
                bgColor={yellow}
              />
            </WrapItem>
            <WrapItem>
              <DataCard
                name="Recoveries"
                data={stats.recoveries}
                newData={stats.new_recoveries}
                bgColor={green}
              />
            </WrapItem>
          </Wrap>
        </Flex>

        <Center>
          <VStack w={"75vw"} spacing={10} marginTop={5}>
            <BarGraph />
            <Heading> Active Cases </Heading>
            <Map />
          </VStack>
        </Center>
      </Box>
    </Box>
    <Footer />
    </>
  );
};

export default CanadaProvincial;