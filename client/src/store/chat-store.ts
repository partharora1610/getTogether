import { create } from "zustand"
import axios from "axios"

type Message = {
  message: string
  timestamp: Date
  senderAvatar: number
  senderNickName: string
  senderName: string
}

export const formatMessage = (message: any): Message => {
  return {
    message: message.message,
    timestamp: new Date(message.timestamp),
    senderAvatar: message.sender?.guest?.avatar,
    senderNickName: message.sender?.guest?.nickName,
    senderName: message.sender?.guest?.name,
  }
}

type Store = {
  messages: Message[]
  updateMessages: ({ message }: { message: any }) => void

  fetchMessages: (eventId: string, channelId: string) => void
}

const chatStore = create<Store>((set) => ({
  messages: [],

  updateMessages: ({ message }) => {
    const formattedMessage = formatMessage(message)
    set((state) => ({ messages: [...state.messages, formattedMessage] }))
  },

  fetchMessages: async (eventId: string, channelId: string) => {
    const response = await axios.get(
      `https://fueled-41xn.onrender.com:8000/events/${eventId}/channels/${channelId}/messages`,
      {
        withCredentials: true,
      }
    )

    if (response.status === 200) {
      const messages = response.data.data

      const formattedMessages = messages.map((message: any) => {
        return formatMessage(message)
      })

      set({ messages: formattedMessages })
    }
  },
}))

export default chatStore
