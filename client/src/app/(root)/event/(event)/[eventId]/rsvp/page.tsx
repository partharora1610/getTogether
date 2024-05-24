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

const Page = () => {
  return (
    <div>
      <div className="mt-16">
        <RSVPCard />
      </div>
    </div>
  )
}

const RSVPCard = () => {
  return (
    <div className="border-2 w-full border-gray-100 rounded-md flex gap-6 px-6 py-6 h-full">
      <Image
        className="rounded-md"
        src="https://img.freepik.com/free-photo/fresh-gourmet-meal-beef-taco-salad-plate-generated-by-ai_188544-13382.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1715212800&semt=ais"
        alt="service_headers"
        width={400}
        height={400}
      />

      <div className="w-full">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Raj Wedding Night</h1>
            <p>Event Description</p>
            <h1 className="">Location</h1>
            <p>Event Location</p>
            <p>Add to calender</p>
          </div>

          <div>
            <h1 className="text-3xl font-semibold">Date</h1>
            <p>Event Date</p>
          </div>
        </div>
        <div className="flex gap-16 mt-12 justify-end">
          {/* <Button className=" px-4 py-6" variant="link" onClick={() => {}}> */}
          <NegativeDialog />
          {/* </Button> */}
          <Button className="px-12 py-6" onClick={() => {}}>
            RSVP
          </Button>
        </div>
      </div>
    </div>
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
            <p className="text-base mb-8">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </p>

            {/* Change the position here !!! */}
            <div className="flex items-center bg-gray-200 mb-4">
              <Image
                src="/images.jpeg"
                alt="service_headers"
                width={200}
                height={200}
              />
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-[40px] h-[40px] bg-gray-400 rounded-md"></div>
              <div>I will be very sad!!!</div>
            </div>

            <div className="flex gap-8 mt-12 justify-end">
              <Button
                className="px-12 py-6"
                onClick={() => {
                  console.log("I will not be able to make it")
                }}
              >
                Cancel
              </Button>

              <Button
                className="px-12 py-6"
                variant="secondary"
                onClick={() => {
                  console.log("I will not be able to make it")
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
/**
 * Personalize Invite
 * Special Hosr Message
 * FE Settings
 * Integration with google calender
 *
 *
 *
 *
 *
 *
 *
 * BE
 * Chats
 */
