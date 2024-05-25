"use client"
import authStore from "@/store/auth-store"
import React from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { log } from "console"

const Navbar = () => {
  const router = useRouter()
  const { login, logout, isAuthenticated, user } = authStore()

  return (
    <div className="flex justify-between py-6 px-12 border-b-2 border-gray-100 ">
      <h2 className="">marketplace</h2>

      <nav className="flex gap-6 ">
        {isAuthenticated ? (
          <div className="flex gap-6">
            <div>{"user.name"}</div>
            <Button onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button onClick={() => router.push("/auth")}>Login</Button>
        )}
      </nav>
    </div>
  )
}

export default Navbar
