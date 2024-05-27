"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import axios from "axios"
import eventStore from "@/store/event-store"

const Page = () => {
  return (
    <div>
      <div className="mt-16">
        <RSVPCard />
      </div>

      <div className="mt-10">
        <h1 className="text-xl font-semibold mb-12">Recent Activity</h1>
        <div className="flex flex-col gap-12 justify-center items-center">
          {Array.from({ length: 2 }).map((_, index) => (
            <FeedCard key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

const FeedCard = () => {
  return (
    <div className="w-[800px] shadow-md rounded-lg px-4 py-8">
      <div className="flex gap-4 items-center">
        <div className="w-[48px] h-[48px] bg-gray-800 rounded-md"></div>
        <div>
          <p className="text-lg">
            Mr.Josh <span>Just confirmed his presence</span>
          </p>
          <p className="text-gray-500">2 hours ago</p>
        </div>
      </div>

      <div className="mt-2 mb-4">
        <p className="text-base">
          Very excited and happy to meet you on 24th this month, lets come and
          make this event a banger
        </p>
      </div>

      <Image
        className="m-auto"
        src="/thumbsup.png"
        alt="service_headers"
        width={700}
        height={400}
      />
    </div>
  )
}

const RSVPCard = () => {
  const { event } = eventStore()

  return (
    <div className="border-2 w-full border-gray-100 rounded-md flex gap-6 px-6 py-6 h-full">
      <div className="w-full">
        <div className="flex justify-between gap-10">
          <div>
            <h1 className="text-xl font-medium mb-2">{event?.title}</h1>
            <p className="text-lg text-gray-600">{event?.description}</p>
            {/* 
            <h1 className="">Location</h1>
            <p>Event Location</p>
            <p>Add to calender</p> */}
          </div>

          <div>
            <h1 className="text-3xl font-semibold">Date</h1>
            <p>Event Date</p>
          </div>
        </div>
        <div className="flex gap-16 mt-12 justify-end">
          <NegativeDialog />
          <PositiveDialog />
        </div>
      </div>
    </div>
  )
}

const PositiveDialog = () => {
  const [plusCount, setPlusCount] = React.useState(0)
  const { event } = eventStore()

  const handleConfirm = async () => {
    if (event === null) {
      return
    }

    const response = await axios.post(
      `http://localhost:8000/events/${event.id}/rsvp/accept`,
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
      <DialogTrigger className="hover:underline">
        <button className="hover:bg-primary-400/10 hover:border-white px-8 py-4 rounded-xl text-primary-400 border-2 border-primary-400">
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
              <div className="min-w-[40px] h-[40px] bg-gray-800 rounded-md"></div>
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
                value={plusCount}
                onChange={(e) => setPlusCount(Number(e.target.value))}
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

const NegativeDialog = () => {
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

            <div className="flex gap-8 mt-12 justify-end">
              <Button
                className="px-12 py-6"
                onClick={() => {
                  // console.log("I will not be able to make it")
                }}
              >
                Cancel
              </Button>

              <Button
                className="px-12 py-6"
                variant="secondary"
                onClick={() => {
                  // console.log("I will not be able to make it")
                }}
              >
                Yes, I'm sure
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Page
