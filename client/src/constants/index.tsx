"use client"
import { NegativeTag, NeutralTag, PositiveTag } from "@/components/tags/tags"
import { ColumnDef } from "@tanstack/react-table"

export type Guest = {
  serialNo: number
  name: string
  rsvpStatus: "Accepted" | "Declined" | "Pending"
  plusOnes: number
}

export const columns: ColumnDef<Guest>[] = [
  {
    accessorKey: "serialNo",
    header: "Serial No.",
  },
  {
    accessorKey: "name",
    header: "Guest Name",
  },
  {
    accessorKey: "rsvpStatus",
    header: "RSVP Status",
    cell: ({ row }) => {
      const status = row.getValue("rsvpStatus")

      return status == "CONFIRMED" ? (
        <PositiveTag text={"Confirmed"} />
      ) : status == "DECLINED" ? (
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
