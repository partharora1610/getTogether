import { Check, X } from "lucide-react"
import React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const RightBar = () => {
  return (
    <div>
      <VendorList />
    </div>
  )
}

const GUESTS = [
  {
    name: "Mr Mukesh Bansal",
    rsvp: true,
  },
  {
    name: "Mr Nitin kamath",
    rsvp: false,
  },
  {
    name: "Wedding Venue Service",
    rsvp: true,
  },
  {
    name: "Mr Mukesh Bansal",
    rsvp: true,
  },
  {
    name: "Mr Nitin kamath",
    rsvp: false,
  },
  {
    name: "Wedding Venue Service",
    rsvp: true,
  },
  {
    name: "Mr Mukesh Bansal",
    rsvp: true,
  },
  {
    name: "Mr Nitin kamath",
    rsvp: false,
  },
  {
    name: "Wedding Venue Service",
    rsvp: true,
  },
  {
    name: "Mr Nitin kamath",
    rsvp: false,
  },
  {
    name: "Wedding Venue Service",
    rsvp: true,
  },
  {
    name: "Mr Mukesh Bansal",
    rsvp: true,
  },
  {
    name: "Mr Nitin kamath",
    rsvp: false,
  },
  {
    name: "Wedding Venue Service",
    rsvp: true,
  },
]

const VendorList = () => {
  return (
    <div className="bg-white py-4 px-2 rounded-sm">
      <div className="mb-6 pl-3  flex gap-2 items-start justify-between">
        <div>
          <h3 className="font-semibold text-2xl ">Event Guest</h3>
          <p className="text-lg text-gray-600">(198 guests)</p>
        </div>
        <div className="text-primary-400 font-semibold underline cursor-pointer">
          Manage
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full">
        {GUESTS.map((guest) => {
          return <GuestListItem guest={guest.name} rsvp={guest.rsvp} />
        })}
      </div>
    </div>
  )
}

const GuestListItem = ({ guest, rsvp }: { guest: string; rsvp: boolean }) => {
  return (
    <div className="flex gap-2 items-center px-2 py-3 rounded-md  ">
      <div className="min-w-[40px] min-h-[40px] bg-gray-800 rounded-full"></div>
      <div className="flex justify-between items-center w-full">
        <p className="text-base">{guest}</p>

        {rsvp ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-green-100 text-green-700 p-1 rounded-md cursor-pointer">
                  <Check size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Accepted</p>
                <p className="font-semibold">2 plus ones</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
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
      </div>
    </div>
  )
}

export default RightBar
