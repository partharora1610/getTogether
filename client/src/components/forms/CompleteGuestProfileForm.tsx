import React, { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import { AVATARS, Avatar } from "@/constants/avatars"
import { useParams } from "next/navigation"

const CompleteGuestProfileForm = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(AVATARS[0])
  const [nickName, setNickName] = useState<string>("")
  const params = useParams()
  const eventId = params.eventId as string

  const updateAvatarHandler = async () => {
    const response = await axios.post(
      `http://localhost:8000/events/${eventId}/guests/update`,
      {
        avatar: selectedAvatar.id,
        nickName: nickName,
      },
      {
        withCredentials: true,
      }
    )

    if (response.status == 200) {
      console.log("Avatar updated successfully")
    }
  }

  return (
    <div className="">
      <div className="mb-6">
        <Label className="text-base text-gray-900 font-medium">
          Select Event NickName
        </Label>
        <p>Keep it funny and relateable</p>
        <Input
          onChange={(e) => setNickName(e.target.value)}
          className="mt-2 text-base"
          placeholder="For ex: Grooms Uncle, Chacha "
        />
      </div>

      <div>
        <div className="mb-2">
          <Label className="text-base text-gray-900 font-medium">
            Select Avatar
          </Label>
        </div>

        <Tabs defaultValue="default" className="w-[400px] h-[440px]">
          <TabsList className="mb-2">
            <TabsTrigger value="default">Default</TabsTrigger>
            <TabsTrigger value="American">American</TabsTrigger>
            <TabsTrigger value="Indian">Indian</TabsTrigger>
            <TabsTrigger value="Punjabi">Punjabi</TabsTrigger>
          </TabsList>
          <TabsContent value="default">
            <div className="flex flex-wrap gap-8 mt-4">
              {AVATARS.map((avatar) => (
                <div
                  className={`p-2 rounded-full border-2 border-transparent ${
                    avatar.name == selectedAvatar.name
                      ? "border-2 border-l-gray-800 border-t-gray-800"
                      : ""
                  }`}
                  onClick={() => {
                    console.log(avatar)
                    setSelectedAvatar(avatar)
                  }}
                >
                  <img
                    key={avatar.name}
                    src={avatar.link}
                    alt={avatar.name}
                    className="w-20 h-20 rounded-full bg-gray-300 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="American" className="text-center mt-40">
            Coming Soon
          </TabsContent>
          <TabsContent value="Indian" className="text-center mt-40">
            Coming Soon
          </TabsContent>
          <TabsContent value="Punjabi" className="text-center mt-40">
            Coming Soon
          </TabsContent>
        </Tabs>
      </div>

      <Button className="mt-12 w-full" onClick={updateAvatarHandler}>
        Save
      </Button>
    </div>
  )
}

export default CompleteGuestProfileForm
