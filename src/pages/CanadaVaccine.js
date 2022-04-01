import Header from "../components/Header";
import { Box, Center, Heading, Flex, Wrap, WrapItem } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Select } from "@chakra-ui/select";
import axios from "axios";
import GeneralDataCard from "../components/GeneralDataCard";
import CanadaLineGraph from "../components/CanadaLineGraph";

const provinces = [
  "Canada",
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

const provinceTwoLetters = [
  "canada",
  "AB",
  "BC",
  "MB",
  "NB",
  "NL",
  "NT",
  "NS",
  "NU",
  "ON",
  "PE",
  "QC",
  "SK",
  "YT",
];

const populations2021 = {
  canada: 38526760,
  NL: 522453,
  PEI: 166331,
  NS: 1002586,
  NB: 797102,
  QC: 8639642,
  ON: 14951825,
  MA: 1390249,
  SA: 1183269,
  AL: 4480486,
  BC: 5264485,
  YU: 42982,
  NWT: 45640,
  NU: 39710,
};

const blue = "blue.200";
const red = "red.400";
const green = "green.200";

const CanadaVaccine = () => {
  const [province, setProvince] = useState("Canada");
  const [vaccineSummary, setVaccineSummary] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const dataSummary = await axios.get("https://api.opencovid.ca/");
        setVaccineSummary(dataSummary.data.summary[0]);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

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
          {vaccineSummary !== null ? (
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
                    data={vaccineSummary.cumulative_avaccine}
                  />
                </WrapItem>
                <WrapItem>
                  <GeneralDataCard
                    name="Population Vaccinated"
                    data={`% ${Math.floor(
                      (vaccineSummary.cumulative_cvaccine /
                        populations2021.canada) *
                        100
                    )}`}
                    bgColor={red}
                  />
                </WrapItem>
              </Wrap>
            </Flex>
          ) : (
            <Box></Box>
          )}
        </Center>

        <Center>
          <Select width="80vw" onChange={(x) => setProvince(x.target.value)}>
            {provinces.map((x) => {
              return (
                <option key={x} value={x}>
                  {x}
                </option>
              );
            })}
          </Select>
        </Center>

        <Center>
          {province !== null ? (
            <CanadaLineGraph
              province={provinceTwoLetters[provinces.indexOf(province)]}
            />
          ) : (
            <Box></Box>
          )}
        </Center>
      </Box>
    </Box>
  );
};

export default CanadaVaccine;
