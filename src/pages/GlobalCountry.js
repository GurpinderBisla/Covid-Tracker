import Header from "../components/Header";

import { Button } from "@chakra-ui/button";
import axios from 'axios';
import { Flex, Center, VStack, HStack, Heading, Stack } from "@chakra-ui/layout";
import {useState} from 'react';
import {useEffect} from 'react';
import { Select } from '@chakra-ui/react';
import { Badge } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import countries from './coutries.js';

const GlobalCountry = () => {
  const [totalCases, setTotalCases] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [country, setCountry] = useState();
  const [isGlobal, setIsGlobal] = useState(true);
  
  useEffect(()=>{
    if(country == "Global" || country == undefined){
      return;
    }
    
    axios.get('https://api.covid19api.com/summary')
    .then(result=>{
      const countryData = (result.data.Countries).find((c)=> {
      	if(c.Country == country)
      		return c;
      });
      setTotalCases(countryData.TotalConfirmed);
      setTotalDeaths(countryData.TotalDeaths);
    })
    .catch(error=>console.log(error));
  }, [country]);
  
  useEffect(()=>{
    if(!isGlobal){
      return;
    }
    axios.get('https://api.covid19api.com/summary')
    .then(result=>{
      setTotalDeaths(result.data.Global.TotalDeaths);
      setTotalCases(result.data.Global.TotalConfirmed);
    })
    .catch(error=>console.log(error));
  }, [isGlobal]);
  
  const changeCountry = ()=>{
    const select = document.getElementById("select");
     setCountry(select[select.selectedIndex].value);
     if(country == "Global"){
        setIsGlobal(true);
      }else{
        setIsGlobal(false);
      }
  };
  
  return (
    <>
      <Header />
      <h1 align="center"> Global Status </h1>
      <Box>Total Cases: {totalCases}</Box>
      <Box>Total Deaths: {totalDeaths}</Box>
      <Center w="100vw">
        <HStack>
          <Flex alignContent="flex-start">
          <Box display='flex' alignItems='baseline'>
          <Box
            color='gray.500'
            fontWeight='semibold'
          >
            Select Country
          </Box>
          <Select id="select" placeholder='Global'>
                  {countries.map(country=><option value={country} key={country}>{country}</option>)}
                </Select>
        </Box>
        <Button colorScheme='blue' onClick={changeCountry}>Submit</Button>
          </Flex>
        </HStack>
      </Center>
    </>
  );
};

export default GlobalCountry;