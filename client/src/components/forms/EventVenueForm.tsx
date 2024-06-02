import { useState } from "react"
import { Label } from "../ui/label"
import appearanceStore from "@/store/appearance-store"
import { useToast } from "../ui/use-toast"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import axios from "axios"
import { useParams } from "next/navigation"

const EventVenueForm = () => {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")

  const { primaryColor } = appearanceStore()
  const { toast } = useToast()
  const params = useParams()
  const eventId = params.eventId as string

  const textClass = `text-[${primaryColor}]`

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/events/${eventId}/venue`,
        {
          name,
          address,
          zipCode,
          city,
          state,
        },
        {
          withCredentials: true,
        }
      )

      if (response.status === 200) {
        toast({
          title: "Venue Location Updated",
          description: "Venue Location has been updated successfully",
          variant: "default",
        })
      }
    } catch (error) {
      toast({
        title: "Error updating a Venue Location",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  }
  return (
    <div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <Label className="text-base">Venue Name</Label>
            <Input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="border-2 border-gray-200 w-full rounded-md text-lg p-2 py-6 mt-1"
              placeholder="Venue Location"
            />
          </div>

          <div>
            <Label className="text-base">Address</Label>
            <Input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="border-2 border-gray-200 w-full p-2 py-6 rounded-md mt-1"
              placeholder="Address"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="text-base ">City</Label>
            <Input
              onChange={(e) => setCity(e.target.value)}
              type="text"
              className="border-2 border-gray-200 w-full p-2 py-6 rounded-md mt-1"
              placeholder="City "
            />
          </div>
          <div>
            <Label className="text-base ">State</Label>
            <Input
              onChange={(e) => setState(e.target.value)}
              type="text"
              className="border-2 border-gray-200 w-full p-2 py-6 rounded-md mt-1"
              placeholder="State"
            />
          </div>
          <div>
            <Label className="text-base">Zip Code</Label>
            <Input
              type="text"
              onChange={(e) => setZipCode(e.target.value)}
              className="border-2 border-gray-200 w-full p-2 py-6 rounded-md mt-1"
              placeholder="Zip Code"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={onSubmit}>Save Venue Location</Button>
      </div>
    </div>
  )
}

export default EventVenueForm
