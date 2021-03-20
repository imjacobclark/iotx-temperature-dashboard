import React, { FunctionComponent, useState, useEffect } from 'react';
import './App.css';

const fetchTemperatureData = (setTemperature: any) => {
  fetch("https://cors-container.herokuapp.com/https://p1ndfl7h7h.execute-api.eu-west-1.amazonaws.com/Prod/office").then(data=> data.json()).then(tempData => {
    setTemperature(tempData.temperature);
  });
}

const Temperature:FunctionComponent = () => {
  const [temperature, setTemperature] = useState(0.0)

  useEffect(() => {
    fetchTemperatureData(setTemperature);

    setInterval(() => {
      fetchTemperatureData(setTemperature);
    }, 10000)
  }, [temperature])

  return <>
    <div className="screen" style={{
      background: "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(217,5,61,1) 0%, rgba(36,185,255,1) " + ((temperature - 16) / (20 - 16)) * 100 + "%)"
    }}>
      <div className="centered">
        <h1>{temperature.toFixed(2)}<sup>oC</sup></h1>
        <h2>room: office</h2>
      </div>
    </div>
  </>
}

function App() {
  return <Temperature />
}

export default App;
