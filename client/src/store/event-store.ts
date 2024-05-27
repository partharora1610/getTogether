import { create } from "zustand"
import axios from "axios"

interface Event {
  id: number
  title: string
  description: string
  guests: any
  eventPosts: any
  eventPolls: any
  eventHostMessage: true
  createdAt: string
}

type Store = {
  loading: boolean
  events: Event[]
  event: Event | null
  fetchEventById: (id: string) => void
  fetchEvents: () => void
  createEvent: (event: any) => void
}

const eventStore = create<Store>()((set) => ({
  events: [],
  loading: false,
  event: null,

  fetchEvents: async () => {
    set({ loading: true })

    const response = await axios.get("http://localhost:8000/events/all", {
      withCredentials: true,
    })

    if (response.status == 200) {
      set({ events: response.data.data })
    }

    set({ loading: false })
  },

  createEvent: async (event) => {
    const response = await axios.post(process.env.BACKEND_BASE_URL!, event)
  },

  fetchEventById: async (id: string) => {
    set({ loading: true })

    const response = await axios.get(`http://localhost:8000/events/${id}`, {
      withCredentials: true,
    })

    if (response.status == 200) {
      set({ event: response.data.data })
    }

    set({ loading: false })
  },
}))

export default eventStore
