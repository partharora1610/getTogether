"use client"
import Image from "next/image"
import React from "react"
import eventStore from "@/store/event-store"
import CreatePostDialog from "@/components/dialog/CreatePostDialog"
import RejectRSVPDialog from "@/components/dialog/RejectRSVpDialog"
import AccepRSVPDialog from "@/components/dialog/AccepRSVPDialog"

const Page = () => {
  const { guestPosts } = eventStore()

  return (
    <div>
      <div className="mt-16">
        <RSVPCard />
      </div>
      <p>{JSON.stringify(guestPosts)}</p>

      <div className="mt-10">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold mb-12">Recent Activity</h1>

          <div>
            <CreatePostDialog />
          </div>
        </div>
        <div className="flex flex-col gap-12 justify-center items-center">
          {Array.from({ length: 2 }).map((_, index) => (
            <FeedCard key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

const FeedCard = () => {
  return (
    <div className="w-[800px] shadow-md rounded-lg px-4 py-8">
      <div className="flex gap-4 items-center">
        <div className="w-[48px] h-[48px] bg-gray-800 rounded-md"></div>
        <div>
          <p className="text-lg">
            Mr.Josh <span>Just confirmed his presence</span>
          </p>
          <p className="text-gray-500">2 hours ago</p>
        </div>
      </div>

      <div className="mt-2 mb-4">
        <p className="text-base">
          Very excited and happy to meet you on 24th this month, lets come and
          make this event a banger
        </p>
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

const RSVPCard = () => {
  const { event } = eventStore()

  return (
    <div className="border-2 w-full border-gray-100 rounded-md flex gap-6 px-6 py-6 h-full">
      <div className="w-full">
        <div className="flex justify-between gap-10">
          <div>
            <h1 className="text-xl font-medium mb-2">{event?.title}</h1>
            <p className="text-lg text-gray-600">{event?.description}</p>
            {/* 
            <h1 className="">Location</h1>
            <p>Event Location</p>
            <p>Add to calender</p> */}
          </div>

          <div>
            <h1 className="text-3xl font-semibold">Date</h1>
            <p>Event Date</p>
          </div>
        </div>
        <div className="flex gap-16 mt-12 justify-end">
          <RejectRSVPDialog />
          <AccepRSVPDialog />
        </div>
      </div>
    </div>
  )
}

export default Page
