import { create } from "zustand"
import axios from "axios"
import { useGoogleLogin } from "@react-oauth/google"

interface User {
  id: number
  name: string
  email: string
  role: string
}

type Store = {
  user: User | null
  login: any
}

const authStore = create<Store>()((set) => ({
  user: null,

  login: async () => {},

  // login: useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     console.log(tokenResponse)
  //   },
  //   onError: (err) => {
  //     console.log("Google login error:", err)
  //   },
  // }),
}))

export default authStore
