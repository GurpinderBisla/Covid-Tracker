import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, HashRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import CanadaProvincial from "./pages/CanadaProvincial";
import GlobalCountry from "./pages/GlobalCountry";
import CanadaVaccine from "./pages/CanadaVaccine";
import GlobalCompare from "./pages/GlobalCompare";
import Welcome from "./pages/Welcome";

ReactDOM.render(
  <ChakraProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="canada/provincial" element={<CanadaProvincial />} />
        <Route path="canada/vaccinetracker" element={<CanadaVaccine />} />
        <Route path="global/countrystats" element={<GlobalCountry />} />
        <Route path="global/comparecountries" element={<GlobalCompare />} />
      </Routes>
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
