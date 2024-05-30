"use client"
import React from "react"
import { columns } from "@/constants"
import { GuestList } from "@/components/table/guest-list"
import {
  PendingInviteCard,
  TotalCountCard,
} from "@/components/cards/guest-list-info"
import eventStore from "@/store/event-store"

export type Guest = {
  serialNo: number
  name: string
  rsvpStatus: "CONFIRMED" | "PEDNING" | "DECLINED"
  plusOnes: number
}

const Page = () => {
  const { guests } = eventStore()

  const formattedGuests = guests.map((guest: any, index: number) => {
    return {
      serialNo: index + 1,
      name: guest.guest.name,
      rsvpStatus: guest.guest.rsvps.status,
      plusOnes: guest.guest.plusOnes,
    }
  })

  const totalGuest = guests.reduce(
    (acc: number, guest: any) => acc + guest.guest.plusOnes,
    guests.length
  )

  return (
    <div>
      {/* <p>{JSON.stringify(guests)}</p> */}

      <div className="flex gap-6 mt-10 px-10">
        <TotalCountCard totalGuest={totalGuest} />
        <PendingInviteCard />
      </div>
      <div className="container mx-auto py-10">
        <GuestList columns={columns} data={formattedGuests} />
      </div>
    </div>
  )
}

export default Page
