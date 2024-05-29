"use client"

import appearanceStore from "@/store/appearance-store"
import eventStore from "@/store/event-store"
import { useParams } from "next/navigation"
import React, { useEffect } from "react"

const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const params = useParams()
  const { fetchEventById, fecthUserRole, loading } = eventStore()
  const { fetchAppearance } = appearanceStore()
  const eventId = params.eventId as string

  // Getting the initial event Data
  useEffect(() => {
    // fecthUserRole(eventId)
    fetchEventById(eventId)
    fetchAppearance(eventId)
  }, [eventId])

  if (loading) {
    return <div>Loading</div>
  }

  return <div>{children}</div>
}

export default EventProvider
