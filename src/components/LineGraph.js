import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

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

const LineGraph = props =>{
    const [data, setData] = useState(null);
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
            
            setData({
                labels,
                datasets: [
                    {
                      label: 'Cases',
                      data: countryData.map((x) => x.Confirmed),
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
    }, [props.country]);

    if (data === null) {
        return <Box></Box>;
    } else {
        return (
          <Box>
            <Line options={options} data={data} />
          </Box>
        );
    }
}


export default LineGraph;
