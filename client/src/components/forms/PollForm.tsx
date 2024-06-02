"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React from "react"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import eventStore from "@/store/event-store"

const formSchema = z.object({
  heading: z.string(),
  description: z.string(),
  sendEmail: z.boolean(),
  options: z.string(),
  allowMultiple: z.boolean(),
})

const PollForm = ({ eventId }: { eventId: string }) => {
  const [pollOptions, setPollOptions] = React.useState<string[]>([])
  const { toast } = useToast()
  const { addEventPoll } = eventStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: "",
      description: "",
      sendEmail: false,
      options: "",
      allowMultiple: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      ...values,
      options: pollOptions,
    })

    const { heading, description, sendEmail, allowMultiple } = values

    const response = await axios.post(
      `http://localhost:8000/events/${eventId}/polls`,
      {
        heading,
        description,
        sendEmail,
        allowMultiple,
        options: pollOptions,
      },
      {
        withCredentials: true,
      }
    )

    if (response.status === 200) {
      addEventPoll(response.data.data)

      toast({
        title: "Poll Created",
        description: "Poll has been created successfully",
        variant: "default",
      })
    } else {
      toast({
        title: "Poll Creation Failed",
        description: "Poll creation failed",
        variant: "destructive",
      })
    }

    console.log(response.data)
  }

  return (
    <div>
      <div className="grid gap-12 grid-cols-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="heading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heading</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sendEmail"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Send Email</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Send email to all the guests of the event
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allowMultiple"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Allow Multiple</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Send email to all the guests of the event
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="options"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Options</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <Input placeholder="shadcn" {...field} />
                      <div
                        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                          setPollOptions([...pollOptions, field.value])
                        }}
                      >
                        Add
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>

        <div>
          <div className="">
            <div className="border-2 border-gray-200 w-full rounded-md px-4 py-6">
              <div className="flex gap-4 items-center mb-4">
                <div className="min-w-[40px] min-h-[40px] bg-gray-300 rounded-sm"></div>
                <h3 className="font-medium text-lg text-black">
                  {form.getValues().heading}
                </h3>
              </div>

              <p className="text-base">{form.getValues().description}</p>
              {pollOptions.map((option: any) => {
                return (
                  <div
                    key={option.id}
                    className="flex gap-4 items-center mt-4 p-2 rounded-sm pl-4 border-2 border-gray-200 cursor-pointer"
                  >
                    <p className="text-base">{option}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PollForm
