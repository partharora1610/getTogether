"use client"

import authStore from "@/store/auth-store"
import axios from "axios"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, setAuthenticated, setUser } = authStore()
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState<boolean>(true)

  const fetchUser = async () => {

    try {
      const response = await axios.post(
        "http://localhost:8000/user/me",
        {},
        {
          withCredentials: true,
        }
      )

      if (response.status === 200) {
        setAuthenticated(true);
        setUser(response.data.user);
        setLoading(false);
      } else {
        setAuthenticated(false);
        router.push(`/auth?callbackUrl=${encodeURIComponent(pathname + window.location.search)}`)
      }
    } catch (error) {
      console.error("Failed to fetch user", error)
      setAuthenticated(false);
      router.push(`/auth?callbackUrl=${encodeURIComponent(pathname + window.location.search)}`)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      fetchUser()
    }
  }, [isAuthenticated, router, setAuthenticated, setUser])

  if (loading) {
    return <></>
  }

  return <div>{children}</div>
}

export default AuthProvider
