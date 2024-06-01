"use client"

import { Send } from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useRef } from "react"
import { formatMessage } from "@/store/chat-store"
import socket from "@/lib/socket"
import { useParams } from "next/navigation"
import eventStore from "@/store/event-store"
import { ROOM_SOCKET } from "@/constants/socket.route"
import axios from "axios"

interface ChatInputProps {
  isDisabled?: boolean
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { eventId, channelId } = useParams()
  const { currentRole } = eventStore()

  const sendMessage = async (message: string, roleId: string, eventId: string, channelId: string) => {
    const response = await axios.post(
      `http://localhost:8000/events/${eventId}/channels/${channelId}/messages`,
      {
        message,
        roleId,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return formatMessage(response.data.data);
    }

    return undefined;
  }

  const handleSendMessage = async () => {
    const message = textareaRef.current?.value

    if (!currentRole) {
      console.log("Current Role is null !!!")
    }

    if (message && currentRole) {
      const msg = await sendMessage(message, currentRole.id, eventId as string, channelId as string);
      if (msg) {
        socket.emit(ROOM_SOCKET.CHANNEL_SEND_MESSAGE, { msg });
        textareaRef.current.value = ""
      } else {
        alert("Something went wrong");
      }
      
    }
  }

  return (
    <div className="bottom-0 left-0 w-full bg-indigo-50">
      <div className="mx-2 flex flex-row gap-3 ">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <div className="relative">
              <Textarea
                rows={1}
                ref={textareaRef}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    textareaRef.current?.focus()
                  }
                }}
                placeholder="Enter your question..."
                className="resize-none pr-12 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
              />

              <Button
                className="absolute bottom-1.5 right-[8px]"
                aria-label="send message"
                type="submit"
                onClick={() => {
                  textareaRef.current?.focus()
                  handleSendMessage()
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInput
