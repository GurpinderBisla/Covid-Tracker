import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import DataCard from "../components/DataCard";
import { Flex, Stack } from "@chakra-ui/react";

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
    <div>
      <Header />
      <h1>TODO CANADA PROVINCIAL</h1>
      <Flex padding={3} justifyContent="center">
        <Stack direction={["column", "row"]} spacing="24px" wrap={"wrap"}>
          <DataCard
            name="cases"
            data={stats.cases}
            newData={stats.new_cases}
            bgColor={blue}
          />
          <DataCard
            name="deaths"
            data={stats.deaths}
            newData={stats.new_deaths}
            bgColor={red}
          />
          <DataCard
            name="Tested"
            data={stats.tests}
            newData={stats.new_tests}
            bgColor={yellow}
          />
          <DataCard
            name="recoveries"
            data={stats.recoveries}
            newData={stats.new_recoveries}
            bgColor={green}
          />
        </Stack>
      </Flex>
    </div>
  );
};

export default CanadaProvincial;
