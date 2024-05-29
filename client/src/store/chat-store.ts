import { create } from "zustand"
import axios from "axios"

export type Message = {
  message: string;
  timestamp: Date;
  channelId: string;
  senderId: string;
}

type Store = {
  messages: Message[]
  fetchMessages: (eventId: string, channelId: string) => void
  sendMessage: ({
    message,
    roleId,
    eventId,
    channelId
  }: {
    message: string
    roleId: string
    eventId: string
    channelId: string
  }) => void
}

const chatStore = create<Store>((set) => ({
  messages: [],

  fetchMessages: async (eventId: string, channelId: string) => {
    const response = await axios.get(`http://localhost:8000/events/${eventId}/channels/${channelId}/messages`, {
      withCredentials: true,
    })

    if (response.status === 200) {
      set({ messages: response.data.data })
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

    if (response.status === 201) {
      set((state) => ({ messages: [...state.messages, response.data.data] }))
    }
  },
}))

export default chatStore
