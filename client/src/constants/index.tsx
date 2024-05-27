"use client"
import { NegativeTag, NeutralTag, PositiveTag } from "@/components/tags/tags"
import { ColumnDef } from "@tanstack/react-table"

export type Guest = {
  serialNo: number
  guestName: string
  rsvpStatus: "Accepted" | "Declined" | "Pending"
  plusOnes: number
}

export const columns: ColumnDef<Guest>[] = [
  {
    accessorKey: "serialNo",
    header: "Serial No.",
  },
  {
    accessorKey: "guestName",
    header: "Guest Name",
  },
  {
    accessorKey: "rsvpStatus",
    header: "RSVP Status",
    cell: ({ row }) => {
      const status = row.getValue("rsvpStatus")
      console.log(status)

      return status == "Accepted" ? (
        <PositiveTag text={"Accepted"} />
      ) : status == "Declined" ? (
        <NegativeTag text="Declined" />
      ) : (
        <NeutralTag text="Not Answered" />
      )
    },
  },
  {
    accessorKey: "plusOnes",
    header: "Plus Ones",
    cell: ({ row }) => {
      const plusOnes = row.getValue("plusOnes")

      if (plusOnes == 0) {
        return "NA"
      }

      return plusOnes
    },
  },
]

export const guests: Guest[] = [
  {
    serialNo: 1,
    guestName: "John Doe",
    rsvpStatus: "Accepted",
    plusOnes: 2,
  },
  {
    serialNo: 2,
    guestName: "Jane Smith",
    rsvpStatus: "Pending",
    plusOnes: 1,
  },
  {
    serialNo: 3,
    guestName: "Alice Johnson",
    rsvpStatus: "Declined",
    plusOnes: 0,
  },
  {
    serialNo: 4,
    guestName: "Robert Brown",
    rsvpStatus: "Accepted",
    plusOnes: 3,
  },
  {
    serialNo: 5,
    guestName: "Emily Davis",
    rsvpStatus: "Pending",
    plusOnes: 0,
  },
  {
    serialNo: 6,
    guestName: "Michael Wilson",
    rsvpStatus: "Accepted",
    plusOnes: 1,
  },
  {
    serialNo: 7,
    guestName: "Sarah Miller",
    rsvpStatus: "Declined",
    plusOnes: 0,
  },
  {
    serialNo: 8,
    guestName: "David Anderson",
    rsvpStatus: "Accepted",
    plusOnes: 2,
  },
  {
    serialNo: 9,
    guestName: "Linda Thomas",
    rsvpStatus: "Pending",
    plusOnes: 1,
  },
  {
    serialNo: 10,
    guestName: "James Jackson",
    rsvpStatus: "Accepted",
    plusOnes: 2,
  },
]

export const AVATARS = [
  {
    name: "Avatar 1",
    link: "https://api.dicebear.com/8.x/micah/svg?seed=Ginger",
  },
  {
    name: "Avatar 2",
    link: "https://api.dicebear.com/8.x/micah/svg?seed=Shadow",
  },
  {
    name: "Avatar 3",
    link: "https://api.dicebear.com/8.x/micah/svg?seed=Princess",
  },
  {
    name: "Avatar 4",
    link: "https://api.dicebear.com/8.x/open-peeps/svg?seed=Boo",
  },
  {
    name: "Avatar 5",
    link: "https://api.dicebear.com/8.x/personas/svg?seed=Mimi",
  },
  {
    name: "Avatar 6",
    link: "https://api.dicebear.com/8.x/micah/svg?seed=Baby",
  },
  {
    name: "Avatar 7",
    link: "https://api.dicebear.com/8.x/micah/svg?seed=Cleo",
  },
  {
    name: "Avatar 8",
    link: "https://api.dicebear.com/8.x/micah/svg?seed=Loki",
  },
]
