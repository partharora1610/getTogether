import { ROOM_SOCKET } from "@/constants/socket.route"
import socket from "@/lib/socket"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import eventStore from "@/store/event-store"
import chatStore from "@/store/chat-store"

export const useSocket = () => {
  const { channelId } = useParams()
  const { currentRole } = eventStore()
  const [readyToJoin, setReadyToJoin] = useState<boolean>(false)
  const { updateMesages } = chatStore()

  useEffect(() => {
    if (channelId && currentRole) {
      setReadyToJoin(true)
    }
  }, [channelId, currentRole])

  useEffect(() => {
    if (readyToJoin) {
      if (!socket.connected) {
        socket.connect()
      }

      socket.emit(ROOM_SOCKET.JOIN_CHANNEL, {
        channelId,
        roleId: currentRole.id as string,
      })

      socket.on(ROOM_SOCKET.CHANNEL_NEW_MESSAGE, (message: string) => {
        console.log("Message: ", message)
        updateMesages({
          message,
        })
      })

      return () => {
        if (socket) {
          socket.off(ROOM_SOCKET.CHANNEL_NEW_MESSAGE)
          socket.emit(ROOM_SOCKET.LEAVE_CHANNEL, channelId)
          socket.disconnect()
        }
      }
    }
  }, [readyToJoin])
}
