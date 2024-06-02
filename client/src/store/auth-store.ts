import { create } from "zustand"
import axios from "axios"

interface User {
  id: number
  name: string
  email: string
  role: string
}

type Store = {
  user: any
  setUser: any
  login: any
  logout: any
  isAuthenticated: boolean
  setAuthenticated: any
}

const authStore = create<Store>()((set) => ({
  user: null,

  setUser: (user: any) => {
    set({ user })
  },

  login: async ({ token }: { token: string }) => {
    console.log("token", token)
    const { data } = await axios.post(
      `http://localhost:8000/auth/google`,
      {
        token: token,
      },
      {
        withCredentials: true,
      }
    )

    if (data.message === "Ok") {
      set({ user: data.user, isAuthenticated: true })
      return true
    }

    return false
  },

  logout: async () => {
    await axios.get(`http://localhost:8000/user/logout`, {
      withCredentials: true,
    })
    set({ user: null, isAuthenticated: false })
  },

  isAuthenticated: false,

  setAuthenticated: (flag: boolean) => {
    set({ isAuthenticated: flag })
  },
}))

export default authStore
