"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import AddVendorForm from "@/components/forms/AddVendorForm"
import CanvasDialog from "@/components/dialog/CanvasDialog"
import VenuePlanList from "@/components/shared/VenuePlanList"
import EventVenueForm from "@/components/forms/EventVenueForm"
import { NegativeTag } from "@/components/tags/tags"

const VENDORS = [
  {
    id: 1,
    name: "Binod Planner",
    service: "Type 1",
    contact: "Contact 1",
    email: "Email 1",
    address: "Address 1",
  },
  {
    id: 2,
    name: "Binod Catering Service",
    service: "Type 1",
    contact: "Contact 1",
    email: "Email 1",
    address: "Address 1",
  },
  {
    id: 2,
    name: "Binod Decoration Services",
    service: "Type 1",
    contact: "Contact 1",
    email: "Email 1",
    address: "Address 1",
  },
]

const Page = () => {
  const [addingVendor, setAddingVendor] = React.useState(false)

  return (
    <div>
      <div className="mb-12">
        <HeadingH2 title={"About the event"} />
        <p>Very Basic Form</p>
        <p>TODO:FORM and HOST MESSAGE</p>
      </div>

      <div className="mb-12">
        <div>
          <HeadingH2 title={"Venue Details & Plan"} />
          <p>TODO:VENUE UPDATE IN THE DB</p>
        </div>

        <div className="mt-6">
          <EventVenueForm />
          <VenuePlanList />
        </div>
      </div>

      <div className="mb-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <HeadingH2 title={"Event Vendors"} />
            <p className="text-gray-500 mt-1 mb-4">
              Manage & Add event vendors. Currently You have{" "}
              <span className="underline cursor-pointer">3 vendors</span> have
              not accepted the invitation.
            </p>
          </div>
          <div>
            <Button
              size="sm"
              variant="default"
              onClick={() => setAddingVendor(!addingVendor)}
            >
              {!addingVendor ? (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline-block mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <p>Add Vendor</p>
                </div>
              ) : (
                <div className="flex gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline-block mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    ></path>
                  </svg>
                  <div>
                    <p>Close</p>
                  </div>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/*  */}
        <div className="grid grid-cols-2 gap-20">
          <div className="flex flex-col gap-8">
            {VENDORS.map((vendor) => (
              <VendorCard key={vendor.id} />
            ))}
          </div>
          <div>{addingVendor ? <AddVendorForm /> : <></>}</div>
        </div>
      </div>
      {/*  */}
    </div>
  )
}

const VendorCard = () => {
  return (
    <div className="border-2 border-gray-200 w-[600px] px-4 py-6 rounded-md">
      <div className="w-full">
        <div className="flex gap-4 items-start">
          <div className="min-w-[52px] h-[52px] bg-gray-500 rounded-md"></div>
          <div className="flex w-full justify-between">
            <div>
              <p className="text-lg">Binod Planner Company</p>
              <p className="text-gray-500">
                Responsible for <span className="underline"> Catering </span>
              </p>
            </div>
            <div>
              {/* <PositiveTag text={"Contract Signed"} /> */}
              <NegativeTag text={"Contract Pending"} />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4 gap-6">
          <Button size="sm" variant="outline">
            Chat
          </Button>

          <Button size="sm" variant="outline">
            Send Contract Reminder
          </Button>
        </div>
      </div>
    </div>
  )
}

const HeadingH2 = ({ title }: { title: string }) => {
  return <h2 className="text-xl font-medium capitalize">{title}</h2>
}

export default Page
