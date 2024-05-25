import React from "react"

const OverviewPollCard = ({
  title,
  description,
  options,
  date,
}: {
  title: string
  description: string
  options: string[] | undefined
  date: string
}) => {
  const optionClickHandler = (option: string) => {
    console.log(option)
  }

  return (
    <div className="bg-white shadow-md px-6 py-8 rounded-md">
      <div className="mb-8">
        <div className="flex gap-2 mb-4 items-center">
          <div className="w-[38px] h-[38px] bg-gray-700 rounded-md"></div>
          <h1 className="text-xl font-medium mb-2">{title}</h1>
        </div>
        <p className="text-xl text-gray-500">{description}</p>
      </div>

      <div className="flex flex-col gap-1">
        <div>
          <p className="text-xl font-medium">Select 1 Option</p>
        </div>
        {options &&
          options.map((option) => {
            return (
              <div
                className="flex gap-8 justify-between place-items-center"
                onClick={() => {
                  optionClickHandler(option)
                }}
              >
                <div className="flex gap-4 items-center w-full mt-4 p-2 rounded-sm pl-4 border-2 border-gray-200 cursor-pointer">
                  <p className="text-base">{option}</p>
                </div>
                <div className="pt-3 ">
                  {" "}
                  {Math.floor(Math.random() * 100) + 1}{" "}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default OverviewPollCard
