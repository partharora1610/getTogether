"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
import CreateEventAccordian from "../accordian/CreateEventAccordian"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  startDate: z.date(),
  startTime: z.string(),
  endDate: z.string(),
  venue: z.string(),
  coverImage: z.string(), // image
  sadImage: z.string(), // image
  hostInviteVideo: z.string().optional(), // video
  hostMessage: z.string().optional(), // text
})

const CreateEventForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date(),
      startTime: "",
      endDate: "",
      venue: "",
      coverImage: "",
      sadImage: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="">
      <div className="grid gap-12 grid-cols-3">
        <div className="col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Event Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        className="text-lg py-2 px-4"
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
                        className="text-lg py-2 px-4"
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <span>Pick a date</span>

                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Your date of birth is used to calculate your age.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Start Time</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          className="text-lg py-2 px-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <span>Pick a date</span>

                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Your date of birth is used to calculate your age.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Venue</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        className="text-lg py-2 px-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Event Cover Image
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className="text-lg py-2 px-4"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload an image related to the event
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sadImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Sad Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className="text-lg py-2 px-4"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Will be used on the cancel RSVP card.{" "}
                        <span className="underline cursor-pointer">
                          VIEW SAMPLE
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hostInviteVideo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Host Invite Video
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className="text-lg py-2 px-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="hostMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Host Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Host Message"
                        className="text-lg py-2 px-4"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This message will be displayed to all the guest along with
                      the invite video.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>

        <div className="col-span-1">
          <h1 className="text-2xl font-semibold uppercase text-center text-gray-400 mb-8">
            Event Preview
          </h1>
          <CreateEventAccordian />
        </div>
      </div>
    </div>
  )
}

export default CreateEventForm
