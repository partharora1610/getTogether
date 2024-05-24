"use client"
import Link from "next/link"
import {
  LucideHome,
  MonitorSpeakerIcon,
  TicketIcon,
  User2Icon,
} from "lucide-react"

const CHANNELS = ["Discussion", "Dance Practice", "Dress Code"]

const SideBar = () => {
  return (
    <div>
      <Link href="/event/1/overview">
        <div className="flex items-center gap-4 px-5 py-4 cursor-pointer border-2 border-gray-100 rounded-md hover:bg-gray-200 mb-6">
          <LucideHome size={22} />
          <h2 className="text-lg">Overview</h2>
        </div>
      </Link>

      <Link href="/event/1/rsvp">
        <div className="flex items-center gap-4 px-5 py-4 cursor-pointer border-2 border-gray-100 rounded-md hover:bg-gray-200 mb-6">
          <TicketIcon size={22} />
          <h2 className="text-lg">RSVP</h2>
        </div>
      </Link>

      <div className="mb-8">
        <div>
          <h2 className="text-lg text-gray-600 font-medium mb-4 uppercase">
            Discussion Channels
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {CHANNELS.map((channel) => (
            <div
              key={channel}
              className="flex items-center gap-4 px-5 py-4 cursor-pointer border-2 border-gray-100 rounded-md hover:bg-gray-200"
            >
              <MonitorSpeakerIcon size={22} />
              <h2 className="text-lg">{channel}</h2>
            </div>
          ))}
        </div>
      </div>

      {/*  */}

      <div>
        <div>
          <h2 className="text-lg text-gray-600 font-medium mb-4 uppercase">
            Admin Control
          </h2>

          <Link href="/event/1/guest-list">
            <div className="flex items-center gap-4 px-5 py-4 cursor-pointer border-2 border-gray-100 rounded-md hover:bg-gray-200 mb-6">
              <User2Icon size={22} />
              <div>
                <h2 className="text-lg">Event Guest List</h2>
                <p className="text-gray-500">Manage event guest list</p>
              </div>
            </div>
          </Link>

          <Link href="/event/1/event-details">
            <div className="flex items-center gap-4 px-5 py-4 cursor-pointer border-2 border-gray-100 rounded-md hover:bg-gray-200 mb-6">
              <User2Icon size={22} />
              <div>
                <h2 className="text-lg">Event Details</h2>
                <p className="text-gray-500">Manage event vendors,venue etc</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/*  */}
      <div>
        <div>
          <h2 className="text-lg text-gray-600 font-medium mb-4 uppercase">
            Chat with Vendors
          </h2>
          <div className="flex items-center gap-4 px-5 py-4 cursor-pointer border-2 border-gray-100 rounded-md hover:bg-gray-200 mb-6">
            <User2Icon size={22} />
            <h2 className="text-lg">Rahul Catering Service</h2>
          </div>
          <div className="flex items-center gap-4 px-5 py-4 cursor-pointer border-2 border-gray-100 rounded-md hover:bg-gray-200 mb-6">
            <User2Icon size={22} />
            <h2 className="text-lg">Binod Planners</h2>
          </div>
          <div className="flex items-center gap-4 px-5 py-4 cursor-pointer border-2 border-gray-100 rounded-md hover:bg-gray-200 mb-6">
            <User2Icon size={22} />
            <h2 className="text-lg">Binod Planners</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
