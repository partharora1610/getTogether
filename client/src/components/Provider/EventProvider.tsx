"use client"

import eventStore from "@/store/event-store"
import { usePathname } from "next/navigation"
import React, { useEffect } from "react"

const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const { fetchEventById } = eventStore()

  const eventId = pathname.split("/")[2]

  useEffect(() => {
    fetchEventById(eventId)
  }, [eventId])

  return <div>{children}</div>
}

export default EventProvider
