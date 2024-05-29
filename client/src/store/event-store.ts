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

  rsvp: any
  invites: any
  guests: any
  vendors: any
  eventPosts: any
  eventPolls: any
  venue: any
  eventHostMessage: any
  channels: any
  eventFloorPlan: any

  addRsvp: (rsvp: any) => void
  addEventFloorPlan: (eventFloorPlan: any) => void
  addEventHostMessage: (eventHostMessage: any) => void
  addChannel: (channel: any) => void
  addEventPost: (eventPost: any) => void
  addEventPoll: (eventPoll: any) => void
  addGuest: (guest: any) => void
  addInvite: (invite: any) => void
  addVendor: (vendor: any) => void
  addVenue: (venue: any) => void

  event: Event | null
  currentRole: any
  fetchUserRole: (eventId: string) => void

  fetchEventById: (id: string) => void
  fetchEvents: () => void
  createEvent: (event: any) => void
}

const eventStore = create<Store>()((set) => ({
  events: [],
  loading: false,
  event: null,
  currentRole: "",

  rsvp: [],
  invites: [],
  guests: [],
  vendors: [],
  eventPosts: [],
  eventPolls: [],
  venue: [],
  eventHostMessage: [],
  channels: [],
  eventFloorPlan: [],

  addRsvp: (rsvp) => set((state) => ({ rsvp: [...state.rsvp, rsvp] })),
  addEventFloorPlan: (eventFloorPlan) =>
    set((state) => ({
      eventFloorPlan: [...state.eventFloorPlan, eventFloorPlan],
    })),
  addEventHostMessage: (eventHostMessage) =>
    set((state) => ({
      eventHostMessage: [...state.eventHostMessage, eventHostMessage],
    })),
  addChannel: (channel) =>
    set((state) => ({ channels: [...state.channels, channel] })),
  addEventPost: (eventPost) =>
    set((state) => ({ eventPosts: [...state.eventPosts, eventPost] })),
  addEventPoll: (eventPoll) =>
    set((state) => ({ eventPolls: [...state.eventPolls, eventPoll] })),
  addGuest: (guest) => set((state) => ({ guests: [...state.guests, guest] })),
  addInvite: (invite) =>
    set((state) => ({ invites: [...state.invites, invite] })),
  addVendor: (vendor) =>
    set((state) => ({ vendors: [...state.vendors, vendor] })),
  addVenue: (venue) => set((state) => ({ venue: [...state.venue, venue] })),

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

  fetchUserRole: async (eventId) => {
    const response = await axios.get(
      `http://localhost:8000/events/${eventId}/role`,
      {
        withCredentials: true,
      }
    )

    if (response.status == 200) {
      set({ currentRole: response.data.data.role })
    }
  },

  // Use this to create and then update the local store with the new event
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
      set({ loading: false })
      set({ rsvp: response.data.data.rsvp })
      set({ invites: response.data.data.invites })
      set({ guests: response.data.data.guests })
      set({ vendors: response.data.data.vendors })
      set({ eventPosts: response.data.data.eventPosts })
      set({ eventPolls: response.data.data.eventPolls })
      set({ venue: response.data.data.venue })
      set({ eventHostMessage: response.data.data.eventHostMessage })
      set({ channels: response.data.data.channels })
      set({ eventFloorPlan: response.data.data.eventFloorPlan })
    }

    set({ loading: false })
  },
}))

export default eventStore
