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
        const result = await axios.get("https://api.covid19tracker.ca/summary");
        const data = result.data.data[0]; //data for the latest day available

        setStats({
          new_cases: data.change_cases,
          new_deaths: data.change_fatalities,
          new_hospitalizations: data.change_hospitalizations,
          new_recoveries: data.change_recoveries,
          cases: data.total_cases,
          deaths: data.total_fatalities,
          hospitalizations: data.total_hospitalizations,
          recoveries: data.total_recoveries,
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
        <Stack direction={["column", "row"]} spacing="24px">
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
            name="hospitalizations"
            data={stats.hospitalizations}
            newData={stats.new_hospitalizations}
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
