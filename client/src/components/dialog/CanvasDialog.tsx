"use client"
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
import { usePathname } from "next/navigation"
import axios from "axios"
import canvasStore from "@/store/create-canvas-store"
import eventStore from "@/store/event-store"
import { useToast } from "../ui/use-toast"

const CanvasDialog = () => {
  const [venuePlan, setVenuePlan] = React.useState<string>("")
  const { json } = canvasStore()
  const pathname = usePathname()
  const eventId = pathname.split("/")[2]
  const { addEventFloorPlan } = eventStore();
  const { toast } = useToast();

  const createVenuePlan = async () => {
    const response = await axios.post(
      `https://fueled-41xn.onrender.com/events/${eventId}/venue-plan`,
      {
        title: venuePlan,
        json: json,
      },
      {
        withCredentials: true,
      }
    )

    if (response.status == 200) {
      addEventFloorPlan(response.data.data)
      toast({
        title: "Venue Plan Added",
        description: "Venue Plan has been added successfully",
        variant: "default",
      })
    }
  }

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
              <Canvas create={true} />
              <div className="flex justify-end mt-6 ">
                <Button
                  onClick={() => {
                    createVenuePlan()
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
  title,
  json,
}: {
  title: string
  json: string
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
              <Canvas create={false} loadedJson={json} />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CanvasDialog
