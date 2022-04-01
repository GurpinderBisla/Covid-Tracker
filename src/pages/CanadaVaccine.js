import Header from "../components/Header";
import { Box, Center, Heading } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import axios from "axios";

const CanadaVaccine = () => {
  const [province, setProvince] = useState("global");
  const [vaccineTotal, setVaccineTotal] = useState();
  const [vaccineDaily, setVaccineDaily] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(
          `https://api.opencovid.ca/timeseries?stat=cumulative_cvaccine&after=${returnFormatedDate(
            60
          )}&before=${returnFormatedDate(0)}`
        );
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  });

  return (
    <Box>
      <Header />
      <Box mg={5}>
        <Center padding={5}>
          <Heading letterSpacing="tighter" fontWeight="bold" size={"3xl"}>
            Vaccine Tracker
          </Heading>
        </Center>
      </Box>
    </Box>
  );
};

const returnFormatedDate = (pastDays) => {
  const date = new Date();
  date.setDate(date.getDate() - pastDays);

  return `${date.getDay}-${date.getMonth}-${date.getFullYear}`;
};

export default CanadaVaccine;
