"use client"
import Link from "next/link"
import {
  LucideHome,
  MonitorSpeakerIcon,
  PlusIcon,
  TicketIcon,
  User2Icon,
} from "lucide-react"
import { useParams, usePathname } from "next/navigation"
import AddChannelDialog from "../dialog/AddChannelDialog"
import eventStore from "@/store/event-store"

const SideBar = () => {
  const { event } = eventStore()
  const params = useParams()
  const pathname = usePathname()

  const lastPath = pathname.split("/").pop()
  const eventId = params.eventId as string

  return (
    <div>
      <Link href="/event/clwnrcw8h0002by5wog9y5h6i/overview">
        <div
          className={`flex items-center gap-4 px-5 py-4 cursor-pointer  rounded-xl mb-6 ${
            lastPath === "overview"
              ? "bg-primary-400/10 text-primary-400 font-medium "
              : ""
          }`}
        >
          <LucideHome size={22} />
          <h2 className="text-lg">Overview</h2>
        </div>
      </Link>

      <Link href="/event/clwnrcw8h0002by5wog9y5h6i/rsvp">
        <div
          className={`flex items-center gap-4 px-5 py-4 cursor-pointer  rounded-xl mb-6 ${
            lastPath === "rsvp"
              ? "bg-primary-400/10 text-primary-400 font-medium "
              : ""
          }`}
        >
          <TicketIcon size={22} />
          <h2 className="text-lg">RSVP</h2>
        </div>
      </Link>

      <div className="mb-8">
        <AddChannelDialog eventId={eventId} />

        <div className="flex flex-col gap-6">
          {event?.channels.map((channel: any) => (
            <Link href={`/event/clwnrcw8h0002by5wog9y5h6i/${channel.id}`}>
              <div
                key={channel.id}
                className="flex items-center gap-4 px-5 py-4 cursor-pointer  rounded-md "
              >
                <MonitorSpeakerIcon size={22} />
                <h2 className="text-lg">{channel.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/*  */}

      <div>
        <div>
          <h2 className="text-lg text-gray-600 font-medium mb-4 uppercase">
            Admin Control
          </h2>

          <Link href="/event/clwnrcw8h0002by5wog9y5h6i/guest-list">
            <div
              className={`flex items-center gap-4 px-5 py-4 cursor-pointer  rounded-xl mb-6 ${
                lastPath === "guest-list"
                  ? "bg-primary-400/10 text-primary-400 font-medium "
                  : ""
              }`}
            >
              <User2Icon size={22} />
              <div>
                <h2 className="text-lg">Event Guest List</h2>
                <p className="text-gray-500">Manage event guest list</p>
              </div>
            </div>
          </Link>

          <Link href="/event/clwnrcw8h0002by5wog9y5h6i/event-details">
            <div
              className={`flex items-center gap-4 px-5 py-4 cursor-pointer  rounded-xl mb-6 ${
                lastPath === "event-details"
                  ? "bg-primary-400/10 text-primary-400 font-medium "
                  : ""
              }`}
            >
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
          <div className="flex items-center gap-4 px-5 py-4 cursor-pointer  rounded-md  mb-6">
            <User2Icon size={22} />
            <h2 className="text-lg">Rahul Catering Service</h2>
          </div>
          <div className="flex items-center gap-4 px-5 py-4 cursor-pointer  rounded-md  mb-6">
            <User2Icon size={22} />
            <h2 className="text-lg">Binod Planners</h2>
          </div>
          <div className="flex items-center gap-4 px-5 py-4 cursor-pointer  rounded-md  mb-6">
            <User2Icon size={22} />
            <h2 className="text-lg">Binod Planners</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
