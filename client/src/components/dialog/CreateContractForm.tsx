"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import contractStore from "@/store/contract-store"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import axios from "axios"
import { useToast } from "../ui/use-toast"
import { useParams } from "next/navigation"
import { Role } from "@/types"
import eventStore from "@/store/event-store"

const CreateContractForm = ({ vendorId }: { vendorId: string }) => {
  const { isValid, clearStore, getDataObject } = contractStore()
  const { toast } = useToast()
  const params = useParams()
  const eventId = params.id as string

  const handleCreateContract = async () => {
    const json = getDataObject()
    clearStore()

    const response = await axios.post(
      `https://fueled-41xn.onrender.com/events/${eventId}/contracts/create`,
      {
        vendorId: vendorId,
        contractData: JSON.stringify(json),
      },
      {
        withCredentials: true,
      }
    )

    if (response.status === 200) {
      toast({
        title: "Contract Created",
        description: "Contract has been created successfully",
        variant: "default",
      })
    } else {
      toast({
        title: "Error",
        description: "An error occurred while creating the contract",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" variant="outline">
          Create Contract
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-xl">
            Create Contract for Vendor Name
          </DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-5 gap-8">
              <div className="col-span-3">
                <div className="h-[900px] border-2 border-transparent rounded-md p-4">
                  <div className="flex flex-col justify-between h-full">
                    <ContractForm />
                    <Button
                      // disabled={!isValid}
                      size="lg"
                      onClick={handleCreateContract}
                    >
                      Create Contract
                    </Button>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <ScrollArea className="h-[900px] border-2 border-gray-500 rounded-md px-4 py-4 text-lg">
                  <ContractPreview />
                </ScrollArea>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

const ContractPreview = () => {
  const {
    clientEmail,
    clientName,
    clientPhone,
    vendorAddress,
    vendorBusinessName,
    vendorPhoneNumber,
    vendorContactPerson,
    vendorEmail,
    eventDate,
    eventTime,
    eventVenue,
    eventVenueAddress,
    services,
    paymentTotal,
    paymentSchedule,
    paymentMethod,
    cancellationPolicyClient,
    cancellationPolicyVendor,
  } = contractStore()

  return (
    <div>
      <div className="mb-16">
        <h3 className="text-gray-900 text-xl mb-2 font-medium bg-blue-100 p-2">
          Client Details
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Name:</span> {clientName}
          </div>
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Phone:</span> {clientPhone}
          </div>
          <div className="flex flex-col  gap-2 text-gray-800">
            <span className="font-semibold">Email:</span> {clientEmail}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-gray-900 text-xl mb-2 font-medium bg-blue-100 p-2">
          Vendor Details
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Business Name:</span>{" "}
            {vendorBusinessName}
          </div>
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Contact Person:</span>{" "}
            {vendorContactPerson}
          </div>
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Address:</span> {vendorAddress}
          </div>
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Phone Number:</span>{" "}
            {vendorPhoneNumber}
          </div>
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Email:</span> {vendorEmail}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-gray-900 text-xl mb-2 font-medium bg-blue-100 p-2">
          Event Details
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Venue:</span> {eventVenue}
          </div>
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Venue Address:</span>{" "}
            {eventVenueAddress}
          </div>
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Date:</span> {eventDate}
          </div>
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Time:</span> {eventTime}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-gray-900 text-xl mb-2 bg-blue-100 p-2 font-medium">
          Services
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-gray-800">{services}</div>
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-gray-900 text-xl mb-2 font-medium bg-blue-100 p-2">
          Payment Terms
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Total:</span> {paymentTotal}
          </div>
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Method:</span> {paymentMethod}
          </div>
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Schedule:</span> {paymentSchedule}
          </div>
        </div>
      </div>
      <div className="mb-16">
        <h3 className="text-gray-900 text-xl mb-2 font-medium bg-blue-100 p-2">
          Cancellation Policy
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Client:</span>{" "}
            {cancellationPolicyClient}
          </div>
          <div className="flex flex-col gap-2 text-gray-800">
            <span className="font-semibold">Vendor:</span>{" "}
            {cancellationPolicyVendor}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-gray-900 text-xl mb-2 font-medium bg-blue-100 p-2">
          Liability
        </h3>
        <div className="flex flex-col gap-4">
          The Vendor shall not be liable for any damages, including but not
          limited to, property damage or personal injury that occur at the Event
          Venue. The Client agrees to indemnify and hold harmless the Vendor
          from any and all claims, damages, or expenses arising from the Event.
          <br />
          <br />
          <span className="font-bold">Force Majeure</span> Neither party shall
          be liable for any failure or delay in performing their obligations
          under this Contract if such failure or delay is caused by
          circumstances beyond their reasonable control, including but not
          limited to, acts of God, war, pandemic, or natural disasters.
          <br />
          <br />
          <span className="font-bold">Govering Law</span> This Contract shall be
          governed by and construed in accordance with the laws of the State of
          <br />
          <br />
          <span className="font-bold">Entire Agreement </span>
          This Contract constitutes the entire agreement between the parties and
          supersedes all prior agreements, representations, and understandings
          of the parties. Any amendments or modifications to this Contract must
          be in writing and signed by both parties.
        </div>
      </div>
    </div>
  )
}

const ContractForm = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="client_details">
        <AccordionTrigger className="text-lg text-gray-700">
          Client Details
        </AccordionTrigger>
        <AccordionContent>
          <ClientDetailsForm />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="vendor_details">
        <AccordionTrigger className="text-lg text-gray-700">
          Vendor Details
        </AccordionTrigger>
        <AccordionContent>
          <VendorDetailsForm />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="event_details">
        <AccordionTrigger className="text-lg text-gray-700">
          Event Details
        </AccordionTrigger>
        <AccordionContent>
          <EventDetailsForm />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="services">
        <AccordionTrigger className="text-lg text-gray-700">
          Services
        </AccordionTrigger>
        <AccordionContent>
          <ServicesForm />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="payment_terms">
        <AccordionTrigger className="text-lg text-gray-700">
          Payment Terms
        </AccordionTrigger>
        <AccordionContent>
          <PaymentTermsForm />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="cancellation_policy">
        <AccordionTrigger className="text-lg text-gray-700">
          Cancellation Policy
        </AccordionTrigger>
        <AccordionContent>
          <CancellationPolicyForm />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

const ClientDetailsForm = () => {
  const { updateField, clientEmail, clientPhone, clientName } = contractStore()

  return (
    <div className="flex flex-col flex-col gap-4 px-2 pb-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="text-base">
          Name
        </Label>
        <Input
          id="name"
          className="text-lg"
          placeholder="Enter Client Name"
          value={clientName}
          onChange={(e) => updateField("clientName", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="text-base">
            Phone
          </Label>
          <Input
            id="phone"
            className="text-lg"
            placeholder="Enter Client Phone"
            value={clientPhone}
            onChange={(e) => updateField("clientPhone", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-base">
            Email
          </Label>
          <Input
            id="email"
            className="text-lg"
            placeholder="Enter Client Email"
            value={clientEmail}
            onChange={(e) => updateField("clientEmail", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

const VendorDetailsForm = () => {
  const {
    updateField,
    vendorAddress,
    vendorBusinessName,
    vendorPhoneNumber,
    vendorContactPerson,
    vendorEmail,
  } = contractStore()

  return (
    <div className="flex flex-col gap-6 px-2 pb-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-base">Vendor Business Name</Label>
          <Input
            className="text-lg "
            placeholder="Enter Client Name"
            value={vendorBusinessName}
            onChange={(e) => updateField("vendorBusinessName", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-base">Vendor Contact Person</Label>
          <Input
            id="phone"
            className="text-lg "
            placeholder="Enter Client Phone"
            value={vendorContactPerson}
            onChange={(e) => updateField("vendorContactPerson", e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-base">Vendor Address</Label>
        <Input
          id="email"
          className="text-lg "
          placeholder="Enter Client Email"
          value={vendorAddress}
          onChange={(e) => updateField("vendorAddress", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-base">Vendor Phone Number</Label>
          <Input
            id="email"
            className="text-lg "
            placeholder="Enter Client Email"
            value={vendorPhoneNumber}
            onChange={(e) => updateField("vendorPhoneNumber", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-base">Vendor Email</Label>
          <Input
            id="email"
            className="text-lg "
            placeholder="Enter Client Email"
            value={vendorEmail}
            onChange={(e) => updateField("vendorEmail", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

const EventDetailsForm = () => {
  const { updateField, eventDate, eventTime, eventVenue, eventVenueAddress } =
    contractStore()

  return (
    <div className="flex flex-col gap-6 px-2 pb-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-base">Venue</Label>
          <Input
            className="text-lg "
            placeholder="venue name"
            value={eventVenue}
            onChange={(e) => updateField("eventVenue", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-base">Venue Address</Label>
          <Input
            className="text-lg "
            placeholder="venue address"
            value={eventVenueAddress}
            onChange={(e) => updateField("eventVenueAddress", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-base">Event Date</Label>
          <Input
            type="date"
            className="text-lg "
            placeholder="event date"
            value={eventDate}
            onChange={(e) => updateField("eventDate", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-base">Event Time</Label>
          <Input
            type="time"
            className="text-lg "
            placeholder="event time"
            value={eventTime}
            onChange={(e) => updateField("eventTime", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

const ServicesForm = () => {
  const { updateField, services } = contractStore()
  return (
    <div className="flex flex-col gap-6 px-2 pb-6">
      <div className="flex flex-col gap-2">
        <Label className="text-base">Services</Label>
        <Textarea
          rows={6}
          className="text-lg "
          placeholder="write service promised by the vendor"
          value={services}
          onChange={(e) => updateField("services", e.target.value)}
        />
      </div>
    </div>
  )
}

const PaymentTermsForm = () => {
  const { updateField, paymentTotal, paymentSchedule, paymentMethod } =
    contractStore()

  return (
    <div className="flex flex-col gap-6 px-2 pb-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-base">paymentTotal</Label>
          <Input
            type="number"
            className="text-lg "
            placeholder="Total payment amount"
            value={paymentTotal}
            onChange={(e) => updateField("paymentTotal", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-base">paymentMethod</Label>
          <Input
            className="text-lg "
            placeholder="Payment method"
            value={paymentMethod}
            onChange={(e) => updateField("paymentMethod", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-base">paymentSchedule</Label>
        <Textarea
          className="text-lg "
          placeholder="payment schedule"
          value={paymentSchedule}
          onChange={(e) => updateField("paymentSchedule", e.target.value)}
        />
      </div>
    </div>
  )
}

const CancellationPolicyForm = () => {
  const { updateField, cancellationPolicyClient, cancellationPolicyVendor } =
    contractStore()

  return (
    <div className="flex flex-col gap-6 px-2 pb-6">
      <div className="flex flex-col gap-2">
        <Label className="text-base">Cancellation Policy for Client</Label>
        <Textarea
          className="text-lg "
          placeholder="Cancellation policy for client"
          value={cancellationPolicyClient}
          onChange={(e) =>
            updateField("cancellationPolicyClient", e.target.value)
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-base">Cancellation Policy for Vendor</Label>
        <Textarea
          className="text-lg "
          placeholder="Cancellation policy for vendor"
          value={cancellationPolicyVendor}
          onChange={(e) =>
            updateField("cancellationPolicyVendor", e.target.value)
          }
        />
      </div>
    </div>
  )
}

export const ContractViewOnly = ({ contract }: { contract: any }) => {
  const { roleType } = eventStore()
  const { toast } = useToast()

  const {
    clientEmail,
    clientName,
    clientPhone,
    vendorAddress,
    vendorBusinessName,
    vendorPhoneNumber,
    vendorContactPerson,
    vendorEmail,
    eventDate,
    eventTime,
    eventVenue,
    eventVenueAddress,
    services,
    paymentTotal,
    paymentSchedule,
    paymentMethod,
    cancellationPolicyClient,
    cancellationPolicyVendor,
  } = JSON.parse(contract.contractData)

  const onAcceptContract = async () => {
    const response = await axios.put(
      `https://fueled-41xn.onrender.com/events/${contract.eventId}/contracts/${contract.id}/status`,
      {},
      {
        withCredentials: true,
      }
    )

    if (response.status === 200) {
      toast({
        title: "Contract Accepted",
        description: "Contract has been accepted successfully",
        variant: "default",
      })
    } else {
      toast({
        title: "Error",
        description: "An error occurred while accepting the contract",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" variant="outline">
          View Contract
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="mb-4 text-xl">View Contract</DialogTitle>
          <DialogDescription>
            <div>
              <ScrollArea className="h-[900px] border-2 border-gray-100 rounded-md px-4 py-4 text-lg">
                <div>
                  <div className="mb-16">
                    <h3 className="text-gray-900 text-xl mb-2 font-medium bg-blue-100 p-2">
                      Client Details
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Name:</span>{" "}
                        {clientName}
                      </div>
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Phone:</span>{" "}
                        {clientPhone}
                      </div>
                      <div className="flex flex-col  gap-2 text-gray-800">
                        <span className="font-semibold">Email:</span>{" "}
                        {clientEmail}
                      </div>
                    </div>
                  </div>

                  <div className="mb-16">
                    <h3 className="text-gray-900 text-xl mb-2 font-medium bg-blue-100 p-2">
                      Vendor Details
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Business Name:</span>{" "}
                        {vendorBusinessName}
                      </div>
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Contact Person:</span>{" "}
                        {vendorContactPerson}
                      </div>
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Address:</span>{" "}
                        {vendorAddress}
                      </div>
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Phone Number:</span>{" "}
                        {vendorPhoneNumber}
                      </div>
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Email:</span>{" "}
                        {vendorEmail}
                      </div>
                    </div>
                  </div>

                  <div className="mb-16">
                    <h3 className="text-gray-900 text-xl mb-2 font-medium bg-blue-100 p-2">
                      Event Details
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Venue:</span>{" "}
                        {eventVenue}
                      </div>
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Venue Address:</span>{" "}
                        {eventVenueAddress}
                      </div>
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Date:</span> {eventDate}
                      </div>
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Time:</span> {eventTime}
                      </div>
                    </div>
                  </div>

                  <div className="mb-16">
                    <h3 className="text-gray-900 text-xl mb-2 bg-blue-100 p-2 font-medium">
                      Services
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2 text-gray-800">
                        {services}
                      </div>
                    </div>
                  </div>

                  <div className="mb-16">
                    <h3 className="text-gray-900 text-xl mb-2 font-medium bg-blue-100 p-2">
                      Payment Terms
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Total:</span>{" "}
                        {paymentTotal}
                      </div>
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Method:</span>{" "}
                        {paymentMethod}
                      </div>
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Schedule:</span>{" "}
                        {paymentSchedule}
                      </div>
                    </div>
                  </div>
                  <div className="mb-16">
                    <h3 className="text-gray-900 text-xl mb-2 font-medium bg-blue-100 p-2">
                      Cancellation Policy
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Client:</span>{" "}
                        {cancellationPolicyClient}
                      </div>
                      <div className="flex flex-col gap-2 text-gray-800">
                        <span className="font-semibold">Vendor:</span>{" "}
                        {cancellationPolicyVendor}
                      </div>
                    </div>
                  </div>

                  <div className="mb-16">
                    <h3 className="text-gray-900 text-xl mb-2 font-medium bg-blue-100 p-2">
                      Liability
                    </h3>
                    <div className="flex flex-col gap-4">
                      The Vendor shall not be liable for any damages, including
                      but not limited to, property damage or personal injury
                      that occur at the Event Venue. The Client agrees to
                      indemnify and hold harmless the Vendor from any and all
                      claims, damages, or expenses arising from the Event.
                      <br />
                      <br />
                      <span className="font-bold">Force Majeure</span> Neither
                      party shall be liable for any failure or delay in
                      performing their obligations under this Contract if such
                      failure or delay is caused by circumstances beyond their
                      reasonable control, including but not limited to, acts of
                      God, war, pandemic, or natural disasters.
                      <br />
                      <br />
                      <span className="font-bold">Govering Law</span> This
                      Contract shall be governed by and construed in accordance
                      with the laws of the State of
                      <br />
                      <br />
                      <span className="font-bold">Entire Agreement </span>
                      This Contract constitutes the entire agreement between the
                      parties and supersedes all prior agreements,
                      representations, and understandings of the parties. Any
                      amendments or modifications to this Contract must be in
                      writing and signed by both parties.
                    </div>
                  </div>
                </div>
              </ScrollArea>
              {Role.VENDOR == roleType && (
                <div className="flex mt-4">
                  <Button
                    disabled={contract.status == "SIGNED_BY_BOTH"}
                    onClick={onAcceptContract}
                    className="p-4 w-full py-6"
                  >
                    {contract.status == "SIGNED_BY_BOTH"
                      ? "Aleady Side By Both Parties"
                      : "Accept Contract"}
                  </Button>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CreateContractForm
