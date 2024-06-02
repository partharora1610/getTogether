"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import { useToast } from "../ui/use-toast"

const formSchema = z.object({
  vendorName: z.string(),
  email: z.string(),
  service: z.string(),
})

const AddVendorForm = () => {
  const { eventId } = useParams()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendorName: "",
      email: "",
      service: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { vendorName, email } = values

    const response = await axios.post(
      `http://localhost:8000/events/${eventId}/invite/vendor`,
      {
        name: vendorName,
        email,
      },
      {
        withCredentials: true,
      }
    )

    if (response.status === 200) {
      toast({
        title: "Vendor Invited",
        description: "Vendor has been invited successfully",
        variant: "default",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to invite vendor",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="border-2 border-gray-100 px-6 py-8 rounded-md">
      <h2 className="text-xl font-medium mb-4">Send Vendor Invitation</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="vendorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Services Offered</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Invite Vendor</Button>
        </form>
      </Form>
    </div>
  )
}

export default AddVendorForm
