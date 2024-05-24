"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "../ui/button"
import { useState } from "react"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import SendVendorInfo from "../forms/SendVendorInfo"

const data: GuestInvite[] = [
  {
    id: "1",
    guestName: "John Doe",
    email: "hello.com",
  },
  {
    id: "m5gr84i9",
    guestName: "Hello World",
    email: "ken99@yahoo.com",
  },
  {
    id: "m5gr84i8",
    guestName: "Hello World",
    email: "yahoo.com",
  },
  {
    id: "m5gr84i9",
    guestName: "Hello World",
    email: "ken99@yahoo.com",
  },
  {
    id: "m5gr84i8",
    guestName: "Hello World",
    email: "yahoo.com",
  },
  {
    id: "m5gr84i9",
    guestName: "Hello World",
    email: "ken99@yahoo.com",
  },
  {
    id: "m5gr84i8",
    guestName: "Hello World",
    email: "yahoo.com",
  },
]

export type GuestInvite = {
  id: string
  guestName: string
  email: string
}

export const columns: ColumnDef<GuestInvite>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "guestName",
    header: "Guest Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("guestName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
]

function GuestInviteTable() {
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between mt-12">
        <Button
          onClick={() => {
            console.log(rowSelection)
          }}
          className="px-4 py-1"
        >
          Send Invite Email
        </Button>
      </div>
    </div>
  )
}

export const TotalCountCard = () => {
  return (
    <Card className="border-2 border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Total Confirmed Guest Count
        </CardTitle>
        <CardDescription className="mb-8">
          This shows total guest count along with plus ones entered by all the
          guest
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p className="text-2xl font-semibold">169 Guest</p>
        <ShareWithVendorDialog />
      </CardContent>
    </Card>
  )
}

export const PendingInviteCard = () => {
  return (
    <Card className="border-2 border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Pending Invites</CardTitle>
        <CardDescription className="mb-8">
          Till now <span className="underline cursor-pointer">23 guest</span>{" "}
          have not accepted their invite to the event workspace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end">
          <SendMailDialog />
          {/* <Button className="px-4 py-1">Send Invite Email</Button> */}
        </div>
      </CardContent>
    </Card>
  )
}

const SendMailDialog = () => {
  const [selectedGuest, setSelectedGuest] = useState([]) // intially it will be set to the whole array of emails

  const sendEmail = () => {
    // backend call
  }

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Send Batch Email</DialogTitle>

          <DialogDescription>
            <div className="mb-4 mt-8">
              <GuestInviteTable />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

const ShareWithVendorDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>Hello</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">
            Communicate the event Requirements with Vendors
          </DialogTitle>
          <DialogDescription>
            <SendVendorInfo />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
