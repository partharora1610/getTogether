"use client"

import ChatInput from "@/components/shared/ChatInput"
import { useSocket } from "@/hooks/useSocket"
import { useParams } from "next/navigation"
import React, { useEffect } from "react"
import chatStore from "@/store/chat-store"
import { AVATARS } from "@/constants/avatars"
import HostIcon from "@/components/shared/HostIcon"

const Page = () => {
  const { fetchMessages } = chatStore()
  const params = useParams()

  const { eventId, channelId } = params as {
    eventId: string
    channelId: string
  }

  useSocket();

  useEffect(() => {
    fetchMessages(eventId, channelId)
  }, [eventId, channelId]);

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

const ChatItem = ({ message, avatar, nickName, name, id, createdAt }: any) => {
  console.log(avatar);
  const avatarSrc = AVATARS[parseInt(avatar)]?.link

  return (
    <div className="flex shadow w-3/4 p-2 my-2 gap-4 rounded-lg items-start bg-white">
      {!avatar ? (
        <div className="w-12 h-12">
          <HostIcon />
        </div>
      ) : (
        <img src={avatarSrc} alt="" width={56} height={56} />
      )}

      <div className="w-full">
        <div className="flex justify-between ">
          <p className="font-semibold">{nickName || "HOST"}</p>
          <p className="text-gray-500 text-sm">2 dyas ago</p>
        </div>
        <p className="text-base leading-7 mb-1">{message}</p>
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
  const { messages } = chatStore();

  return (
    <div className="mt-10 flex flex-col gap-4 mx-8">
      {messages.map((m) => {
        const { message, senderNickName, senderAvatar, senderName } = m

        return (
          <div>
            <ChatItem
              message={message}
              avatar={senderAvatar}
              nickName={senderNickName}
              name={senderName}
            />
          </div>
        )
      })}
    </div>
  )
}
