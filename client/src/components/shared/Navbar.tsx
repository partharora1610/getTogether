"use client"
import authStore from "@/store/auth-store"
import React from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import SwitchEventDialog from "../dialog/SwitchEventDialog"
import eventStore from "@/store/event-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { AVATARS } from "@/constants/avatars"
import { Role } from "@/types"
import HostIcon from "./HostIcon"

const Navbar = () => {
  const router = useRouter()
  const { isAuthenticated } = authStore()

  return (
    <nav className="flex items-center justify-between py-6 px-12 bg-white shadow-sm sticky top-0 z-50 ">
      <h2 className="font-bold text-sm">getTOGETHER</h2>

      <div className="flex gap-12 items-center">
        <div>
          <button
          onClick={() => router.push('/event/create')}
          className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
            Create New Event
          </button>
        </div>
        <div>
          <SwitchEventDialog />
        </div>
        {isAuthenticated ? (
          <div>
            <AuthDropdown />
          </div>
        ) : (
          <Button onClick={() => router.push("/auth")}></Button>
        )}
      </div>
    </nav>
  )
}

const AuthDropdown = () => {
  const { logout } = authStore()
  const { avatar, nickName } = eventStore()
  const { roleType } = eventStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {roleType == Role.HOST && (
          <div className="text-transparent">
            <HostIcon />
            hello
          </div>
        )}

        {roleType == Role.GUEST && (
          <img
            src={AVATARS[parseInt(avatar)]?.link}
            alt="image"
            width={40}
            height={40}
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-lg">{nickName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-base">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Navbar
