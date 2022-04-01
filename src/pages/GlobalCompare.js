import Header from "../components/Header";
import LineGraph from "../components/LineGraph";
import Footer from "../components/Footer";
import countries from "./countries";


import { Center, Grid, Box, Heading } from "@chakra-ui/layout";
import { Select, Button } from "@chakra-ui/react";
import { useState} from "react";

const GlobalCompare = () => {
  const [firstCountry, setFirstCountry] = useState();
  const [secondCountry, setSecondCountry] = useState();
  const [compare, setCompare] = useState("Confirmed");

  const changeCountryOne = () => {
    const select = document.getElementById("firstSelect").value;
    setFirstCountry(select);
  };

  const changeCountrySecond = () => {
    const select = document.getElementById("secondSelect").value;
    setSecondCountry(select);
  };

  const changeCompare = () => {
    let x = document.getElementById("compareSelect").value;
    if (x === "deaths") {
      setCompare("Deaths");
    } else {
      setCompare("Confirmed");
    }
  };
  
  const footer = ()=>{
    let first = document.getElementById("firstSelect");
    let second = document.getElementById("secondSelect");
    
    if(first!=null && second!=null){
      if(first.value === "none" && second.value === "none"){
        return (<Box pos="fixed" bottom="0" w="100%">
          <Footer />
        </Box>);
      }else{
        return <Footer />;
      }
    }
  };

  return (
    <>
      <Header />
      <Heading align="center" m={[2, 5]}>
        Compare Countries
      </Heading>
      <Center>
        <Box display="flex" alignItems="center" m={[2, 10]}>
          <label>Compare using: </label>
          <Select id="compareSelect" maxW="100px">
            <option value="cases">Cases</option>
            <option value="deaths">Deaths</option>
          </Select>
          <Button onClick={changeCompare}>Select</Button>
        </Box>
      </Center>

      <Grid templateColumns="repeat(2, 1fr)" gap={6} m={[2, 3]}>
        <Box p={[5, 1]}>
          <label>Select Country</label>
          <Select id="firstSelect">
            <option value={"none"}></option>
            {countries.map((country) => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
          </Select>
          <Button colorScheme="blue" onClick={changeCountryOne}>
            Select
          </Button>
          <LineGraph
            country={firstCountry}
            name={firstCountry}
            compare={compare}
            p={[5, 10]}
            cards={true}
          />
        </Box>
        <Box p={[5, 1]}>
          <label>Select Country</label>
          <Select id="secondSelect">
            <option value={"none"}></option>
            {countries.map((country) => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
          </Select>
          <Button colorScheme="blue" onClick={changeCountrySecond}>
            Select
          </Button>
          <LineGraph
            country={secondCountry}
            name={secondCountry}
            compare={compare}
            p={[5, 10]}
            cards={true}
          />
        </Box>
      </Grid>
      {footer()}
    </>
  );
};

export default GlobalCompare;
