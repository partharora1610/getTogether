import { create } from "zustand"
import axios from "axios"

interface User {
  id: number
  name: string
  email: string
  role: string
}

type Store = {
  user: User | null
  login: any
  logout: any
  isAuthenticated: boolean
}

const authStore = create<Store>()((set) => ({
  user: null,
  login: async ({ token }: { token: string }) => {
    console.log("token", token)
    const { data } = await axios.post("http://localhost:8000/auth/google", {
      token: token,
    })
    console.log("data", data)

    if (data.message === "Ok") {
      localStorage.setItem("binod", data.token)
      set({ user: data.user, isAuthenticated: true })
      return true
    }

    return false
  },

  logout: async () => {
    localStorage.removeItem("binod")
    set({ user: null, isAuthenticated: false })
  },

  isAuthenticated: false,
}))

export default authStore
