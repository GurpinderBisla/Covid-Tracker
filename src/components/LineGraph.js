import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/layout";
import DataCard from "./DataCard";
import { WrapItem, Wrap } from "@chakra-ui/react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const blue = "blue.200";
const red = "red.400";

const LineGraph = (props) => {
  const [data, setData] = useState(null);
  const [totalCases, setTotalCases] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [newCases, setNewCases] = useState(0);
  const [newDeaths, setNewDeaths] = useState(0);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: props.name,
      },
    },
  };

  const displayCards = () => {
    if (props.cards) {
      return (
        <Wrap spacing="24px" justify="space-evenly">
          <WrapItem>
            <DataCard
              data={totalCases}
              name="Total Cases"
              newData={totalCases - newCases}
              bgColor={blue}
            />
          </WrapItem>
          <WrapItem>
            <DataCard
              data={totalDeaths}
              name="Total Deaths"
              newData={totalDeaths - newDeaths}
              bgColor={red}
            />
          </WrapItem>
        </Wrap>
      );
    }
  };

  useEffect(() => {
    const makeLineGraph = async () => {
      try {
        const result = await axios.get(
          "https://api.covid19api.com/dayone/country/" + props.country
        );
        const countryData = result.data;
        let labels = countryData.map((x) => {
          let date = new Date(x.Date);
          return monthNames[date.getMonth()] + "," + date.getFullYear();
        });
        setTotalCases(countryData[countryData.length - 1].Confirmed);
        setTotalDeaths(countryData[countryData.length - 1].Deaths);
        setNewCases(countryData[countryData.length - 2].Confirmed);
        setNewDeaths(countryData[countryData.length - 2].Deaths);

        setData({
          labels,
          datasets: [
            {
              label: props.compare === "Confirmed" ? "Cases" : "Deaths",
              data: countryData.map((x) => {
                if (props.compare === "Confirmed") {
                  return x.Confirmed;
                } else {
                  return x.Deaths;
                }
              }),
              borderColor:
                props.compare === "Confirmed"
                  ? "rgb(53, 162, 235)"
                  : "rgb(255, 99, 132)",
              backgroundColor:
                props.compare === "Confirmed"
                  ? "rgb(53, 162, 235, 0.5)"
                  : "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      } catch (e) {
        console.log(e);
      }
    };
    if (props.country !== undefined) {
      makeLineGraph();
    }
  }, [props.country, props.compare]);

  if (data === null) {
    return <Box></Box>;
  } else {
    return (
      <Box w={"100%"} border="2px"
        borderColor="gray.100" borderRadius="md" pt={5} mt={5}>
        {displayCards()}
        <Line options={options} data={data} />
      </Box>
    );
  }
};

export default LineGraph;
