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
import { useRouter } from "next/navigation"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const InviteGuestDialog = () => {
  const router = useRouter()

  return (
    <Dialog>
      <DialogTrigger>Invite Guest</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl mb-4">
            Add Guest via email to the event
          </DialogTitle>
          <DialogDescription>
            <Tabs defaultValue="default" className="w-[400px]">
              <TabsList className="mb-2">
                <TabsTrigger value="individual">Indiviidual Invite</TabsTrigger>
                <TabsTrigger value="batch">Batch Invite</TabsTrigger>
              </TabsList>
              <TabsContent value="individual">
                <div className="flex flex-wrap gap-2 mt-4">
                  <Label className="text-base text-gray-900 font-medium">
                    Guest Email
                  </Label>
                  <Input className=" text-base" placeholder="Enter email" />
                </div>

                <Button className="mt-12 w-full">Save</Button>
              </TabsContent>
              <TabsContent value="batch" className="text-center mt-40">
                Coming Soon
              </TabsContent>
            </Tabs>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default InviteGuestDialog
