import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Box } from "@chakra-ui/layout";
import DataCard from "./DataCard";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const blue = "blue.200";
const red = "red.400";
const green = "green.200";
const yellow = "purple.100";

const LineGraph = props =>{
    const [data, setData] = useState(null);
    const [totalCases, setTotalCases] = useState(0);
    const [totalDeaths, setTotalDeaths] = useState(0);
    const [newCases, setNewCases] = useState(0);
    const [newDeaths, setNewDeaths] = useState(0);

    
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: props.name,
        },
      },
    };
    
    useEffect(()=>{
        const makeLineGraph = async () => {
        try {
            const result = await axios.get("https://api.covid19api.com/dayone/country/"+props.country);
            const countryData = result.data;
            let labels = [];
            countryData.forEach((x) => {
                let date = new Date(x.Date);
                let fullDate = monthNames[date.getMonth()] + "," + date.getFullYear();
                labels.push(fullDate);
            });
            setTotalCases(countryData[countryData.length-1].Confirmed);
            setTotalDeaths(countryData[countryData.length-1].Deaths);
            setNewCases(countryData[countryData.length-2].Confirmed);
            setNewDeaths(countryData[countryData.length-2].Deaths);
            
            setData({
                labels,
                datasets: [
                    {
                      label: props.compare == "Confirmed" ? "Cases" : "Deaths",
                      data: countryData.map((x) => {
                        if(props.compare == "Confirmed"){
                          return x.Confirmed;
                        }else{
                          return x.Deaths;
                        }
                        }),
                      borderColor: props.compare == "Confirmed" ? 'rgb(53, 162, 235)' : 'rgb(255, 99, 132)',
                      backgroundColor: props.compare == "Confirmed" ? 'rgb(53, 162, 235, 0.5)' : 'rgba(255, 99, 132, 0.5)',
                    },
                ], 
            });
            
          } catch (e) {
            console.log(e);
          }
        };
        if(props.country != undefined){
            makeLineGraph();   
        }
    }, [props.country, props.compare]);

    if (data === null) {
        return <Box></Box>;
    } else {
        return (
          <Box>
            <DataCard data={totalCases} name="Total Cases" newData={totalCases - newCases} bgColor={blue}/>
            <DataCard data={totalDeaths} name="Total Deaths" newData={totalDeaths - newDeaths} bgColor={red}/>
            <Line options={options} data={data} />
          </Box>
        );
    }
}

export default LineGraph;
