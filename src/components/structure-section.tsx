"use client";

import { FadeIn } from "@/components/fade-in";
import { motion } from "framer-motion";
import { ClipboardList, Lightbulb, Code, Award } from "lucide-react";

export function StructureSection() {
  const phases = [
    {
      icon: <ClipboardList className="text-accent h-8 w-8" />,
      title: "Pre-Hackathon (Registration Period)",
      description:
        "Participants submit problem statements for evaluation. A panel of judges will assess the ideas based on impact, feasibility, innovation, and clarity. The top 20 teams with the most compelling ideas will be selected to advance.",
    },
    {
      icon: <Lightbulb className="text-accent h-8 w-8" />,
      title: "Designing Phase (April 10th)",
      description:
        "Teams will have 3 hours to conceptualize and design a complete website or application solution. This phase will test creativity, problem-solving skills, and ability to translate ideas into actionable designs. The top 10 teams will advance.",
    },
    {
      icon: <Code className="text-accent h-8 w-8" />,
      title: "Implementation Phase (April 11th-12th)",
      description:
        "The shortlisted teams will bring their designs to life by developing functional prototypes of their solutions. This phase will challenge their technical expertise, teamwork, and ability to deliver under pressure.",
    },
    {
      icon: <Award className="text-accent h-8 w-8" />,
      title: "Judging & Ceremony (April 13th)",
      description:
        "The final day will be dedicated to judging and the Awards Ceremony. Teams will showcase their solutions to the judges and present their ideas and implementation. The Top-3 teams will be announced along with individual prizes.",
    },
  ];

  return (
    <section
      id="structure"
      className="bg-secondary/20 relative overflow-hidden py-20"
    >
      <div className="bg-gradient-radial from-primary/5 absolute bottom-0 left-0 h-1/2 w-full to-transparent" />

      <div className="relative z-10 container mx-auto px-4">
        <FadeIn>
          <h2 className="font-header mb-4 text-center text-3xl font-bold md:text-4xl">
            Event <span className="text-gradient glow">Structure</span>
          </h2>
          <p className="text-muted-foreground font-body mx-auto mb-16 max-w-3xl text-center text-lg">
            The hackathon is structured into four intensive phases, each
            designed to test different aspects of innovation and development.
          </p>
        </FadeIn>

        <div className="relative">
          {/* Timeline connector (desktop only) */}
          <div className="from-accent via-primary to-accent absolute top-0 left-1/2 hidden h-full w-0.5 -translate-x-1/2 bg-linear-to-b md:block" />

          <div className="relative space-y-16 md:space-y-0">
            {phases.map((phase, index) => (
              <FadeIn
                key={index}
                direction={index % 2 === 0 ? "right" : "right"}
                delay={index * 0.2}
              >
                <div
                  className={`items-center md:flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline dot (desktop only) */}
                  <div
                    className="bg-accent absolute left-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 rounded-full md:block"
                    style={{ top: `calc(${index * 33.33}% + 2rem)` }}
                  />

                  <div
                    className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}
                  >
                    <motion.div
                      className="bg-secondary/20 border-secondary relative rounded-xl border p-6 backdrop-blur-xs"
                      whileHover={{ scale: 1.03 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    >
                      <div className="mb-4 flex items-center gap-4">
                        <div className="bg-accent/10 rounded-lg p-3">
                          {phase.icon}
                        </div>
                        <h3 className="font-header text-2xl font-bold">
                          {phase.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground font-body text-lg">
                        {phase.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
