import { create } from "zustand"
import axios from "axios"

// export type Message = {
//   id: string
//   message: string
//   timestamp: Date
//   channelId: string
//   senderId: string
// }

type Store = {
  messages: any[]
  updateMesages: (message: any) => void

  fetchMessages: (eventId: string, channelId: string) => void
  sendMessage: ({
    message,
    roleId,
    eventId,
    channelId,
  }: {
    message: string
    roleId: string
    eventId: string
    channelId: string
  }) => void
}

const chatStore = create<Store>((set) => ({
  messages: [],

  updateMesages: (message) => {
    set((state) => ({ messages: [...state.messages, message] }))
  },

  fetchMessages: async (eventId: string, channelId: string) => {
    const response = await axios.get(
      `http://localhost:8000/events/${eventId}/channels/${channelId}/messages`,
      {
        withCredentials: true,
      }
    )

    if (response.status === 200) {
      const messages = response.data.data

      const formattedMessages = messages.map((message: any) => {
        return {
          message: message.message,
          timestamp: new Date(message.timestamp),
          senderAvatar: message.sender.guest?.avatar,
          senderNickName: message.sender.guest?.nickName,
          senderName: message.sender.guest?.name,
        }
      })

      set({ messages: formattedMessages })
    }
  },

  sendMessage: async ({ message, roleId, eventId, channelId }) => {
    const response = await axios.post(
      `http://localhost:8000/events/${eventId}/channels/${channelId}/messages`,
      {
        message,
        roleId,
      },
      {
        withCredentials: true,
      }
    )

    if (response.status === 200) {
      set((state) => ({ messages: [...state.messages, response.data.data] }))
    }
  },
}))

export default chatStore
