 import React from "react"
import Machenary from "./components/Machenary"
import WaterConsumptionTable from "./components/WaterConsumptionTable"
import SolidWaste from "./components/SolidWaste"
import Sewage from "./components/Sewage"
import ElectricityTable from "./components/ElectricityTable"
import ContactOfficer from "./components/ContactOfficer"
import InvestorsDeclaration from "./components/InvestorsDeclaration"
import Noise_Hazardous_FireRisk from "./components/Noise_Hazardous_FireRisk"
 

 function App() {

  return (
    <>
       
      <Machenary/> 
      <WaterConsumptionTable/>
      <SolidWaste/>
      <Sewage/>
       <Noise_Hazardous_FireRisk/>
      <ElectricityTable/>
      <ContactOfficer/>
      <InvestorsDeclaration/>
     

    </>
  )
}

export default App
