"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import AddVendorForm from "@/components/forms/AddVendorForm"
import { NegativeTag, NeutralTag, PositiveTag } from "@/components/tags/tags"
import CreateContractForm, {
  ContractViewOnly,
} from "@/components/dialog/CreateContractForm"
import eventStore from "@/store/event-store"

const Page = () => {
  return (
    <div className="pl-2 pr-2">
      <VendorComponent />
    </div>
  )
}

const VendorComponent = () => {
  const [addingVendor, setAddingVendor] = React.useState(false)
  const { vendors } = eventStore()

  return (
    <div className="">
      <div className="mb-8 flex justify-between items-center">
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Manage Vendors</h2>
          <p className="text-base text-gray-500 mt-1">
            Manage your event details, vendors, and venue{" "}
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
      <div className="grid grid-cols-2 gap-20">
        <div className="flex flex-col gap-8">
          {vendors.map((v: any) => {
            const { id, name, email, phone, contract } = v.vendor
            return (
              <VendorCard
                key={v.id}
                name={name}
                vendorId={id}
                contract={contract}
              />
            )
          })}
        </div>
        <div>{addingVendor ? <AddVendorForm /> : <></>}</div>
      </div>
    </div>
  )
}

const VendorCard = ({
  name,
  vendorId,
  contract,
}: {
  name: string
  vendorId: string
  contract: any
}) => {
  return (
    <div className="border-2 border-gray-200 w-[600px] px-4 py-4 rounded-md">
      <div className="w-full">
        <div className="flex gap-4 items-start">
          <div className="min-w-[52px] h-[52px] bg-gray-500 rounded-md"></div>
          <div className="flex w-full justify-between">
            <div>
              <p className="text-lg">{name}</p>
              <p className="text-gray-500">
                Responsible for <span className="underline"> Catering </span>
              </p>
            </div>
            <div>
              {contract == null && <NeutralTag text={"No Contract"} />}
              {contract && contract.status == "SIGNED_BY_HOST" && (
                <NegativeTag text={"Contract Pending"} />
              )}

              {contract && contract.status == "SIGNED_BY_BOTH" && (
                <PositiveTag text={"Contract Signed"} />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6 gap-6">
          <Button size="sm" variant="outline">
            Chat
          </Button>

          {contract ? (
            <ContractViewOnly contract={contract} />
          ) : (
            <CreateContractForm vendorId={vendorId} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
