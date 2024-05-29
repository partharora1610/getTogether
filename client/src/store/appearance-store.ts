import { create } from "zustand"
import axios from "axios"

interface Appearance {}

type Store = {
  primaryColor: string
  textColor: string

  updateAppearance: (eventId: string, primaryColor: string) => void
  fetchAppearance: (eventId: string) => void
}

const appearanceStore = create<Store>((set) => ({
  primaryColor: "",
  textColor: "#ffffff",

  updateAppearance: async (eventId, primaryColor) => {
    const response = await axios.post(
      `http://localhost:8000/events/${eventId}/theme`,
      {
        primaryColor,
        textColor: "",
      },
      {
        withCredentials: true,
      }
    )

    if (response.status == 201) {
      set({
        primaryColor,
        textColor: "#ffffff",
      })
    }
  },

  fetchAppearance: async (eventId) => {
    const response = await axios.get(
      `http://localhost:8000/events/${eventId}/theme`,
      {
        withCredentials: true,
      }
    )

    console.log(response.data)

    if (response.status == 200) {
      set({
        primaryColor: response.data.data.primaryColor,
        textColor: response.data.data.textColor,
      })
    }
  },
}))

export default appearanceStore
