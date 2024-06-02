"use client"
import { ContractViewOnly } from "@/components/dialog/CreateContractForm"
import { NegativeTag, NeutralTag, PositiveTag } from "@/components/tags/tags"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { useParams } from "next/navigation"
import React, { useEffect } from "react"

const Page = () => {
  const [contracts, setContracts] = React.useState<any>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const { toast } = useToast()
  const params = useParams()
  const eventId = params.eventId as string

  useEffect(() => {
    const fetchContracts = async () => {
      setLoading(true)
      const response = await axios.get(
        `https://fueled-41xn.onrender.com/events/${eventId}/contracts/all`,
        {
          withCredentials: true,
        }
      )

      if (response.status == 200) {
        setContracts(response.data.data.contract)
      } else {
        toast({
          title: "Contracts fetch failed",
          description: "Failed to fetch contracts",
          variant: "destructive",
        })
      }

      setLoading(false)
    }

    fetchContracts()
  }, [eventId, toast])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="">
      <div className="mt-8 pl-4 mb-4">
        <h1 className="text-xl font-semibold mb-1">My Contracts</h1>
        <p className="text-base text-gray-500">Manage all your contracts</p>
      </div>

      <div className="flex flex-wrap gap-8">
        <ContractCard key={contracts.id} contract={contracts} />
      </div>
    </div>
  )
}

const ContractCard = ({ contract }: { contract: any }) => {
  const { clientName } = JSON.parse(contract.contractData)

  return (
    <div className="border-2 border-gray-200 w-[600px] px-4 py-4 rounded-md">
      <div className="w-full">
        <div className="flex gap-4 items-start">
          <div className="min-w-[52px] h-[52px] bg-gray-500 rounded-md"></div>
          <div className="flex w-full justify-between">
            <div>
              <p className="text-lg">{clientName}</p>
              <p className="text-gray-500">
                Responsible for <span className="underline"> Catering </span>
              </p>
            </div>
            <div>
              {contract == null && <NeutralTag text={"No Contract"} />}
              {contract && contract.status == "SIGNED_BY_HOST" && (
                <NegativeTag text={"Action Required"} />
              )}

              {contract && contract.status == "SIGNED_BY_BOTH" && (
                <PositiveTag text={"Contract Signed"} />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6 gap-6">
          <Button size="sm" variant="outline">
            Chat
          </Button>

          {contract ? <ContractViewOnly contract={contract} /> : null}
        </div>
      </div>
    </div>
  )
}

export default Page
