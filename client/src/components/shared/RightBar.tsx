import React from "react"
import { Button } from "../ui/button"

const RightBar = () => {
  return (
    <div>
      <div className="flex items-center justify-center mt-4 mb-8">
        <Button className="tesxt-base px-6 py-4">
          Manage Event Guest / Vendors
        </Button>
      </div>
      <VendorList />
    </div>
  )
}

const GUESTS = [
  "Mr Mukesh Bansal",
  "Mr Nitin kamath",
  "Wedding Venue Service",
  "Crazy Events",
  "Crazy Events",
  "Crazy Events",
  "Crazy Events",
  "Crazy Events",
  "Crazy Events",
  "Crazy Events",
  "Crazy Events",
  "Crazy Events",
  "Crazy Events",
  "Crazy Events",
  "Crazy Events",
  "Crazy Events",
  "Crazy Events",
]

const VendorList = () => {
  return (
    <div className="bg-white py-4 px-2 rounded-sm">
      <h3 className="font-medium text-xl mb-4 pl-3">Event Guest</h3>
      <div className="flex flex-col gap-4">
        {GUESTS.map((vendor) => {
          return (
            <div className="flex gap-2 items-center px-2 py-3 rounded-md">
              <div className="w-[48px] h-[48px] bg-gray-800 rounded-full"></div>
              <div>
                <p className="text-base">{vendor}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RightBar
