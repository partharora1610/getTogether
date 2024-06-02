import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BadgeCent, PlusIcon } from "lucide-react"
import axios from "axios"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import appearanceStore from "@/store/appearance-store"

enum CHANNELS {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

const AddChannelDialog = ({ eventId }: { eventId: string }) => {
  const [channelName, setChannelName] = useState<string>("")
  const [channelType, setChannelType] = useState<string>(CHANNELS.PUBLIC)
  const { primaryColor } = appearanceStore()

  const textClass = `text-[${primaryColor}]`
  const bgClass = `bg-[${primaryColor}]/10`

  async function createChannel() {
    await axios.post(
      `http://localhost:8000/events/${eventId}/channels/create`,
      {
        name: channelName,
        channelType: channelType,
      },
      {
        withCredentials: true,
      }
    )
  }

  return (
    <Dialog>
      <DialogTrigger className="">
        <PlusIcon
          size={22}
          className={`${textClass} ${bgClass} rounded-md p-1 cursor-pointer`}
        />
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl mb-4">Create New Channel</DialogTitle>
          <DialogDescription className="flex flex-col gap-6">
            <div>
              <Label className="text-base text-gray-900 font-medium">
                Channel Name
              </Label>
              <Input
                onChange={(e) => setChannelName(e.target.value)}
                className="mt-2 text-base"
                placeholder="Enter channel name"
              />
            </div>

            <div>
              <Label className="text-base text-gray-900 font-medium">
                Select Channel Type
              </Label>

              <p>
                {channelType === "PUBLIC"
                  ? "All guest in the event can view this channel"
                  : "Only invited guest can view this channel"}
              </p>

              <div className="flex gap-6 mt-4">
                {Object.values(CHANNELS).map((channel) => (
                  <div
                    key={channel}
                    className={`p-2 rounded-md border-2 border-transparent cursor-pointer ${
                      channelType === channel
                        ? "border-2 border-gray-800 text-gray-800"
                        : ""
                    }`}
                    onClick={() => setChannelType(CHANNELS[channel])}
                  >
                    <p>{channel}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Button onClick={createChannel} className="mt-8 w-full">
                Create Channel
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddChannelDialog
