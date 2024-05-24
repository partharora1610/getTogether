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
import React from "react"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"

const formSchema = z.object({
  message: z.string(),
})

const ALLVENDORS = [
  { name: "Vendor 1", id: 1 },
  { name: "Vendor 2", id: 2 },
]

const SendVendorInfo = () => {
  const [selectedVendors, setSelectedVendors] =
    React.useState<any[]>(ALLVENDORS)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const obj = {
      ...values,
      selectedVendors,
    }
    console.log(obj)
  }

  return (
    <div>
      <div className="grid gap-12 grid-cols-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Message"
                      className="text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {ALLVENDORS.map((vendor) => {
              return (
                <div className="flex justify-between items-center">
                  <label>{vendor.name}</label>
                  <Switch
                    value={vendor.id}
                    onChange={(e: any) => {
                      if (e.target.checked) {
                        setSelectedVendors([...selectedVendors, vendor])
                      } else {
                        setSelectedVendors(
                          selectedVendors.filter(
                            (selectedVendor) => selectedVendor.id !== vendor.id
                          )
                        )
                      }
                    }}
                  />
                </div>
              )
            })}

            <Button type="submit">Send Message</Button>
          </form>
        </Form>

        <div>
          <div className="">
            <h2 className="mb-4 text-lg text-black">Message Preview</h2>
            <p className="text-base">{form.getValues().message}</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendVendorInfo
