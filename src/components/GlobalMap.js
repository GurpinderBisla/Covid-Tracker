import { Box } from "@chakra-ui/layout";
import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";
import axios from "axios";

const options = {
  defaultColor: "#f5f5f5",
  colors: ["red"],
};

const GlobalMap = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const makeMap = async () => {
      try {
        const result = await axios.get("https://api.covid19api.com/summary");
        const countryData = result.data.Countries;
        const labels = countryData.map((x) => {
            let country = x.Country;
            if(x.Country === "United States of America"){
                country = "United States";
            }else if(x.Country === "Russian Federation"){
                country = "Russia";
            }else if(x.Country === "Venezuela (Bolivarian Republic)"){
                country = "Venezuela";
            }else if(x.Country === "Tanzania, United Republic of"){
                country = "Tanzania";
            }else if(x.Country === "South Sudan"){
                country = "SS";
            }else if(x.Country === "Congo (Kinshasa)"){
                country = "CD";
            }else if(x.Country === "Congo (Brazzaville)"){
                country = "CG";
            }
          return [country, x.TotalConfirmed];
        });
        labels.push(["Greenland", 11971]);
        labels.push(["Western Sahara", 0]);
        labels.unshift(["Country", "Total Cases"]);
        setData(labels);
      } catch (e) {
        console.error(e);
      }
    };
    makeMap();
  }, []);


    if(data===null){
        return <Box></Box>
    }else{
      return (
        <Box boxSize={"100%"}>
          <Chart
            chartType="GeoChart"
            data={data}
            options={options}
            //make this private
            mapsApiKey={process.env.GOOGLE_KEY}
          />
        </Box>
      );
    }
};

export default GlobalMap;

