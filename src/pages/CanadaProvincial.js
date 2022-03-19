import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const CanadaProvincial = () => {
  const [stats, setStats] = useState({});

  //Get stats on inital loading of the page
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get("https://api.covid19tracker.ca/summary");
        const data = result.data.data[0];

        setStats({
          new_cases: data.change_cases,
          new_deaths: data.change_fatalities,
          new_hospitalizations: data.change_hospitalizations,
          new_recoveries: data.change_recoveries,
          cases: data.total_cases,
          deaths: data.total_fatalities,
          hospitalizations: data.total_hospitalizations,
          recoveris: data.total_recoveries,
        });
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Header />
      <h1>TODO CANADA PROVINCIAL</h1>
    </div>
  );
};

export default CanadaProvincial;
