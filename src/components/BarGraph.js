import { Box } from "@chakra-ui/layout";
import axios from "axios";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Provinces and Territories",
    },
    legend: {
      position: "top",
    },
  },
};

const BarGraph = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const makeBarGraph = async () => {
      try {
        const result = await axios.get("https://api.opencovid.ca/summary");
        const provinceData = result.data.summary;
        const labels = provinceData.map((x) => x.province);

        setData({
          labels,
          datasets: [
            {
              label: "Cases",
              data: provinceData.map((x) => x.cumulative_cases),
              backgroundColor: "rgba(255, 99, 132, 0.8)",
            },
            {
              label: "Recoveries",
              data: provinceData.map((x) => x.cumulative_recovered),
              backgroundColor: "rgba(53, 162, 235, 0.8)",
            },
          ],
        });
      } catch (e) {
        console.error(e);
      }
    };
    makeBarGraph();
  }, []);

  if (data === null) {
    return <Box></Box>;
  } else {
    return (
      <Box>
        <Bar options={options} data={data}></Bar>
      </Box>
    );
  }
};

export default BarGraph;
