import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"
import { Button } from "../ui/button"
import Image from "next/image"
import eventStore from "@/store/event-store"

const RejectRSVPDialog = () => {
  const { event } = eventStore()

  const rsvpDeclineHandler = async () => {
    if (event === null) {
      return
    }

    const response = await axios.post(
      `http://localhost:8000/events/${event.id}/rsvp/decline`,
      {},
      {
        withCredentials: true,
      }
    )

    if (response.status === 200) {
      console.log("RSVP Confirmed")
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="px-4 py-6 hover:underline">
        I will not be able to make it
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl mb-1">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>
            {/* <p className="text-base mb-8">
                  If you are not sure about your presence, you can always confirm
                </p> */}

            <div className="flex gap-4 items-center mb-8 mt-2">
              <div className="min-w-[40px] h-[40px] bg-gray-800 rounded-md"></div>
              <div className="text-base">
                I will be very sad if you dont make it. If you are not sure
                about your presence, you can always confirm
              </div>
            </div>

            <div className="flex items-center justify-center  mb-4">
              <Image
                src="/images.jpeg"
                alt="service_headers"
                width={200}
                height={200}
              />
            </div>

            <div className="flex gap-8 mt-16 justify-end ">
              <Button className="px-12 py-4" onClick={rsvpDeclineHandler}>
                Yes, I'm sure
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default RejectRSVPDialog
