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
import { useParams } from "next/navigation"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { Textarea } from "../ui/textarea"
import { ScrollArea } from "../ui/scroll-area"
import axios from "axios"
import appearanceStore from "@/store/appearance-store"

const InviteGuestDialog = () => {
  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  const { eventId } = useParams() as { eventId: string }
  const { primaryColor } = appearanceStore()
  const textClass = `text-[${primaryColor}]`

  const inviteGuestHandler = async () => {
    const response = await axios.post(
      `https://fueled-41xn.onrender.com:8000/events/${eventId}/invite/guest`,
      {
        name,
        email,
      },
      {
        withCredentials: true,
      }
    )
    console.log(response)
  }

  return (
    <Dialog>
      <DialogTrigger
        className={`${textClass} font-semibold hover:underline cursor-pointer`}
      >
        Invite Guest
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl mb-4">
            Add Guest to the event via email
          </DialogTitle>
          <DialogDescription>
            <Tabs defaultValue="default" className="w-[400px]">
              <TabsList className="mb-2">
                <TabsTrigger value="individual">Individual Invite</TabsTrigger>
                <TabsTrigger value="batch">Batch Invite</TabsTrigger>
              </TabsList>
              <TabsContent value="individual">
                <div className="flex flex-wrap gap-2 mt-4">
                  <Label className="text-base text-gray-900 font-medium">
                    Guest Name
                  </Label>
                  <Input
                    className=" text-base"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  />
                  <Label className="text-base text-gray-900 font-medium">
                    Guest Email
                  </Label>
                  <Input
                    className=" text-base"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </div>

                <Button className="mt-12 w-full" onClick={inviteGuestHandler}>
                  Send Invite
                </Button>
              </TabsContent>
              <TabsContent value="batch">
                <BatchEmail />
              </TabsContent>
            </Tabs>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

const BatchEmail = () => {
  const [emails, setEmails] = useState<string[]>([])
  const [emailString, setEmailString] = useState<string>("")

  useEffect(() => {
    setEmails(extractEmails(emailString))
  }, [emailString])

  return (
    <div>
      <div>
        <Label className="text-base text-gray-900 font-medium ">
          Guest Emails
        </Label>
        <div className="flex gap-2">
          <p>Enter list of email in different lines</p>
          <span className="underline cursor-pointer">See Format</span>
        </div>
        <Textarea
          rows={12}
          className="mt-2 text-base"
          value={emailString}
          onChange={(e) => setEmailString(e.target.value)}
        />
      </div>

      <div className="mt-6">
        {
          <div>
            <Label className="text-base text-gray-900 font-medium ">
              Emails{" "}
              <span className="text-gray-500">
                ({emails.length} identified){" "}
              </span>
            </Label>
            <ScrollArea className="mt-2 h-80">
              <div className="flex flex-col gap-4 mt-3">
                {emails.map((email, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-100 px-2 py-2 rounded-md"
                  >
                    <Label className="text-base text-gray-900 font-medium ">
                      {email}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        }
      </div>
      <div>
        <Button disabled className="mt-12 w-full">
          Bulk Invite Coming Soon
        </Button>
      </div>
    </div>
  )
}

function extractEmails(inputString: string): string[] {
  const normalizedString = inputString.replace(/,/g, "\n")
  const lines = normalizedString.split("\n")
  const emails = lines
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  return emails
}

export default InviteGuestDialog
