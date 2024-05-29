"use client"
import { Button } from "@/components/ui/button"
import { PRIMARYCOLOR } from "@/constants/primary-color"
import appearanceStore from "@/store/appearance-store"
import { useParams } from "next/navigation"
import React, { useState } from "react"

const Page = () => {
  return (
    <div>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold">Customize your event page</h2>
        <p className="text-base text-gray-500 mt-1">
          Create special theme for your special event
        </p>
      </div>

      <div className="flex flex-col gap-20 mt-8">
        <PrimaryColorSelection />
        <EventPageCoverImage />
      </div>
    </div>
  )
}

const PrimaryColorSelection = () => {
  const { updateAppearance, primaryColor } = appearanceStore()
  const [selectedColor, setSelectedColor] = useState<any>(primaryColor)
  const params = useParams()
  const eventId = params.eventId as string

  const changePrimaryColorHandler = async () => {
    updateAppearance(eventId, selectedColor)
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-medium">Select Primary Color</h1>
            <p className="text-gray-500">
              A lighter verison of the primary color will be used for
              backgrounds
            </p>
          </div>
          <div className="flex gap-4">
            <div
              className={`w-12 h-12 rounded-md bg-[${selectedColor.color}]`}
            ></div>
            <div
              className={`w-12 h-12 rounded-md bg-[${selectedColor.color}]/10`}
            ></div>
          </div>
        </div>
      </div>

      {/* bg-[#dc0e63] */}
      {/* bg-[#FF6B00] */}
      {/* bg-[#ae3ec9] */}
      {/* bg-[#f03e3e] */}
      {/* bg-[#1971c2] */}
      {/* bg-[#099268] */}
      {/* bg-[#0c8599] */}
      {/* hover:bg-[#dc0e63] */}
      {/* hover:bg-[#FF6B00] */}
      {/* hover:bg-[#ae3ec9] */}
      {/* hover:bg-[#f03e3e] */}
      {/* hover:bg-[#1971c2] */}
      {/* hover:bg-[#099268] */}
      {/* hover:bg-[#0c8599] */}

      {/* hover:bg-[#dc0e63]/10 */}
      {/* hover:bg-[#FF6B00]/10 */}
      {/* hover:bg-[#ae3ec9]/10 */}
      {/* hover:bg-[#f03e3e]/10 */}
      {/* hover:bg-[#1971c2]/10 */}
      {/* hover:bg-[#099268]/10 */}
      {/* hover:bg-[#0c8599]/10 */}

      {/* bg-[#ae3ec9]/10 */}
      {/* bg-[#dc0e63]/10 */}
      {/* bg-[#FF6B00]/10 */}
      {/* bg-[#f03e3e]/10 */}
      {/* bg-[#1971c2]/10 */}
      {/* bg-[#099268]/10 */}
      {/* bg-[#0c8599]/10 */}

      {/* bg-[#ae3ec9]/10 */}
      {/* bg-[#dc0e63]/10 */}
      {/* bg-[#FF6B00]/10 */}
      {/* bg-[#f03e3e]/10 */}
      {/* bg-[#1971c2]/10 */}
      {/* bg-[#099268]/10 */}
      {/* bg-[#0c8599]/10 */}

      {/* bg-[#ae3ec9]/10 */}
      {/* bg-[#dc0e63]/10

      {/* text-[#dc0e63] */}
      {/* text-[#FF6B00] */}
      {/* text-[#ae3ec9] */}
      {/* text-[#f03e3e] */}
      {/* text-[#1971c2] */}
      {/* text-[#099268] */}
      {/* text-[#0c8599] */}

      {/* bg-[#ae3ec9]/10 */}
      {/* bg-[#dc0e63]/10 */}
      {/* bg-[#FF6B00]/10 */}
      {/* bg-[#f03e3e]/10 */}
      {/* bg-[#1971c2]/10 */}
      {/* bg-[#099268]/10 */}
      {/* bg-[#0c8599]/10 */}

      {/* border-[#dc0e63] */}
      {/* bg-[#ae3ec9]/10 */}
      {/* bg-[#dc0e63]/10 */}
      {/* bg-[#FF6B00]/10 */}
      {/* bg-[#f03e3e]/10 */}
      {/* bg-[#1971c2]/10 */}
      {/* bg-[#099268]/10 */}
      {/* bg-[#0c8599]/10 */}

      <p>{JSON.stringify(primaryColor)}</p>
      <p>{JSON.stringify(selectedColor)}</p>

      <div className="mt-4 flex flex-wrap gap-20">
        {PRIMARYCOLOR.map((color) => (
          <div
            onClick={() => setSelectedColor(color.color)}
            className={`flex gap-2 items-center border-2 border-transparent cursor-pointer p-2 rounded-md ${
              color.color == selectedColor ? " border-gray-500" : ""
            } `}
          >
            <div className={`w-14 h-14 rounded-md bg-[${color.color}]`}></div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-16">
        <Button onClick={changePrimaryColorHandler}>Save Theme</Button>
      </div>
    </div>
  )
}

const EventPageCoverImage = () => {
  return (
    <div>
      <div className="mb-6 flex  justify-between">
        <div>
          <h1 className="text-xl font-medium">Select Event Cover Image</h1>
          <p className="text-gray-400">
            For Family events we suggest to place family photos
          </p>
        </div>
        <div>
          <button className="px-4 py-2 rounded-md mt-4 underline">
            Upload Image
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
