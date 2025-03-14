"use client"

import { FadeIn } from "@/components/fade-in"
import { motion } from "framer-motion"
import { ClipboardList, Lightbulb, Code, Award } from "lucide-react"

export function StructureSection() {
  const phases = [
    {
      icon: <ClipboardList className="h-8 w-8 text-accent" />,
      title: "Pre-Hackathon",
      description:
        "Participants submit problem statements for evaluation. A panel of judges will assess the ideas based on impact, feasibility, innovation, and clarity. The top 20 teams with the most compelling ideas will be selected to advance.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-accent" />,
      title: "Designing Phase (April 10th)",
      description:
        "Teams will have 3 hours to conceptualize and design a complete website or application solution. This phase will test creativity, problem-solving skills, and ability to translate ideas into actionable designs. The top 10 teams will advance.",
    },
    {
      icon: <Code className="h-8 w-8 text-accent" />,
      title: "Implementation Phase (April 11th-12th)",
      description:
        "The shortlisted teams will bring their designs to life by developing functional prototypes of their solutions. This phase will challenge their technical expertise, teamwork, and ability to deliver under pressure.",
    },
    {
      icon: <Award className="h-8 w-8 text-accent" />,
      title: "Judging & Ceremony (April 13th)",
      description:
        "The final day will be dedicated to judging and the Awards Ceremony. Teams will showcase their solutions to the judges and present their ideas and implementation. The Top-3 teams will be announced along with individual prizes.",
    },
  ]

  return (
    <section id="structure" className="py-20 bg-secondary/30 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-radial from-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold font-header text-center mb-4 ">
            Event <span className="text-gradient glow">Structure</span>
          </h2>
          <p className="text-center text-muted-foreground font-body max-w-3xl mx-auto mb-16 ">
            The hackathon is structured into four intensive phases, each designed to test different aspects of
            innovation and development.
          </p>
        </FadeIn>

        <div className="relative">
          {/* Timeline connector (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-linear-to-b from-accent via-primary to-accent -translate-x-1/2" />

          <div className="space-y-16 md:space-y-0 relative">
            {phases.map((phase, index) => (
              <FadeIn key={index} direction={index % 2 === 0 ? "right" : "right"} delay={index * 0.2}>
                <div className={`md:flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Timeline dot (desktop only) */}
                  <div
                    className="hidden md:block absolute left-1/2 w-8 h-8 bg-accent rounded-full -translate-x-1/2 z-10"
                    style={{ top: `calc(${index * 33.33}% + 2rem)` }}
                  />

                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                    <motion.div
                      className="bg-secondary/50 p-6 rounded-xl backdrop-blur-xs border border-secondary relative"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-accent/10 p-3 rounded-lg">{phase.icon}</div>
                        <h3 className="text-xl font-bold font-header">{phase.title}</h3>
                      </div>
                      <p className="text-muted-foreground font-body">{phase.description}</p>
                    </motion.div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

