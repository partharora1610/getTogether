"use client"

import authStore from "@/store/auth-store"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, setAuthenticated, setUser } = authStore()
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.post("http://localhost:8000/user/me", {
        withCredentials: true,
      })

      console.log("From AuthProvider.tsx")
      console.log("response", response)

      if (response.status === 200) {
        setAuthenticated(true)
        setUser(response.data.user)
      }
    }

    fetchUser()

    if (!isAuthenticated) {
      router.push("/auth")
    }
  }, [isAuthenticated, router])

  return <div>{children}</div>
}

export default AuthProvider
