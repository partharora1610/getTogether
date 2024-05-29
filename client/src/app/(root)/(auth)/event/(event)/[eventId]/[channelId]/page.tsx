"use client"

import ChatInput from "@/components/shared/ChatInput"
import { useSocket } from "@/hooks/useSocket"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import socket from "@/lib/socket"

const Page = () => {
  useSocket()

  return (
    <div className="relative min-h-full bg-zinc-50 flex-col justify-between gap-2">
      <div className="flex-1 justify-between flex flex-col mb-2">
        <ChatContainerHeader />
      </div>

      <div>
        <ChatContainer />
      </div>

      <ChatInput />
    </div>
  )
}

const ChatContainerHeader = () => {
  return (
    <div className="text-black bg-white shadow bg-cover bg-center">
      <div className="grid grid-cols-3 gap-4">
        <div className=""></div>
        <h2 className="text-xl font-medium flex justify-center px-2 py-6">
          Dicussion Channel
        </h2>

        <div className="flex gap-8 justify-end items-center px-2 py-6 pr-6">
          <p>Search</p>
          <p>Actions</p>
        </div>
      </div>
    </div>
  )
}

const ChatItem = () => {
  return (
    <div className="flex shadow w-3/4 p-2 my-2 gap-4 rounded-lg items-start bg-white">
      <img
        src="https://api.dicebear.com/8.x/adventurer/svg?seed=Sheba"
        alt=""
        width={56}
        height={56}
      />

      <div>
        <p className="text-base leading-7 mb-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro sequi
          rerum, quis fugiat praesentium aliquid eius consectetur at fuga qui.
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni a
          delectus molestiae quo eius consectetur.
        </p>
        <p className="text-gray-500 text-sm">2 dyas ago</p>
      </div>
    </div>
  )
}

export default Page

const ChatDateDivider = ({ date }: { date: string }) => {
  return (
    <div className="my-6">
      <div className="flex gap-8 items-center justify-between">
        <div className="h-[1px] w-full bg-gray-400"></div>
        <p className="min-w-fit text-center">{date}</p>
        <div className="h-[1px] w-full bg-gray-400"></div>
      </div>
    </div>
  )
}

const ChatContainer = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // database call to fetch messages
  }, [])

  return (
    <div className="mt-10 flex flex-col gap-4 mx-8">
      <ChatItem />
      <ChatItem />
      <ChatDateDivider date={"12-03-2024"} />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
    </div>
  )
}
