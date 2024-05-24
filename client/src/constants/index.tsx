"use client"
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
        <AcceptedTag />
      ) : status == "Declined" ? (
        <DeclinedTag />
      ) : (
        <NotAnsweredTag />
      )
    },
  },
  {
    accessorKey: "plusOnes",
    header: "Plus Ones",
  },
]

const AcceptedTag = () => {
  return (
    <span className="px-2 py-1 text-xs text-white bg-green-700/80 rounded-full">
      Accepted
    </span>
  )
}

const NotAnsweredTag = () => {
  return (
    <span className="px-2 py-1 text-xs text-white bg-gray-400 rounded-full">
      Not Answered
    </span>
  )
}

const DeclinedTag = () => {
  return (
    <span className="px-2 py-1 text-xs text-white bg-red-700/60 rounded-full">
      Declined
    </span>
  )
}

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
