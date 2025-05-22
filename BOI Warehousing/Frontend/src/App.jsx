 import React from "react"
import Machenary from "./components/Machenary"
import WaterConsumptionTable from "./components/WaterConsumptionTable"
import SolidWaste from "./components/SolidWaste"
import Sewage from "./components/Sewage"
import ElectricityTable from "./components/ElectricityTable"
import ContactOfficer from "./components/ContactOfficer"
import InvestorsDeclaration from "./components/InvestorsDeclaration"
 

 function App() {

  return (
    <>
       
      <Machenary/> 
      <WaterConsumptionTable/>
      <SolidWaste/>
      <Sewage/>
      <ElectricityTable/>
      <ContactOfficer/>
      <InvestorsDeclaration/>

    </>
  )
}

export default App
