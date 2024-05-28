import { ROOM_SOCKET } from "@/constants/socket.route"
import socket from "@/lib/socket"
import { useEffect } from "react"

export const useSocket = () => {
  useEffect(() => {
    socket.connect()

    socket.on(ROOM_SOCKET.JOIN_ROOM, (data) => {})

    socket.on(ROOM_SOCKET.ROOM_NEW_MESSAGE, (status, username) => {})

    socket.on(ROOM_SOCKET.ROOM_SEND_MESSAGE, (status, username) => {})

    return () => {
      socket.off("connected")
      socket.off("messages")
    }
  }, [])
}
