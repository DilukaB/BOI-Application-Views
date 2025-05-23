import React from "react"
import FuelConsumptions from "./components/FuelConsumptions"
import EnvironmentExamination from "./components/EnvironmentExamination"
import WaterConsumption from "./components/WaterConsumption"
import ElectricityTable from "./components/ElectricityTable"
import ContactOfficer from "./components/ContactOfficer"
import InvestorsDeclaration from "./components/InvestorsDeclaration"


function App() {
   

  return (
    <>
      <FuelConsumptions/>
      <WaterConsumption/>
      <EnvironmentExamination/>
      <ElectricityTable/>
      <ContactOfficer/>
      <InvestorsDeclaration/>
      
    </>
  )
}

export default App
