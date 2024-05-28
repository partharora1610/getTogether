import { create } from "zustand"
import axios from "axios"

interface Message {}

type Store = {
  messages: Message[]
  fetchMessages: () => void
  sendMessage: ({
    message,
    roleId,
  }: {
    message: string
    roleId: string
  }) => void
}

const chatStore = create<Store>((set) => ({
  messages: [],

  fetchMessages: async () => {
    const response = await axios.get("http://localhost:8000/", {
      withCredentials: true,
    })

    if (response.status === 200) {
      set({ messages: response.data.data })
    }
  },

  sendMessage: async ({ message, roleId }) => {
    const response = await axios.post(
      "http://localhost:8000/",
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
