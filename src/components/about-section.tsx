"use client"

import { FadeIn } from "@/components/fade-in"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-header">
            About <span className="text-gradient glow">Techathon</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-16 font-body">
            An innovative and dynamic hackathon focused on solving real-world problems through app and web development.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4 font-header">Vision & Mission</h3>
              <p className="text-muted-foreground font-body">
                Our mission is to provide a platform where participants can identify pressing challenges, design
                innovative solutions, and bring their ideas to life. By fostering a culture of teamwork, creativity, and
                technical excellence, we aim to inspire the next generation of developers and entrepreneurs.
              </p>
              <p className="text-muted-foreground font-body">
                Through this hackathon, we strive to bridge the gap between ideas and execution, while recognizing and
                rewarding exceptional talent and innovation.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="bg-secondary/50 rounded-xl p-6 backdrop-blur-xs border border-secondary">
              <h3 className="text-2xl font-bold mb-6 text-center font-header">Event Details</h3>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold font-header">Date</h4>
                    <p className="text-muted-foreground font-body">April 10th - 13th, 2025</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold font-header">Location</h4>
                    <p className="text-muted-foreground font-body">KFUPM, Dhahran, Saudi Arabia</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold font-header">Audience</h4>
                    <p className="text-muted-foreground font-body">20 teams (3-5 members per team)</p>
                    <p className="text-muted-foreground font-body">150-200 attendees for judging day</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

