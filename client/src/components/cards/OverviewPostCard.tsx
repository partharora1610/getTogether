import { Calendar } from "lucide-react"
import React from "react"

const OverviewPostCard = ({
  title,
  description,
  date,
}: {
  title: string
  description: string
  date: string
}) => {
  return (
    <div className="shadow-md bg-white px-6 py-8 rounded-md">
      <div className="">
        <div>
          <div className="flex gap-2 mb-4 items-center">
            <div className="w-[38px] h-[38px] bg-gray-700 rounded-md"></div>
            <h1 className="text-xl font-medium mb-2">{title}</h1>
          </div>
          <p className="text-md text-gray-500">{description}</p>
          <p className="text-md text-gray-500 mt-2">Please Acknowledge this.</p>
        </div>
      </div>
      <div>
        <div className="flex gap-2 mt-4 items-center">
          <Calendar size={24} className="text-gray-500" />
          <p className="text-lg text-gray-500 ">{date}</p>
        </div>
      </div>
    </div>
  )
}

export default OverviewPostCard
