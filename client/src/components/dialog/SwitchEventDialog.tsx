"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import eventStore from "@/store/event-store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const SwitchEventDialog = () => {
  const router = useRouter()
  const { fetchEvents, events, loading } = eventStore()

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <Dialog>
      <DialogTrigger>Switch Event</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl mb-4">Switch Event</DialogTitle>
          <DialogDescription>
            {loading ? <div>Loading...</div> : null}

            <div className="flex flex-col gap-12">
              {events.map((event) => {
                return (
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h1 className="text-lg font-medium text-black">
                        {event.title}
                      </h1>
                      <p className="text-base">{event.description}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          router.push(`/event/${event.id}/overview`)
                        }}
                        className="bg-primary-400/5 text-primary-400 px-4 py-2 rounded-md hover:bg-primary-400/10"
                      >
                        Switch
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SwitchEventDialog
