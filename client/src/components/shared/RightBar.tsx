"use client"
import { Check, Dot, X } from "lucide-react"
import React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import eventStore from "@/store/event-store"
import appearanceStore from "@/store/appearance-store"
import { useParams } from "next/navigation"
import Link from "next/link"

const RightBar = () => {
  return (
    <div>
      <GuestList />
    </div>
  )
}

const GuestList = () => {
  const { event, loading } = eventStore()
  const { primaryColor } = appearanceStore()
  const textClass = `text-[${primaryColor}]`
  const params = useParams()
  const eventId = params.eventId as string

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white py-4 px-2 rounded-sm">
      <div className="mb-6 pl-3  flex gap-2 items-start justify-between">
        <div>
          <h3 className="font-semibold text-xl ">Event Guest</h3>
          <p className="text-lg text-gray-600">
            ({event?.guests.length} guests)
          </p>
        </div>
        <Link href={`/event/${eventId}/guest-list`}>
          <div
            className={`${textClass} font-semibold underline cursor-pointer`}
          >
            Manage
          </div>
        </Link>
      </div>
      {/* <p>{JSON.stringify(event?.guests)}</p> */}

      {/* <p>{event?.guests == 0 ? "No Guest" : "Hello"}</p> */}

      <div className="flex flex-col gap-6 w-full">
        {event?.guests.map((guest: any) => (
          <GuestListItem
            key={guest.name}
            guest={guest.guest.name}
            rsvp={guest.guest.rsvps}
            plusOnes={guest.guest.plusOnes}
          />
        ))}
      </div>
    </div>
  )
}

const GuestListItem = ({
  guest,
  rsvp,
  plusOnes,
}: {
  guest: string
  rsvp: any
  plusOnes: any
}) => {
  return (
    <div className="flex gap-2 items-center px-2 py-3 rounded-md  ">
      <div className="min-w-[40px] min-h-[40px] bg-gray-800 rounded-full"></div>
      <div className="flex justify-between items-center w-full">
        <p className="text-base">{guest}</p>

        {rsvp.status == "PENDING" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-gray-200 text-gray-700 p-1 rounded-md cursor-pointer">
                  <Dot size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pending</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {rsvp.status == "CANCELLED" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-red-100 text-red-700 p-1 rounded-md cursor-pointer">
                  <X size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rejected</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {rsvp.status == "CONFIRMED" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-green-100 text-green-700 p-1 rounded-md cursor-pointer">
                  <Check size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Accepted</p>
                <p className="font-semibold">{plusOnes} plus ones</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  )
}

export default RightBar
