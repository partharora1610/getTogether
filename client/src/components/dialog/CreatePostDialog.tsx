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
import axios from "axios"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Button } from "../ui/button"
import { PlusIcon } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import { Textarea } from "../ui/textarea"
import Image from "next/image"
import authStore from "@/store/auth-store"

const CreatePostDialog = () => {
  const { eventId } = useParams()
  const { primaryColor } = appearanceStore()
  const [text, setText] = useState<string>("")

  const bgClass = `bg-[${primaryColor}]/10 `
  const textClass = `text-[${primaryColor}]`

  const createPostHandler = async () => {
    const response = await axios.post(
      `http://localhost:8000/events/${eventId}/guest-post`,
      {
        text,
      },
      {
        withCredentials: true,
      }
    )

    console.log(response)

    if (response.status === 201) {
      console.log("Post created")
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className={`px-8 flex gap-1 py-4 ${textClass} bg-white hover:${bgClass}`}
        >
          <span>
            <PlusIcon size={20} />
          </span>
          <p>Create Post</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>
            Share with everyone that you are coming to the event
          </DialogTitle>
          <DialogDescription>
            <div className="grid mt-4 gap-12 grid-cols-2">
              <div className="flex flex-col  justify-between">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <Label className="text-lg text-gray-800">
                      Drop a message
                    </Label>
                    <Textarea
                      onChange={(e) => setText(e.target.value)}
                      className="w-full text-base"
                      placeholder="Write something"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Label className="text-lg text-gray-800">
                        Upload an image
                      </Label>
                      <p className="text-base">We need a happy selfie</p>
                    </div>

                    <div
                      className={`text-base underline font-semibold ${textClass}`}
                    >
                      Upload
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    className="px-8 py-4 w-full"
                    onClick={createPostHandler}
                  >
                    Post
                  </Button>
                </div>
              </div>

              <div>
                <FeedCardPreview text={text} />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

const FeedCardPreview = ({ text }: { text: string }) => {
  const { user } = authStore()

  return (
    <div className="shadow-md rounded-lg px-4 py-8">
      <div className="flex gap-4 items-center">
        <div className="w-[48px]  h-[48px] bg-gray-800 rounded-md"></div>

        <div>
          <p className="text-lg">
            {user.name} <span> Just confirmed his presence</span>
          </p>
          <p>[timestamp placeholder]</p>
        </div>
      </div>

      <div className="mt-4 mb-4">
        <p className="text-base">{text || "Your message goes here..."}</p>
      </div>

      <Image
        className="m-auto"
        src="/thumbsup.png"
        alt="service_headers"
        width={600}
        height={300}
      />
    </div>
  )
}

export default CreatePostDialog
