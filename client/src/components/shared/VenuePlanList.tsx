import React from "react"
import CanvasDialog, { ViewFloorPlanCanvas } from "../dialog/CanvasDialog"

interface VenuePlan {
  title: string
  json: string
}

const VenuePlanList = () => {
  const [venuePlans, setVenuePlans] = React.useState([
    {
      title: "Floor 1",
      json: "",
    },
    {
      title: "Floor 2",
      json: "",
    },
    {
      title: "Floor 3",
      json: "",
    },
  ])

  return (
    <div className="flex gap-6 ">
      {venuePlans.map((venuePlan: VenuePlan) => {
        return <ViewFloorPlanCanvas plan={venuePlan} />
      })}

      <CanvasDialog addVenuePlan={setVenuePlans} />
    </div>
  )
}

export default VenuePlanList
