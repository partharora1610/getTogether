import { create } from "zustand"
import axios from "axios"

interface Event {
  id: number
  name: string
  email: string
  role: string
}

type Store = {
  events: Event[]
  fetchEvents: () => void
  createEvent: (event: any) => void
}

const eventStore = create<Store>()((set) => ({
  events: [],

  fetchEvents: async () => {
    const response = await axios.get(process.env.BACKEND_BASE_URL!)
    set({ events: response.data })
  },

  createEvent: async (event) => {
    const response = await axios.post(process.env.BACKEND_BASE_URL!, event)
    // update the state
  },
}))

export default eventStore
