"use client"

import Image from "next/image"
import React, { useEffect, useState } from "react"
import eventStore from "@/store/event-store"
import CreatePostDialog from "@/components/dialog/CreatePostDialog"
import RejectRSVPDialog from "@/components/dialog/RejectRSVpDialog"
import AccepRSVPDialog from "@/components/dialog/AccepRSVPDialog"
import { AVATARS } from "@/constants/avatars"
import { Calendar, CheckCircle2Icon, LocateIcon, LucideBatteryWarning } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation";
import accessStore from "@/store/access-store"
import authStore from "@/store/auth-store"
import { toast } from "@/components/ui/use-toast"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Role } from "@/types"
import appearanceStore from "@/store/appearance-store"

const Page = () => {
  const { guestPosts } = eventStore();
  return (
    <div>
      <div className="mt-8 pl-4">
        <h1 className="text-2xl font-semibold mb-1">Event RSVP</h1>
        <p className="text-base text-gray-500">
          Confirm RSVP and share that with everyone in the event
        </p>
      </div>
      <div className="mt-6">
        <RSVPCard />
      </div>

      <div className="mt-10">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold mb-12">Recent Activity</h1>

          <div>
            <CreatePostDialog />
          </div>
        </div>
        <div className="flex flex-col gap-12 justify-center items-center">
          {guestPosts.map((guest: any, index: number) => (
            <FeedCard
              key={index}
              guest={guest.guest}
              text={guest.text}
              createdAt={guest.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const FeedCard = ({
  text,
  createdAt,
  guest,
}: {
  text: string
  createdAt: string
  guest: any
}) => {
  const avatar = guest.guest.avatar

  return (
    <div className="w-[800px] shadow-md rounded-lg px-4 py-8">
      <div className="flex gap-4 items-center">
        <img
          src={AVATARS[parseInt(avatar)]?.link}
          alt="image"
          width={40}
          height={40}
        />
        <div>
          <p className="text-lg">
            {guest.guest.name} <span>Just confirmed his presence</span>
          </p>
          <p className="text-gray-500">{convertToDDMM(createdAt)}</p>
        </div>
      </div>

      <p></p>
      <div className="mt-2 mb-4">
        <p className="text-base">{text}</p>
      </div>

      <Image
        className="m-auto"
        src="/thumbsup.png"
        alt="service_headers"
        width={700}
        height={400}
      />
    </div>
  )
}

function convertToDDMM(dateStr: string): string {
  const dateObj = new Date(dateStr)

  const day = dateObj.getDate().toString().padStart(2, "0")
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0")
  const year = dateObj.getFullYear()

  const ddmmStr = `${day}-${month}-${year}`

  return ddmmStr
}

const RSVPCard = () => {
  const { event } = eventStore();
  const router = useRouter();
  const { user } = authStore();
  const { hasAccess, setHasAccess } = accessStore();
  const [ isAddToCalendarCallable, setIsAddToCalendarCallable ] = useState<boolean>(false);
  const { event, venue, roleType, rsvp, currentRole } = eventStore();
  const { primaryColor } = appearanceStore();
  const textClass = `text-[${primaryColor}]`;
  const guestRSVP = rsvp.find((r: any) => r.guestId === currentRole.id);

  useEffect(() => {
    setHasAccess(user.hasGivenCalendarAccess);
  }, [user.hasGivenCalendarAccess]);

  useEffect(() => {
    if (event) {
      setIsAddToCalendarCallable(true);
    }
  }, [event]);
 
  const addToCalender = async () => {

    if (!hasAccess) {
      const response = await axios.post('http://localhost:8000/auth/calender/url', {
        eventId: event?.id,
      }, {
        withCredentials: true,
      });
      if (response.status == 200) {
        setHasAccess(true);
      }
      const { url } = response.data;
      router.push(url);
    } else {
      const response = await axios.post('http://localhost:8000/auth/calender/addEvent', {
        summary: event?.title,
        description: event?.description,
        start: event?.startDate,
        end: event?.startDate,   
      }, {
        withCredentials: true,
      });

      if (response.status == 200) {
        toast({
          title: "Event added to Calendar",
          variant: "default",
        });
      }

    }

  }

  return (
    <div
      className={`border-2 w-full border-gray-100 rounded-md flex gap-6 px-4 py-4 h-full ${
        roleType == Role.HOST && " pt-6 pb-8"
      }`}
    >
      <div className="">
        <div className="flex justify-between gap-24">
          <div>
            <h1 className="text-xl font-medium mb-2">{event?.title}</h1>
            <p className="text-lg text-gray-600">{event?.description}</p>

            <div className="flex gap-12 mt-6">
              <div className="flex gap-2 cursor-pointer">
                <HoverCard>
                  <HoverCardTrigger>
                    <div className="flex gap-2">
                      <LocateIcon size={20} />
                      <h1 className="">{venue.name}</h1>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="">
                      <h1 className="font-semibold">{venue.name}</h1>
                      <h1 className="text-gray-600">{venue.address}</h1>
                      <h1 className="text-gray-600">
                        {venue.state} , {venue.city} , {venue.zipCode}
                      </h1>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <div 
              onClick={() => {
                isAddToCalendarCallable && addToCalender()
              }
            }
              className="flex gap-2 cursor-pointer">
                <Calendar size={20} />
                <p>Add to calender</p>
                {
                  hasAccess ? (
                  <CheckCircle2Icon size={25} className="text-green-500"/>
                  ): (
                  <LucideBatteryWarning size={25} className="text-red-500"/>
                  )
                }
              </div>
            </div>
          </div>

          <div className="">
            <h1 className="text-2xl font-semibold ">
              {event?.startDate && formatDate(event?.startDate)}
            </h1>
          </div>
        </div>
        {roleType == Role.GUEST && (
          <div className="flex gap-16 mt-4 justify-end">
            {!guestRSVP && <RejectRSVPDialog />}

            {guestRSVP && guestRSVP.status == "CONFIRMED" && (
              <button
                className={`h font-semibold hover:border-white px-6 py-3 rounded-xl ${textClass} `}
              >
                Already confirmed
              </button>
            )}

            {!guestRSVP && <AccepRSVPDialog />}
          </div>
        )}
      </div>
    </div>
  )
}

function formatDate(inputDate: string): string {
  const date = new Date(inputDate)

  const day = date.getDate()
  const year = date.getFullYear()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const month = monthNames[date.getMonth()]

  return `${day} ${month}, ${year}`
}

export default Page
