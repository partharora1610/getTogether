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
// import CreateEventAccordian from "../accordian/CreateEventAccordian"
import { useRouter } from "next/navigation"
import axios from "axios"

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  startDate: z.string(),
  startTime: z.string(),
  endDate: z.string(),
})

const CreateEventForm = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      startTime: "",
      endDate: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, description, startDate, endDate, startTime } = values

    const response = await axios.post(
      "https://fueled-41xn.onrender.com/events",
      {
        title,
        description,
        startDate,
        endDate,
        startTime,
      },
      {
        withCredentials: true,
      }
    )

    if (response.status === 201) {
      const {
        data: { id },
      } = response.data

      router.push(`/event/${id}/overview`)
    }
  }

  return (
    <div className="">
      <div className="grid gap-12 grid-cols-3">
        <div className="col-span-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Event Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Event Title"
                        className="text-lg py-7 px-4"
                        {...field}
                      />
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
                    <FormLabel className="text-base">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Event Descripiton"
                        {...field}
                        className="text-lg py-5 px-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="text-lg py-7 px-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          className="text-lg py-7 px-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="text-lg py-7 px-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-end">
                <Button className="mt-2 py-6 px-12" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* <div className="col-span-1">
          <h1 className="text-2xl font-semibold uppercase text-center text-gray-400 mb-8">
            Event Preview
          </h1>
          <CreateEventAccordian />
        </div> */}
      </div>
    </div>
  )
}

export default CreateEventForm
