"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PostForm from "@/components/forms/PostForm"
import ReminderForm from "@/components/forms/ReminderForm"
import { usePathname } from "next/navigation"
import OverviewPostCard from "@/components/cards/OverviewPostCard"
import OverviewPollCard from "@/components/cards/OverviewPollCard"
import Video from "next-video"
import getStarted from "/videos/get-started.mp4"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import eventStore from "@/store/event-store"
import PollForm from "@/components/forms/PollForm"
import CompleteGuestProfileDialog from "@/components/dialog/CompleteGuestProfileDialog"
import appearanceStore from "@/store/appearance-store"
import { Role } from "@/types"

const Page = () => {
  const { loading } = eventStore()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-gray-50">
      <OverviewHeader />
      <EventAnnouncement />
    </div>
  )
}

const OverviewHeader = () => {
  const { event, roleType } = eventStore()

  return (
    <div className="border-b-2 bg-white border-gray-100 pb-12 mb-8 relative">
      <div className="w-full h-[240px] bg-gray-400 mb-8"></div>

      <h2 className="text-3xl font-semibold text-center mb-2">
        {event?.title}
      </h2>
      <p className="text-center text-lg text-gray-500">{event?.description}</p>

      <div className="flex items-center justify-center">
        <div className="mt-6 flex gap-4 items-center">
          <HostSpecialDialog />
        </div>
      </div>

      {roleType === Role.GUEST && (
        <div className="bg-black/30 px-4 py-4 mt-4 rounded-md cursor-pointer  absolute top-0 right-4 flex items-center justify-between">
          <CompleteGuestProfileDialog />
        </div>
      )}
    </div>
  )
}

const EventAnnouncement = () => {
  const { eventPolls, eventPosts } = eventStore()

  const allPosts = [...eventPosts, ...eventPolls]

  allPosts.sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)

    if (dateA < dateB) return 1
    if (dateA > dateB) return -1
    return 0
  })

  return (
    <div className="bg-white py-6 rounded-t-3xl">
      <div className="flex justify-between items-center pl-5 pr-5 mb-4">
        <h3 className="text-2xl font-medium mb-4 text-gray-950">
          Event Announcements
        </h3>
        <div>
          <CreateAnnoucementDialog />
        </div>
      </div>
      <div className="p-4 rounded-sm">
        <div className="flex flex-col gap-16">
          {allPosts.map((post) => {
            if (post.options) {
              return (
                <OverviewPollCard
                  id={post.id}
                  heading={post.heading}
                  description={post.description}
                  date={post.date}
                  options={post.options}
                />
              )
            }

            return (
              <OverviewPostCard
                heading={post.heading}
                description={post.description}
                date={post.date}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

const CreateAnnoucementDialog = () => {
  const { primaryColor } = appearanceStore()

  const textClass = `text-[${primaryColor}]`

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div
            className={`flex gap-1 ${textClass} items-center border-2 border-transparent px-4 py-2 rounded-md`}
          >
            <Plus size={20} />
            <button className="text-base font-medium">
              Create Announcement
            </button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription className="mb-4">
              Create annoucements and send it to all the guests.
              <TabsComponent />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const HostSpecialDialog = () => {
  const { primaryColor } = appearanceStore()

  const textClass = `text-[${primaryColor}]`
  const borderClass = `border-[${primaryColor}]`
  const hoverTextClass = `hover:text-${primaryColor}`
  const hoverBorderClass = `hover:border-${primaryColor}`

  const customShadow = `hover:shadow-custom-shadow-${primaryColor}`
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <button
            className={`px-4 py-2 rounded-md border border-black bg-white text-black text-sm ${hoverBorderClass}   ${hoverTextClass} hover: ${customShadow} transition duration-200`}
          >
            Special message from the host
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription className="mb-4">
              <h2 className="text-2xl text-center font-medium capitalize text-gray-950 mb-8">
                <span className="underline">Ranveer</span>, the host of the
                event has a special message for you.
              </h2>
              <div className="mb-6">
                <Video src={getStarted} controls />
              </div>
              <div>
                <p className="text-xl text-gray-700 leading-8">
                  Lets celebrate ranveer special night together and make it a
                  memorable one. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Corporis officia numquam, perspiciatis
                  nostrum exercitationem pariatur et necessitatibus, fugit aut
                  eaque sed non ipsa, dicta temporibus. Odio dolor impedit
                  dignissimos id nulla porro, placeat aliquid vero ipsum itaque
                  voluptatum doloribus amet, ullam eligendi omnis beatae dolorum
                  maiores
                </p>
              </div>

              <div className="mt-8 mb-4 flex justify-end">
                <Button
                  className={`text-base font-medium px-6 py-6 ${borderClass} border-2 bg-transparent ${textClass} hover:bg-[${primaryColor}] hover:text-white`}
                >
                  Take me to RSVP
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const TabsComponent = () => {
  const pathname = usePathname()
  const eventId = pathname.split("/")[2]

  return (
    <Tabs defaultValue="account" className="w-full my-4">
      <TabsList>
        <TabsTrigger value="post">Post</TabsTrigger>
        <TabsTrigger value="poll">Poll</TabsTrigger>
        <TabsTrigger value="reminder">Reminder</TabsTrigger>
      </TabsList>
      <TabsContent value="post">
        <PostForm eventId={eventId} />
      </TabsContent>
      <TabsContent value="poll">
        <PollForm eventId={eventId} />
      </TabsContent>
      <TabsContent value="reminder">
        <ReminderForm />
      </TabsContent>
    </Tabs>
  )
}

export default Page
