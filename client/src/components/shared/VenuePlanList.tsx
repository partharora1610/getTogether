import React from "react"
import CanvasDialog, { ViewFloorPlanCanvas } from "../dialog/CanvasDialog"
import eventStore from "@/store/event-store"

interface VenuePlan {
  id: string
  title: string
  floorPlanJson: string
}

const VenuePlanList = () => {
  const { eventFloorPlan } = eventStore()

  return (
    <div className="flex gap-6 mt-4 mb-4">
      {eventFloorPlan?.map((venuePlan: VenuePlan) => {
        return (
          <ViewFloorPlanCanvas
            title={venuePlan.title}
            json={venuePlan.floorPlanJson}
            key={venuePlan.id}
          />
        );
      })}

      <CanvasDialog />
    </div>
  )
}

export default VenuePlanList
