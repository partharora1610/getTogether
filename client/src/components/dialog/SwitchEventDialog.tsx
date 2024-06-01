"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import appearanceStore from "@/store/appearance-store"
import eventStore from "@/store/event-store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const SwitchEventDialog = () => {
  const router = useRouter()
  const { primaryColor } = appearanceStore()

  const textClass = `text-[${primaryColor}]`
  const borderClass = `border-[${primaryColor}]`
  const hoverTextClass = `hover:text-${primaryColor}`
  const hoverBorderClass = `hover:border-${primaryColor}`
  const bgClass = `bg-[${primaryColor}]/10`

  const { fetchEvents, events, loading } = eventStore()

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <Dialog>
      <DialogTrigger>
        <button className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
          Switch Event
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl mb-4">Switch Event</DialogTitle>
          <DialogDescription>
            {loading ? <div>Loading...</div> : null}

            <div className="flex flex-col gap-12">
              {events.map((event) => {
                return (
                  <div className="flex justify-between items-center  gap-4">
                    <div>
                      <h1 className="text-lg font-medium text-black">
                        {event.title}
                      </h1>
                      <p className="text-base">
                        {truncateText(event.description, 90)}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          router.push(`/event/${event.id}/overview`)
                        }}
                        className={`${bgClass} ${textClass} font-medium px-4 py-2 rounded-md`}
                      >
                        Switch
                      </button>
                    </div>
                  </div>
                )
              })}

              <div className="flex justify-end">
                <Link href="/event/create">
                  <button
                    onClick={() => {
                      router.push("/event/create")
                    }}
                    className={` ${textClass} ${borderClass} ${hoverTextClass} ${hoverBorderClass} hover:underline font-medium px-4 py-2 rounded-md`}
                  >
                    Create New Event
                  </button>
                </Link>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text
  }
  return text.substring(0, maxLength) + "..."
}

export default SwitchEventDialog
