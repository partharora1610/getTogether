import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Canvas from "../canvas/canvas"
import { Button } from "../ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "../ui/input"

const CanvasDialog = ({
  addVenuePlan,
}: {
  addVenuePlan: React.Dispatch<
    React.SetStateAction<{ title: string; json: string }[]>
  >
}) => {
  const [venuePlan, setVenuePlan] = React.useState<string>("")

  return (
    <Dialog>
      <DialogTrigger className="border-2 border-dashed border-gray-200 text-gray-500 px-4 py-4 rounded-md cursor-pointer">
        Add Venue Floor Plan
      </DialogTrigger>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle className="mx-12 text-xl mb-4">
            Add Venue Floor Plans
          </DialogTitle>
          <DialogDescription>
            <div className="mx-12">
              <div className="mb-12">
                <Label htmlFor="venue_plan" className="text-base">
                  Venue Plan Title
                </Label>

                <Input
                  onChange={(e) => setVenuePlan(e.target.value)}
                  placeholder="For example: Floor 1, Floor 2, etc."
                  className="text-base mt-2"
                />
              </div>
              <Canvas />
              <div className="flex justify-end mt-6 ">
                <Button
                  onClick={() => {
                    addVenuePlan((prev) => [
                      ...prev,
                      {
                        title: venuePlan,
                        json: "",
                      },
                    ])
                  }}
                >
                  Add Floor Plan
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export const ViewFloorPlanCanvas = ({
  plan: { title, json },
}: {
  plan: { title: string; json: string }
}) => {
  return (
    <Dialog>
      <DialogTrigger className="border-2 border-dashed border-gray-200 text-gray-500 px-4 py-4 rounded-md cursor-pointer">
        {title}
      </DialogTrigger>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle className="mx-12 text-xl mb-4">
            Add Venue Floor Plans
          </DialogTitle>
          <DialogDescription>
            <div className="mx-12">
              <Canvas />
              {/* <div className="mb-12">
                <Label htmlFor="venue_plan" className="text-base">
                  Venue Plan Title
                </Label>

                <Input
                  placeholder="For example: Floor 1, Floor 2, etc."
                  className="text-base mt-2"
                />
              </div> */}
              {/* <div className="flex justify-end mt-6 ">
                <Button
                  onClick={() => {
                    addVenuePlan((prev) => [
                      ...prev,
                      {
                        title: "Floor 1 Right Side",
                        json: "",
                      },
                    ])
                  }}
                >
                  Add Floor Plan
                </Button>
              </div> */}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CanvasDialog
