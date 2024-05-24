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
import PollForn from "@/components/forms/PollForm"
import ReminderForm from "@/components/forms/ReminderForm"

const Page = () => {
  return (
    <div>
      <OverviewHeader />
      <EventAnnouncement />
    </div>
  )
}

const OverviewHeader = () => {
  return (
    <div className="border-b-2 border-gray-300 pb-12 mb-8">
      <div className="">
        <div className="w-full h-[240px] bg-gray-400 mb-8"></div>
      </div>
      <div>
        <h2 className="text-3xl font-semibold text-center mb-2">
          Ranveer Wedding Night
        </h2>
        <p className="text-center text-lg text-gray-500">
          Lets celebrate ranveer special night together and make it a memorable
          one.
        </p>
      </div>

      <div className="flex items-center justify-center">
        <div className="mt-6 flex gap-4 items-center">
          <div className="w-[40px] h-[40px] bg-gray-500 rounded-sm"></div>
          <div className="text-center font-medium text-red-800 hover:underline cursor-pointer">
            SPECIAL MESSAGE FROM THE HOST
          </div>
        </div>
      </div>
    </div>
  )
}

const EventAnnouncement = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium mb-4 text-gray-700">
          Event Announcements
        </h3>
        <div>
          <CreateAnnoucementDialog />
        </div>
      </div>
      <div className="bg-white p-4 rounded-sm"></div>
    </div>
  )
}

const CreateAnnoucementDialog = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
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

const TabsComponent = () => {
  return (
    <Tabs defaultValue="account" className="w-full my-4">
      <TabsList>
        <TabsTrigger value="post">Post</TabsTrigger>
        <TabsTrigger value="poll">Poll</TabsTrigger>
        <TabsTrigger value="reminder">Reminder</TabsTrigger>
      </TabsList>
      <TabsContent value="post">
        <PostForm />
      </TabsContent>
      <TabsContent value="poll">
        <PollForn />
      </TabsContent>
      <TabsContent value="reminder">
        <ReminderForm />
      </TabsContent>
    </Tabs>
  )
}

export default Page
