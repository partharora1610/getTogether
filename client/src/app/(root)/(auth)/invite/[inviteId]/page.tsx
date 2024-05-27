"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

const page = () => {
  const router = useRouter()
  const { inviteId } = useParams()
  const searchParams = useSearchParams()
  const role = searchParams.get("role")
  const eventId = searchParams.get("event")

  const acceptInvite = async () => {
    const response = await axios.post(
      `http://localhost:8000/events/${eventId}/invite/${inviteId}/accept/${role}`,
      {},
      {
        withCredentials: true,
      }
    )

    if (response.status === 200) {
      router.push(`/event/${eventId}/overview`)
    }

    console.log(response)
  }

  return (
    <div className="flex items-center justify-center h-full w-full mt-[100px]">
      <Button
        onClick={() => acceptInvite()}
        className="text-white w-[100px] h-[40px] bg-black"
      >
        Accept Invite
      </Button>
    </div>
  )
}

export default page
