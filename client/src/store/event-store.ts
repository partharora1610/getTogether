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
  channels: any
}

type Store = {
  loading: boolean
  events: Event[]

  event: Event | null
  currentRole: any
  fecthUserRole: (eventId: string) => void

  fetchEventById: (id: string) => void
  fetchEvents: () => void
  createEvent: (event: any) => void
}

const eventStore = create<Store>()((set) => ({
  events: [],
  loading: false,
  event: null,
  currentRole: "",

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

  fecthUserRole: async (eventId) => {
    const response = await axios.get(
      `http://localhost:8000/events/${eventId}/role`,
      {
        withCredentials: true,
      }
    )

    console.log("Response: ", response);

    if (response.status == 200) {
      set({ currentRole: response.data.data })
      console.log("Data: ", response.data);
    }
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
