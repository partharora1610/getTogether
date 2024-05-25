"use client"
import authStore from "@/store/auth-store"
import React from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const router = useRouter()
  const { logout, isAuthenticated } = authStore()

  return (
    <nav className="flex justify-between py-6 px-12 bg-white shadow-sm sticky top-0 z-50 ">
      <h2 className="">marketplace</h2>

      <div className="flex gap-6 ">
        {isAuthenticated ? (
          <div className="flex gap-6">
            <div>{"user.name"}</div>
            <Button onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button onClick={() => router.push("/auth")}>Login</Button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
