"use client"

import { FadeIn } from "@/components/fade-in"
import { motion } from "framer-motion"
import { Trophy, Medal, Sparkles } from "lucide-react"

export function PrizesSection() {
  return (
    <section id="prizes" className="py-20 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold font-header text-center mb-4">
            <span className="text-gradient glow">Prizes</span> & Recognition
          </h2>
          <p className="text-center text-muted-foreground font-body max-w-3xl mx-auto mb-16">
            Celebrating excellence and innovation with prestigious awards and valuable prizes.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FadeIn delay={0.1}>
            <motion.div
              className="bg-secondary/50 rounded-xl p-6 backdrop-blur-sm border border-secondary h-full flex flex-col items-center text-center"
              whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(234, 179, 8, 0.3)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="bg-accent/10 p-4 rounded-full mb-4">
                <Trophy className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold font-header mb-2">1st Place</h3>
              <p className="text-muted-foreground font-body mb-4">Top team with the most innovative and well-executed solution</p>
              <div className="mt-auto">
                <span className="text-2xl font-bold font-header text-gradient animate-shimmer bg-[linear-gradient(110deg,#ffd700,45%,#f5f5f5,55%,#ffd700)] bg-[length:250%_100%]">
                  Grand Prize
                </span>
              </div>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.div
              className="bg-secondary/50 rounded-xl p-6 backdrop-blur-sm border border-secondary h-full flex flex-col items-center text-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="bg-accent/10 p-4 rounded-full mb-4">
                <Medal className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold font-header mb-2">2nd Place</h3>
              <p className="text-muted-foreground font-body mb-4">Runner-up team with exceptional technical implementation</p>
              <div className="mt-auto">
                <span className="text-xl font-bold font-header">Silver Award</span>
              </div>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <motion.div
              className="bg-secondary/50 rounded-xl p-6 backdrop-blur-sm border border-secondary h-full flex flex-col items-center text-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="bg-accent/10 p-4 rounded-full mb-4">
                <Medal className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold font-header mb-2">3rd Place</h3>
              <p className="text-muted-foreground font-body mb-4">Third-place team demonstrating outstanding creativity</p>
              <div className="mt-auto">
                <span className="text-xl font-bold font-header">Bronze Award</span>
              </div>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <motion.div
              className="bg-secondary/50 rounded-xl p-6 backdrop-blur-sm border border-secondary h-full flex flex-col items-center text-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="bg-accent/10 p-4 rounded-full mb-4">
                <Sparkles className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold font-header mb-2">Special Awards</h3>
              <p className="text-muted-foreground font-body">Individual recognition for:</p>
              <ul className="text-muted-foreground font-body mt-2 mb-4">
                <li>Best Idea</li>
                <li>Most Innovative Design</li>
              </ul>
              <div className="mt-auto">
                <span className="text-xl font-bold font-header">Excellence Awards</span>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

