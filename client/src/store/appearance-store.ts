import { create } from "zustand"
import axios from "axios"

type Store = {
  primaryColor: string
  textColor: string

  updateAppearance: (eventId: string, primaryColor: string, cb: any) => void
  fetchAppearance: (eventId: string) => void
}

const appearanceStore = create<Store>((set) => ({
  primaryColor: "",
  textColor: "#ffffff",

  updateAppearance: async (eventId, primaryColor, cb) => {
    const response = await axios.post(
      `https://fueled-41xn.onrender.com:8000/events/${eventId}/theme`,
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
      cb()
    }
  },

  fetchAppearance: async (eventId) => {
    const response = await axios.get(
      `https://fueled-41xn.onrender.com:8000/events/${eventId}/theme`,
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
