import { Box } from "@chakra-ui/layout";
import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";
import axios from "axios";

const options = {
  region: "CA",
  defaultColor: "#f5f5f5",
  resolution: "provinces",
  colors: ["red"],
};

const Map = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const makeMap = async () => {
      try {
        const result = await axios.get("https://api.opencovid.ca/summary");
        const provinceData = result.data.summary;
        const labels = provinceData.map((x) => {
          let province = x.province;
          if (province === "BC") {
            province = "British Columbia";
          } else if (province === "NL") {
            province = "North West Territories";
          } else if (province === "PEI") {
            province = "Prince Edward Island";
          }
          return [province, x.active_cases];
        });
        labels.unshift(["Province", "Active Cases"]);
        setData(labels);
      } catch (e) {
        console.error(e);
      }
    };
    makeMap();
  }, []);

  if (data === null) {
    return <Box></Box>;
  } else {
    return (
<<<<<<< HEAD
    <Box boxSize={"100%"} border="2px"
        borderColor="gray.100" borderRadius="md">
      <Chart
        testid="map"
        chartType="GeoChart"
        data={data}
        options={options}
        mapsApiKey={process.env.GOOGLE_KEY}
      />
    </Box>
  );
=======
      <Box
        boxSize={"100%"}
        border="2px"
        borderColor="gray.100"
        borderRadius="md"
      >
        <Chart
          chartType="GeoChart"
          data={data}
          options={options}
          mapsApiKey={process.env.GOOGLE_KEY}
          role="Chart"
        />
      </Box>
    );
>>>>>>> 6bb62229eb89428506c0854c37b8774da77dd7db
  }
};

export default Map;
