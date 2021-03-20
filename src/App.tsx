import React, { FunctionComponent, useState, useEffect } from 'react';
import './App.css';

const fetchTemperature = (
  temperature: Number, 
  setTemperature: React.Dispatch<number>, 
  setIncreasing: React.Dispatch<String>,
) => {
  fetch("https://cors-container.herokuapp.com/https://p1ndfl7h7h.execute-api.eu-west-1.amazonaws.com/Prod/office").then(data=> data.json()).then(tempData => {
    tempData.temperature > temperature ? setIncreasing("🔼") : setIncreasing("🔽");
    setTemperature(tempData.temperature);
  });
}

const Temperature:FunctionComponent = () => {
  const [temperature, setTemperature] = useState<number>(0.0)
  const [increasing, setIncreasing] = useState<String>("");

  useEffect(() => {
    const interval = setInterval(() => fetchTemperature(temperature, setTemperature, setIncreasing), 10000);

    return () => clearInterval(interval);
  }, [temperature, increasing])

  return <>
    <div className="screen" style={{
      background: "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(217,5,61,1) 0%, rgba(36,185,255,1) " + ((temperature - 15) / (19 - 15)) * 100 + "%)"
    }}>
      <div className="centered">
        <h1>{increasing} {temperature.toFixed(2)}<sup>oC</sup></h1>
        <h2>🏠 room: office</h2>
      </div>
    </div>
  </>
}

function App() {
  return <Temperature />
}

export default App;
