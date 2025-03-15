"use client";

import { FadeIn } from "@/components/fade-in";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-20">
      <div className="bg-primary/10 absolute top-1/3 right-0 h-72 w-72 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="font-header mb-4 text-center text-3xl font-bold md:text-4xl">
            About <span className="text-gradient glow">Techathon</span>
          </h2>
          <p className="text-muted-foreground font-body mx-auto mb-16 max-w-3xl text-center">
            An innovative and dynamic hackathon focused on solving real-world
            problems through app and web development.
          </p>
        </FadeIn>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <FadeIn direction="right">
            <div className="space-y-6">
              <h3 className="font-header mb-4 text-2xl font-bold">
                Vision & Mission
              </h3>
              <p className="text-muted-foreground font-body">
                Our mission is to provide a platform where participants can
                identify pressing challenges, design innovative solutions, and
                bring their ideas to life. By fostering a culture of teamwork,
                creativity, and technical excellence, we aim to inspire the next
                generation of developers and entrepreneurs.
              </p>
              <p className="text-muted-foreground font-body">
                Through this hackathon, we strive to bridge the gap between
                ideas and execution, while recognizing and rewarding exceptional
                talent and innovation.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="bg-secondary/50 border-secondary rounded-xl border p-6 backdrop-blur-xs">
              <h3 className="font-header mb-6 text-center text-2xl font-bold">
                Event Details
              </h3>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="bg-accent/10 rounded-lg p-3">
                    <Calendar className="text-accent h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-header font-semibold">Date</h4>
                    <p className="text-muted-foreground font-body">
                      April 10th - 13th, 2025
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="bg-accent/10 rounded-lg p-3">
                    <MapPin className="text-accent h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-header font-semibold">Location</h4>
                    <p className="text-muted-foreground font-body">
                      KFUPM, Dhahran, Saudi Arabia
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="bg-accent/10 rounded-lg p-3">
                    <Users className="text-accent h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-header font-semibold">Teams</h4>
                    <p className="text-muted-foreground font-body">
                      20 teams (3-5 members per team)
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
