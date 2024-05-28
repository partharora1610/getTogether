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
import { useEffect } from "react"
import socket from "@/lib/socket"

const SideBar = () => {
  const { event, currentRole } = eventStore()

  const {
    channelId,
    eventId,
  }: {
    channelId: string
    eventId: string
  } = useParams()
  const pathname = usePathname()
  console.log(event)

  const lastPath = pathname.split("/").pop()

  const joinChannelHandler = () => {
    socket.emit("joinChannel", {
      roleId: currentRole.id,
      channelId: channelId,
    })
  }
  return (
    <div>
      <Link href="/event/clwqaq1ys0002hqg4jxuond1x/overview">
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

      <Link href="/event/clwqaq1ys0002hqg4jxuond1x/rsvp">
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
          {/* <p>{JSON.stringify(event?.channels)}</p> */}

          {event?.channels?.map((channel: any) => (
            <Link
              href={`/event/clwqaq1ys0002hqg4jxuond1x/${channel.id}`}
              onClick={() => joinChannelHandler}
            >
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

          <Link href="/event/clwqaq1ys0002hqg4jxuond1x/guest-list">
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

          <Link href="/event/clwqaq1ys0002hqg4jxuond1x/event-details">
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

          <Link href="/event/clwqaq1ys0002hqg4jxuond1x/themes">
            <div
              className={`flex items-center gap-4 px-5 py-4 cursor-pointer  rounded-xl mb-6 ${
                lastPath === "guest-list"
                  ? "bg-primary-400/10 text-primary-400 font-medium "
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
