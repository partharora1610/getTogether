import { useState } from "react"
import { Label } from "../ui/label"
import appearanceStore from "@/store/appearance-store"
import { useToast } from "../ui/use-toast"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const EventVenueForm = () => {
  const [message, setMessage] = useState("")
  const { primaryColor } = appearanceStore()
  const { toast } = useToast()

  const textClass = `text-[${primaryColor}]`

  return (
    <div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <Label className="text-base">Venue Name</Label>
            <Input
              type="text"
              className="border-2 border-gray-200 w-full rounded-md text-lg p-2 py-6 mt-1"
              placeholder="Venue Location"
            />
          </div>

          <div>
            <Label className="text-base">Address</Label>
            <Input
              type="text"
              className="border-2 border-gray-200 w-full p-2 py-6 rounded-md mt-1"
              placeholder="Address"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="text-base ">Zip Code</Label>
            <Input
              type="text"
              className="border-2 border-gray-200 w-full p-2 py-6 rounded-md mt-1"
              placeholder="Zip Code"
            />
          </div>
          <div>
            <Label className="text-base ">Zip Code</Label>
            <Input
              type="text"
              className="border-2 border-gray-200 w-full p-2 py-6 rounded-md mt-1"
              placeholder="Zip Code"
            />
          </div>
          <div>
            <Label className="text-base">Zip Code</Label>
            <Input
              type="text"
              className="border-2 border-gray-200 w-full p-2 py-6 rounded-md mt-1"
              placeholder="Zip Code"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button>Save Venue Location</Button>
      </div>
    </div>
  )
}

export default EventVenueForm
