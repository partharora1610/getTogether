"use client"
import ChatInput from "@/components/shared/ChatInput"
import React from "react"

const Page = () => {
  return (
    <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
      <div className="flex-1 justify-between flex flex-col mb-28">
        <ChatContainerHeader />
      </div>

      <ChatInput />
    </div>
  )
}

const ChatContainerHeader = () => {
  return (
    <div className="bg-gray-200 text-black">
      <div className="grid grid-cols-3 gap-4">
        <div className=""></div>
        <h2 className="text-xl font-medium flex justify-center px-2 py-6">
          Dicussion Channel
        </h2>

        <div className="flex justify-end items-center px-2 py-6 pr-6">
          Actions
        </div>
      </div>

      <div className="mt-10">
        <ChatItem />
      </div>
    </div>
  )
}

const ChatContainer = () => {
  return (
    <div className="flex-grow overflow-y-auto mt-16 mb-16 p-4">
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
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

const ChatItem = () => {
  return <div className="bg-white p-2 my-2">Hello</div>
}

export default Page
