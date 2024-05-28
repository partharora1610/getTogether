"use client"

import eventStore from "@/store/event-store"
import { useParams } from "next/navigation"
import React, { useEffect } from "react"

const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const params = useParams()
  const { fetchEventById, fecthUserRole } = eventStore()
  const eventId = params.eventId as string

  useEffect(() => {
    fecthUserRole(eventId)
    fetchEventById(eventId)
  }, [eventId])

  return <div>{children}</div>
}

export default EventProvider
