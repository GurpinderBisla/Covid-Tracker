import Header from "../components/Header";
import axios from "axios";
import LineGraph from "../components/LineGraph";
import DataCard from "../components/DataCard";



import { Flex, Center, HStack, Grid, Box, Heading } from "@chakra-ui/layout";
import { WrapItem, Wrap } from "@chakra-ui/react";
import { Select, Button } from "@chakra-ui/react";
import {useState, useEffect} from 'react';



const GlobalCompare = () => {
  const [countryArray, setCountryArray] = useState([]);
  const [firstCountry, setFirstCountry] = useState();
  const [secondCountry, setSecondCountry] = useState();
  const [compare, setCompare] = useState("Confirmed");
  
  useEffect(()=>{
    axios
      .get("https://api.covid19api.com/summary")
      .then((result) => {
        let arr = [];
        result.data.Countries.map(elem=>arr.push(elem.Country));
        setCountryArray(arr);
      })
      .catch((error) => console.log(error));
  },[]);
  
  const changeCountryOne = () => {
    const select = document.getElementById("firstSelect").value;
    setFirstCountry(select);
  };
  
  const changeCountrySecond = ()=>{
    const select = document.getElementById("secondSelect").value;
    setSecondCountry(select);
  }
  
  const changeCompare = ()=>{
    let x = document.getElementById("compareSelect").value;
    if(x==="deaths"){
      setCompare("Deaths");
    }else{
      setCompare("Confirmed");
    }
  }
  
  return (
    <div>
      <Header />
      <Heading align="center">Compare Countries</Heading>
      <Box display="flex" alignItems="baseline">
        <label>Compare using: </label>
        <Select id="compareSelect" maxW="100px">
          <option value="cases">Cases</option>
          <option value="deaths">Deaths</option>
        </Select>
        <Button onClick={changeCompare}>Select</Button>
      </Box>
      <Grid templateColumns='repeat(2, 1fr)' gap={6} m={[2, 3]}>
        <Box>
          <label>Select Country</label>
            <Select id="firstSelect">
                <option value={"none"}></option>
                {countryArray.map((country) => (
                  <option value={country} key={country}>
                    {country}
                  </option>
                ))}
              </Select>
              <Button colorScheme="blue" onClick={changeCountryOne}>
              Select
            </Button>
            <LineGraph country={firstCountry} name={firstCountry} compare={compare}/>
        </Box>
        <Box>
          <label>Select Country</label>
            <Select id="secondSelect">
                <option value={"none"}></option>
                {countryArray.map((country) => (
                  <option value={country} key={country}>
                    {country}
                  </option>
                ))}
              </Select>
              <Button colorScheme="blue" onClick={changeCountrySecond}>
              Select
            </Button>
            <LineGraph country={secondCountry} name={secondCountry} compare={compare}/>
        </Box>
      </Grid>
    </div>
  );
};

export default GlobalCompare;