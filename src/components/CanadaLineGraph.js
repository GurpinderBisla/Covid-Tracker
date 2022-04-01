import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/layout";

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

const CanadaLineGraph = (props) => {
  const [data, setData] = useState(null);

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

  useEffect(() => {
    const makeLineGraph = async () => {
      try {
        const result = await axios.get(
          `https://api.opencovid.ca/timeseries?stat=avaccine&loc=${props.province}&after=01-06-2021`
        );
        const resultData = result.data.avaccine;
        const labels = resultData.map((x) => x.date_vaccine_administered);

        setData({
          labels,
          datasets: [
            {
              label: "Administered Vaccines",
              data: resultData.map((x) => x.cumulative_avaccine),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgb(53, 162, 235, 0.5)",
            },
          ],
        });
      } catch (e) {
        console.log(e);
      }
    };
    makeLineGraph();
  }, [props]);

  if (data === null) {
    return <Box></Box>;
  } else {
    return (
      <Box boxSize="100%">
        <Line options={options} data={data} />
      </Box>
    );
  }
};

export default CanadaLineGraph;
