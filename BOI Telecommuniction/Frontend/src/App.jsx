import React from "react" 
import WaterConsumption from "./components/WaterConsumption"
import EnvironmentalExamination from "./components/EnvironmentalExamination"
import NoiseVibration from "./components/NoiseVibration"
import ContactOfficer from "./components/ContactOfficer"
import InvestorsDeclaration from "./components/InvestorsDeclaration"
import ElectricityTable from "./components/ElectricityTable"
import FuelConsumptions from "./components/FuelConsumptions"
import LocationForm from "./components/LocationForm"

function App() {
 

  return (
    <>
    <LocationForm/>
       <FuelConsumptions/>
       <WaterConsumption/>
       <EnvironmentalExamination/>
       <NoiseVibration/>
        <ElectricityTable/>
       <ContactOfficer/>
       <InvestorsDeclaration/>
      
    </>
  )
}

export default App
