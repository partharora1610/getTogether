import eventStore from "@/store/event-store"
import axios from "axios"
import React from "react"

type PollOption = {
  text: string
  count: number
  id: string
}

const OverviewPollCard = ({
  id,
  heading,
  description,
  options,
  date,
}: {
  id: string
  heading: string
  description: string
  options: PollOption[] | undefined
  date: string
}) => {
  const { event } = eventStore()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  )

  if (!event) {
    return null
  }

  const optionClickHandler = async (optionId: any) => {
    const response = await axios.post(
      `http://localhost:8000/events/${optionId}/polls/${id}/vote`,
      {
        count: 20,
      },
      {
        withCredentials: true,
      }
    )

    if (response.status == 200) {
      // setSelectedOption(optionId)
    }

    console.log(response.data)
  }

  return (
    <div className="bg-white shadow-md px-6 py-8 rounded-md">
      <div className="mb-4">
        <div className="flex gap-2 mb-4 items-center">
          <div className="w-[38px] h-[38px] bg-gray-700 rounded-md"></div>
          <h1 className="text-xl font-medium mb-2">{heading}</h1>
        </div>
        <p className="text-md text-gray-500">{description}</p>
      </div>

      <div className="flex flex-col gap-1">
        <div>
          <p className="text-md font-medium">Select 1 Option</p>
        </div>
        {options &&
          options.map((option) => {
            return (
              <div
                className="flex gap-8 justify-between place-items-center"
                onClick={() => {
                  optionClickHandler(option.id)
                }}
              >
                <div className="flex gap-4 items-center w-full mt-4 p-2 rounded-sm pl-4 border-2 border-gray-200 cursor-pointer">
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
