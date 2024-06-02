import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import appearanceStore from "@/store/appearance-store"
import axios from "axios"
import { useState } from "react"
import { Button } from "../ui/button"
import { Label } from "@radix-ui/react-label"
import eventStore from "@/store/event-store"
import { Input } from "../ui/input"
import HostIcon from "../shared/HostIcon"

const AccepRSVPDialog = () => {
  const { primaryColor } = appearanceStore()
  const bgClass = `bg-[${primaryColor}]/10 `
  const textClass = `text-[${primaryColor}]`
  const borderClass = `border-[${primaryColor}]`
  const [plusOnes, setPlusOnes] = useState(0)
  const { event } = eventStore()

  const handleConfirm = async () => {
    if (event === null) {
      return
    }

    const response = await axios.post(
      `https://fueled-41xn.onrender.com:8000/events/${event.id}/rsvp/accept`,
      {
        plusOnes: String(plusOnes),
      },
      {
        withCredentials: true,
      }
    )

    if (response.status === 200) {
      console.log("RSVP Confirmed")
    }
  }

  /**
   * {"id":"clwwvrej800081cgtcrw47or6","status":"CONFIRMED","eventId":"clwwfive10002ttpsj3w8unnj","guestId":"clwwvraof00071cgtbpm44mgb","createdAt":"2024-06-02T01:45:45.045Z","updatedAt":"2024-06-02T01:53:27.706Z"}
   */
  // const guestRSVP = rsvp.find((r: any) => r.guestId === currentRole.id)

  return (
    <Dialog>
      <DialogTrigger className="hover:underline">
        <button
          className={`hover:${bgClass} hover:border-white px-6 py-3 rounded-xl ${textClass} border-2 ${borderClass}`}
        >
          Count me in
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl mb-4">
            Confirm your presence
          </DialogTitle>

          <DialogDescription>
            <div className="text-base mb-10 flex items-center gap-4 ">
              <div className="min-w-[60px] h-[60px] bg-gray-50 rounded-md">
                <HostIcon />
              </div>

              <div className="text-gray-900">
                Thankyou so much for confirming you presence, lets make this
                event a special one for everyone
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <Label className="text-base text-gray-800">
                  Number of guests
                </Label>
                <p>We dont need an exact number, approx will work</p>
              </div>

              <Input
                className="w-[100px]"
                min={0}
                max={10}
                type="number"
                value={plusOnes}
                onChange={(e) => setPlusOnes(Number(e.target.value))}
              />
            </div>

            <div className="flex gap-8 mt-12 justify-end">
              <Button
                className="px-8 py-4"
                variant="secondary"
                onClick={handleConfirm}
              >
                Confirm my RSVP
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AccepRSVPDialog
