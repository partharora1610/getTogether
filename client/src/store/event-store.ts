import { create } from "zustand"
import axios from "axios"
import { Role } from "@/types"

interface Event {
  id: number
  title: string
  description: string
  guests: any
  vendors: any
  eventPosts: any
  eventPolls: any
  eventHostMessage: true
  createdAt: string
  channels: any
  startDate: string
  isAddedToCalendar: boolean
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
  guestPosts: any

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
  addGuestPost: (guestPost: any) => void
  recordVote: (poll: any) => void

  event: Event | null
  currentRole: any
  roleType: Role
  fetchUserRole: (eventId: string) => void

  fetchEventById: (id: string) => void
  fetchEvents: () => void
  createEvent: (event: any) => void

  nickName: string
  avatar: string
}

const eventStore = create<Store>()((set) => ({
  nickName: "",
  avatar: "",

  events: [],
  loading: false,
  event: null,
  currentRole: {},

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
  guestPosts: [],

  addGuestPost: (guestPost) =>
    set((state) => ({ guestPosts: [...state.guestPosts, guestPost] })),

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

  recordVote: async (poll: any) => {
    set((state) => {
      const updatedPolls = state.eventPolls.map((p: any) => {
        if (p.id === poll.id) {
          return poll
        }
        return p
      })

      return { eventPolls: updatedPolls }
    })
  },

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
      const { role, data } = response.data

      set({ currentRole: data })

      if (role === "host") {
        set({ roleType: Role.HOST })
      } else if (role === "guest") {
        set({
          roleType: Role.GUEST,
          avatar: data.avatar,
          nickName: data.nickName,
        })
      } else if (role === "vendor") {
        set({ roleType: Role.VENDOR })
      }
    }
  },

  roleType: Role.NULL,

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
      set({ rsvp: response.data.data.rsvps })
      set({ invites: response.data.data.invites })
      set({ guests: response.data.data.guests })
      set({ vendors: response.data.data.vendors })
      set({ eventPosts: response.data.data.eventPosts })
      set({ eventPolls: response.data.data.eventPolls })
      set({ venue: response.data.data.venue })
      set({ eventHostMessage: response.data.data.eventHostMessage })
      set({ channels: response.data.data.channels })
      set({ eventFloorPlan: response.data.data.eventFloorPlan })

      // formatted objects
      const guest = response.data.data.guests
      const posts = response.data.data.guestPosts

      const formattedGuestPost = posts.map((post: any) => {
        return {
          text: post.text,
          createdAt: post.createdAt,
          guest: guest.find((g: any) => g.guestId == post.guestId),
        }
      })

      set({ guestPosts: formattedGuestPost })
    }

    set({ loading: false })
  },
}))

export default eventStore
