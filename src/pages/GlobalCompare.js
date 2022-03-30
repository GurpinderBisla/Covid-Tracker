import Header from "../components/Header";
import axios from "axios";
import LineGraph from "../components/LineGraph";


import { Flex, Center, HStack } from "@chakra-ui/layout";
import { WrapItem, Wrap } from "@chakra-ui/react";
import { Select, Button } from "@chakra-ui/react";
import {useState, useEffect} from 'react';



const GlobalCompare = () => {
  const [countryArray, setCountryArray] = useState([]);
  const [firstCountry, setFirstCountry] = useState();
  const [secondCountry, setSecondCountry] = useState();
  
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
  
  return (
    <div>
      <Header />
      <h1 align="center">Compare Countries</h1>
      <Flex> 
        <Wrap spacing='30px'>
          <WrapItem>
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
            <LineGraph />
          </WrapItem>
          <WrapItem>
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
          </WrapItem>
        </Wrap>
      </Flex>
    </div>
  );
};

export default GlobalCompare;