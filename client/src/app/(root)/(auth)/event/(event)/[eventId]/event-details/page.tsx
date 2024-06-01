"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import VenuePlanList from "@/components/shared/VenuePlanList"
import EventVenueForm from "@/components/forms/EventVenueForm"
import { Label } from "@/components/ui/label"
import appearanceStore from "@/store/appearance-store"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useParams } from "next/navigation"
import eventStore from "@/store/event-store"

const Page = () => {
  return (
    <div className="pl-2 pr-2">
      <div className="mt-10">
        <h2 className="text-2xl font-semibold">Event Details</h2>
        <p className="text-base text-gray-500 mt-1">
          Manage your event details, vendors, and venue{" "}
        </p>
      </div>
      <AccordianComponent />
    </div>
  )
}

const AccordianComponent = () => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="host_message"
      className="flex flex-col gap-4"
    >
      <AccordionItem value="host_message">
        <AccordionTrigger className={`text-xl`}>
          Drop a message for all guests
        </AccordionTrigger>
        <AccordionContent>
          <HostMessageForm />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="venue_location">
        <AccordionTrigger className="text-xl">Venue Location </AccordionTrigger>
        <AccordionContent>
          <EventVenueForm />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="venue_floor_plan">
        <AccordionTrigger className="text-xl">
          Venue Floor Plan
        </AccordionTrigger>
        <AccordionContent>
          <VenuePlanList />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

const HostMessageForm = () => {
  const { eventHostMessage, addEventHostMessage } = eventStore()
  const [message, setMessage] = React.useState(eventHostMessage?.message)
  const { primaryColor } = appearanceStore()
  const { toast } = useToast()
  const params = useParams()
  const eventId = params.eventId as string

  const textClass = `text-[${primaryColor}]`

  const onSubmit = async () => {
    setMessage("")

    if (eventHostMessage == null) {
      const response = await axios.post(
        `http://localhost:8000/events/${eventId}/host-message`,
        {
          message,
        },
        {
          withCredentials: true,
        }
      )

      if (response.status === 200) {
        addEventHostMessage(response.data.data)
        toast({
          title: "Message Updated",
          description: "Message has been updated successfully",
          variant: "default",
        })
      } else {
        toast({
          title: "Error updating a message",
          description: "Something went wrong",
          variant: "destructive",
        })
      }
    } else {
      const response = await axios.put(
        `http://localhost:8000/events/${eventId}/host-message`,
        {
          message,
        },
        {
          withCredentials: true,
        }
      )

      if (response.status === 200) {
        addEventHostMessage(response.data.data)
        toast({
          title: "Message Updated",
          description: "Message has been updated successfully",
          variant: "default",
        })
      } else {
        toast({
          title: "Error updating a message",
          description: "Something went wrong",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <Label className="text-base">Message</Label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="border-2 border-gray-200 w-full p-2 text-lg rounded-md"
            placeholder="Drop a message for all guests"
          ></textarea>
        </div>
        <div className="flex justify-between">
          <Label className={`text-base`}>Upload Invite Video</Label>
          <div
            className={`${textClass} font-semibold underline cursor-pointer`}
          >
            Upload
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button variant="default" className="" onClick={onSubmit}>
          {eventHostMessage == null
            ? "Add Host Message"
            : "Update Host Message"}
        </Button>
      </div>
    </div>
  )
}

export default Page
