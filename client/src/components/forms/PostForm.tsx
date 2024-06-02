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
import axios from "axios"
import eventStore from "@/store/event-store"
import { toast } from "../ui/use-toast"

const formSchema = z.object({
  heading: z.string(),
  description: z.string(),
  sendEmail: z.boolean(),
})

const PostForm = ({ eventId }: { eventId: string }) => {
  const { addEventPost } = eventStore()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: "",
      description: "",
      sendEmail: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { heading, description, sendEmail } = values

    const response = await axios.post(
      `http://localhost:8000/events/${eventId}/posts`,
      {
        heading,
        description,
        sendEmail,
      },
      {
        withCredentials: true,
      }
    )

    if (response.status == 200) {
      addEventPost(response.data.data)
      toast({
        title: "Post Added",
        description: "Post has been added successfully",
        variant: "default",
      })
    } else {
      toast({
        title: "Poll Creation Failed",
        description: "Poll creation failed",
        variant: "destructive",
      })
    }
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>

        <div>
          <div className="">
            <h2 className="mb-4 text-lg">Post Preview</h2>
            <div className="border-2 border-gray-200 w-full rounded-md px-4 py-6">
              <div className="flex gap-4 items-center mb-4">
                <div className="min-w-[40px] min-h-[40px] bg-gray-300 rounded-sm"></div>
                <h3 className="font-medium text-lg text-black">
                  {form.getValues().heading || "Your Post Title"}
                </h3>
              </div>

              <p className="text-base">
                {form.getValues().description || "Your Post Description"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostForm
