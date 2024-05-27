"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CompleteGuestProfileForm from "../forms/CompleteGuestProfileForm"

const CompleteGuestProfileDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="text-white">
        Please Complete your Profile
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl mb-4 ">
            Complete Guest Profile
          </DialogTitle>
          <DialogDescription>
            <CompleteGuestProfileForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CompleteGuestProfileDialog
