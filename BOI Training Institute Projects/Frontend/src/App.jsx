 import React from "react"
import LocationForm from "./components/LocationForm"
import EquipmentTable from "./components/EquipmentTable"
import WaterConsumptionTable from "./components/WaterConsumptionTable"
import FireRisk from "./components/FireRisk"
import ElectricityTable from "./components/ElectricityTable"


function App() {
  

  return (
    <>
      <LocationForm/>
      <EquipmentTable/>
      <WaterConsumptionTable/>
      <FireRisk/>
      <ElectricityTable/>
    </>
  )
}

export default App
