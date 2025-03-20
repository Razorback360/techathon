"use client";

import { FadeIn } from "@/components/fade-in";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Can I participate in Techathon remotely?",
    answer: (
      <>
        <p className="mb-2">
          No, Techathon will be held over four days. The first (April 10) and
          last day (April 13) are in-person.
        </p>
        <p className="mb-2">
          First day (April 10) attendance is mandatory for all team members.
          Exceptions may be made for unavoidable reasons, but they must be
          approved in advance with our team.
        </p>
        <p>
          Last day (April 13) attendance is not mandatory, but at least one team
          member must be present for the final presentation. Missing members
          will not be included in photos or ceremony-related activities.
        </p>
      </>
    ),
  },
  {
    question: "Will travel and accommodation costs be covered by Techathon?",
    answer: (
      <p>
        No, all travel and accommodation expenses are the responsibility of
        participants. The event does not provide financial support for
        transportation or accommodation.
      </p>
    ),
  },
  {
    question: "Is there a specific theme for the hackathon?",
    answer: (
      <>
        <p className="mb-2">
          Participants must submit a problem statement as part of their
          registration.
        </p>
        <p>
          The hackathon theme will be announced on the first day and must be
          addressed in your solution.
        </p>
      </>
    ),
  },
  {
    question: "Are there specific tracks for projects?",
    answer: (
      <p>
        No, there are no predefined tracks. However, the hackathon&apos;s scope
        is limited to web and app development, each team must submit a problem
        statement during registration. This problem statement will be used to
        evaluate your acceptance into participating 20 teams, and to pick the
        hackathon theme, which will be announced on the first day.
      </p>
    ),
  },
  {
    question: "Are there any technical requirements or restrictions?",
    answer: (
      <>
        <p className="mb-2">
          There are no mandatory technologies or required tools.
        </p>
        <p className="mb-2">
          Teams are free to use any technology or framework of their choice.
        </p>
        <p>
          Teams are not required to implement any specific features into their
          apps.
        </p>
      </>
    ),
  },
  {
    question:
      "What details about evaluation criteria and resources can you provide?",
    answer: (
      <>
        <p className="mb-2">The evaluation criteria are not publicly shared.</p>
        <p>
          No specific resources or tools are provided—teams must come prepared
          with their own development environment and tools.
        </p>
      </>
    ),
  },
  {
    question: "What are the key attendance requirements?",
    answer: (
      <>
        <p className="mb-2">
          April 10 (First Day): Mandatory attendance for all team members.
        </p>
        <p className="mb-2">
          April 11-12 (Remote Work): No attendance required; All teams will work
          on their projects remotely.
        </p>
        <p>
          April 13 (Final Presentations & Ceremony): At least one team member
          must attend for the final presentation.
        </p>
      </>
    ),
  },
  {
    question: "What do I need to submit when registering?",
    answer: (
      <>
        <p className="mb-2">Each team member must provide:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Full Name</li>
          <li>National ID Number</li>
          <li>University Email</li>
          <li>Phone Number</li>
          <li>
            Student ID Card or Proof of Undergraduate Status (uploaded as an
            image or document)
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "Will all winners receive prize money?",
    answer: (
      <>
        <p className="mb-2">
          Yes! The total prize pool is over 30,000 SAR, and all award recipients
          will receive monetary prizes based on their standings. This includes:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>First Place</li>
          <li>Second Place</li>
          <li>Third Place</li>
          <li>2 Special Awards</li>
        </ul>
      </>
    ),
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="relative overflow-hidden py-20">
      {/* Background decorations */}
      <div className="bg-primary/10 absolute top-1/3 left-0 h-72 w-72 rounded-full blur-3xl" />
      <div className="bg-secondary/10 absolute right-0 bottom-1/3 h-72 w-72 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        <FadeIn>
          <div className="mb-4 flex items-center justify-center gap-3">
            <HelpCircle className="text-neon-blue h-8 w-8" />
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              Frequently Asked{" "}
              <span className="text-gradient glow">Questions</span>
            </h2>
          </div>
          <p className="text-muted-foreground mx-auto mb-16 max-w-3xl text-center">
            Find answers to common questions about Techathon 2025
          </p>
        </FadeIn>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-neon-blue/30 bg-secondary/10 overflow-hidden rounded-lg border backdrop-blur-sm"
                  >
                    <AccordionTrigger className="hover:bg-secondary/20 group px-6 py-4 hover:no-underline">
                      <span className="group-hover:text-neon-blue text-left font-medium transition-colors">
                        {index + 1}. {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground px-6 pt-2 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              </FadeIn>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
