import React from "react"
import { columns, guests } from "@/constants"
import { GuestList } from "@/components/table/guest-list"
import {
  PendingInviteCard,
  TotalCountCard,
} from "@/components/cards/guest-list-info"

const Page = () => {
  return (
    <div>
      <div className="flex gap-6 mt-10 px-10">
        <TotalCountCard />
        <PendingInviteCard />
      </div>
      <div className="container mx-auto py-10">
        <GuestList columns={columns} data={guests} />
      </div>
    </div>
  )
}

export default Page
