import React from "react" 
import WaterConsumption from "./components/WaterConsumption"
import EnvironmentalExamination from "./components/EnvironmentalExamination"
import NoiseVibration from "./components/NoiseVibration"
import ContactOfficer from "./components/ContactOfficer"
import InvestorsDeclaration from "./components/InvestorsDeclaration"

function App() {
 

  return (
    <>
       <WaterConsumption/>
       <EnvironmentalExamination/>
       <NoiseVibration/>
       <ContactOfficer/>
       <InvestorsDeclaration/>
    </>
  )
}

export default App
