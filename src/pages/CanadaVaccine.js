import Header from "../components/Header";
import { Box, Center, Heading, Flex, Wrap, WrapItem } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Select } from "@chakra-ui/select";
import axios from "axios";
import GeneralDataCard from "../components/GeneralDataCard";

const provinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon Territory",
];

const canadaPopulation2021 = 36991981;

const blue = "blue.200";
const red = "red.400";
const green = "green.200";

const CanadaVaccine = () => {
  const [province, setProvince] = useState("global");
  const [vaccineTime, setVaccineTime] = useState(null);
  const [vaccineSummary, setVaccineSummary] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(
          `https://api.opencovid.ca/timeseries?stat=cumulative_cvaccine&after=${getDateTime(
            60
          )}&before=${getDateTime(0)}`
        );
        const dataSummary = await axios.get("https://api.opencovid.ca/");
        console.log(dataSummary);
        setVaccineSummary(dataSummary.data.summary[0]);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  });

  console.log(vaccineSummary);
  if (vaccineSummary === null) return <Box></Box>;
  return (
    <Box>
      <Header />
      <Box mg={5}>
        <Center padding={5}>
          <Heading letterSpacing="tighter" fontWeight="bold" size={"3xl"}>
            Vaccine Tracker
          </Heading>
        </Center>

        <Center>
          <Heading>Canada Total Stats</Heading>
        </Center>
        <Center>
          <Flex padding={3} justify="center" mg={5}>
            <Wrap spacing="24px" justify="space-evenly">
              <WrapItem>
                <GeneralDataCard
                  name="Vaccine Distributed"
                  data={vaccineSummary.cumulative_dvaccine}
                  bgColor={blue}
                />
              </WrapItem>
              <WrapItem>
                <GeneralDataCard
                  name="Vaccine Taken"
                  bgColor={green}
                  data={vaccineSummary.cumulative_cvaccine}
                />
              </WrapItem>
              <WrapItem>
                <GeneralDataCard
                  name="Population Vaccinated"
                  data={`% ${Math.floor(
                    (vaccineSummary.cumulative_cvaccine /
                      canadaPopulation2021) *
                      100
                  )}`}
                  bgColor={red}
                />
              </WrapItem>
            </Wrap>
          </Flex>
        </Center>

        <Center>
          <Select
            placeholder="Select Province"
            width="80vw"
            onChange={(x) => setProvince(x.target.value)}
          >
            {provinces.map((x) => {
              return (
                <option key={x} value={x}>
                  {x}
                </option>
              );
            })}
          </Select>
        </Center>
      </Box>
    </Box>
  );
};

const getDateTime = (pastDays) => {
  const date = new Date();
  date.setDate(date.getDate() - pastDays);

  return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
};

export default CanadaVaccine;
