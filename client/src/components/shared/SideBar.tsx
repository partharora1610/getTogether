"use client"
import Link from "next/link"
import {
  LucideHome,
  MonitorSpeakerIcon,
  TicketIcon,
  User2Icon,
} from "lucide-react"
import { useParams, usePathname } from "next/navigation"
import AddChannelDialog from "../dialog/AddChannelDialog"
import eventStore from "@/store/event-store"
import appearanceStore from "@/store/appearance-store"
import { Role } from "@/types"

const SideBar = () => {
  const { event, roleType } = eventStore()
  const { primaryColor } = appearanceStore()

  // ??
  const {
    eventId,
  }: {
    eventId: string
  } = useParams()

  const pathname = usePathname()
  const lastPath = pathname.split("/").pop()

  const bgClass = `bg-[${primaryColor}]/10 `
  const textClass = `text-[${primaryColor}]`

  return (
    <div>
      <Link href={`/event/${eventId}/overview`}>
        <div
          className={`flex items-center gap-4 px-5 py-4 cursor-pointer  rounded-xl mb-6 ${
            lastPath === "overview" ? `${bgClass} ${textClass} font-medium` : ""
          }`}
        >
          <LucideHome size={22} />
          <h2 className="text-lg">Overview</h2>
        </div>
      </Link>

      <Link href={`/event/${eventId}/rsvp`}>
        <div
          className={`flex items-center gap-4 px-5 py-4 cursor-pointer  rounded-xl mb-6 ${
            lastPath === "rsvp" ? `${bgClass} ${textClass} font-medium` : ""
          }`}
        >
          <TicketIcon size={22} />
          <h2 className="text-lg">RSVP</h2>
        </div>
      </Link>

      {(Role.HOST == roleType || Role.GUEST == roleType) && (
        <div className="mb-8">
          {Role.HOST == roleType && <AddChannelDialog eventId={eventId} />}

          <div className="flex flex-col gap-6">
            {event?.channels?.map((channel: any) => (
              <Link href={`/event/${eventId}/${channel.id}`}>
                <div
                  key={channel.id}
                  className={`flex items-center gap-4 px-5 py-4 cursor-pointer  rounded-xl mb-6 ${
                    lastPath === "overview"
                      ? `${bgClass} ${textClass} font-medium`
                      : ""
                  }`}
                >
                  <MonitorSpeakerIcon size={22} />
                  <h2 className="text-lg">{channel.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {Role.HOST == roleType && (
        <div>
          <div>
            <h2 className="text-lg text-gray-600 font-medium mb-4 uppercase">
              Admin Control
            </h2>

            <Link href={`/event/${eventId}/guest-list`}>
              <div
                className={`flex items-center gap-4 px-5 py-4 cursor-pointer  rounded-xl mb-6 ${
                  lastPath === "guest-list"
                    ? `${bgClass} ${textClass} font-medium`
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

            <Link href={`/event/${eventId}/event-details`}>
              <div
                className={`flex items-center gap-4 px-5 py-4 cursor-pointer  rounded-xl mb-6 ${
                  lastPath === "event-details"
                    ? `${bgClass} ${textClass} font-medium`
                    : ""
                }`}
              >
                <User2Icon size={22} />
                <div>
                  <h2 className="text-lg">Event Details</h2>
                  <p className="text-gray-500">
                    Manage event vendors,venue etc
                  </p>
                </div>
              </div>
            </Link>

            <Link href={`/event/${eventId}/themes`}>
              <div
                className={`flex items-center gap-4 px-5 py-4 cursor-pointer  rounded-xl mb-6 ${
                  lastPath === "themes"
                    ? `${bgClass} ${textClass} font-medium`
                    : ""
                }`}
              >
                <User2Icon size={22} />
                <div>
                  <h2 className="text-lg">Platform Settings</h2>
                  <p className="text-gray-500">
                    Use custom themes that suit your event
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {Role.HOST == roleType && (
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
      )}
    </div>
  )
}

export default SideBar
