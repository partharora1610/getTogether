import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const CreateEventAccordian = () => {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="basic">
          <AccordionTrigger className="text-lg">
            Basic Event Details
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="host_invite">
          <AccordionTrigger className="text-lg">Host Invite</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="media">
          <AccordionTrigger className="text-lg">
            Media Uploaded
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default CreateEventAccordian
