import CreateEventForm from "@/components/forms/CreateEventForm"
import React from "react"

const EventCreatePage = () => {
  return (
    <div className="mx-8 px-4 my-8">
      <div>
        <Heading2 text="Create Event Form" />
        <CreateEventForm />
      </div>
    </div>
  )
}

const Heading2 = ({ text }: { text: string }) => {
  return <h2 className="text-xl font-semibold mb-8">{text}</h2>
}

export default EventCreatePage
