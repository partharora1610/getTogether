import eventStore from "@/store/event-store"
import axios from "axios"
import React from "react"
import HostIcon from "../shared/HostIcon"
import authStore from "@/store/auth-store"
import appearanceStore from "@/store/appearance-store"
import { toast, useToast } from "../ui/use-toast"

const OverviewPollCard = ({
  id,
  heading,
  description,
  options,
}: {
  id: string
  heading: string
  description: string
  options: any | undefined
}) => {
  const { event, recordVote } = eventStore()
  const { user } = authStore()
  const { primaryColor } = appearanceStore()
  const { toast } = useToast()

  if (!event) {
    return null
  }

  const optionClickHandler = async (optionId: string) => {
    const response = await axios.put(
      `http://localhost:8000/events/${event.id}/polls/${id}/vote`,
      {
        pollOptionId: optionId,
      },
      {
        withCredentials: true,
      }
    )

    if (response.status == 200) {
      recordVote(response.data.data)
      toast({
        title: "Success",
        description: "Your vote has been recorded",
        variant: "default",
      })
    }
  }

  const isOptionSelected = (
    userId: string,
    optionSelections: any[]
  ): boolean => {
    if (
      optionSelections &&
      optionSelections.some((selection) => selection.userId === userId)
    ) {
      return true
    }
    return false
  }

  return (
    <div className="bg-white shadow-md px-6 py-8 rounded-md">
      <div className="mb-4">
        <div className="flex gap-2 mb-4 items-center">
          <div className="text-transparent w-12 h-12">
            <HostIcon />
          </div>
          <h1 className="text-xl font-medium mb-2">{heading}</h1>
        </div>
        <p className="text-md text-gray-500">{description}</p>
      </div>

      <div className="flex flex-col gap-1">
        <div>
          <p className="text-md font-medium">Select 1 Option</p>
        </div>

        {options &&
          options.map((option: any) => {
            return (
              <div
                className="flex gap-8 justify-between place-items-center"
                onClick={() => {
                  optionClickHandler(option.id)
                }}
              >
                <div
                  className={`flex gap-4 items-center w-full mt-4 p-2 rounded-sm pl-4 border-2 border-gray-200 cursor-pointer
                ${
                  user &&
                  isOptionSelected(user.id, option.eventPollOptionSelection)
                    ? `bg-[${primaryColor}]/10`
                    : ""
                }`}
                >
                  <p className="text-base">{option.text}</p>
                </div>
                <div className="pt-3 ">{option.count}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default OverviewPollCard
