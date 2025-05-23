import React from "react"
import FuelConsumptions from "./components/FuelConsumptions"
import EnvironmentExamination from "./components/EnvironmentExamination"
import WaterConsumption from "./components/WaterConsumption"
import ElectricityTable from "./components/ElectricityTable"


function App() {
   

  return (
    <>
      <FuelConsumptions/>
      <WaterConsumption/>
      <EnvironmentExamination/>
      <ElectricityTable/>
      
    </>
  )
}

export default App
