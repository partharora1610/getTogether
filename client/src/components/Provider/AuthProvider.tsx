"use client"

import authStore from "@/store/auth-store"
import { useRouter } from "next/navigation"
import React from "react"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { login, logout, isAuthenticated, user } = authStore()
  const router = useRouter()

  if (!isAuthenticated) {
    router.push("/auth")
  }

  return <div>{children}</div>
}

export default AuthProvider
