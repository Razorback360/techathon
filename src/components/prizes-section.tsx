"use client";

import { FadeIn } from "@/components/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Trophy, Medal, Sparkles } from "lucide-react";
import Link from "next/link";

export function PrizesSection() {
  return (
    <section id="prizes" className="relative overflow-hidden py-20">
      <div className="bg-accent/5 absolute top-1/4 left-0 h-72 w-72 rounded-full blur-3xl" />
      <div className="bg-primary/10 absolute right-0 bottom-1/4 h-72 w-72 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        <FadeIn>
          <h2 className="font-header mb-4 text-center text-3xl font-bold md:text-4xl">
            <span className="text-gradient glow">Prizes</span> & Recognition
          </h2>
          <p className="text-muted-foreground font-body mx-auto mb-16 max-w-3xl text-center">
            Celebrating excellence and innovation with prestigious awards and
            valuable prizes.
          </p>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FadeIn delay={0.1}>
            <motion.div
              className="bg-secondary/20 border-secondary flex h-full flex-col items-center rounded-xl border p-6 text-center backdrop-blur-xs"
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 20px rgba(234, 179, 8, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="bg-accent/10 mb-4 rounded-full p-4">
                <Trophy className="text-accent h-10 w-10" />
              </div>
              <h3 className="font-header mb-2 text-xl font-bold">1st Place</h3>
              <p className="text-muted-foreground font-body mb-4">
                Top team with the most innovative and well-executed solution
              </p>
              <div className="mt-auto">
                <span className="font-header text-gradient animate-shimmer bg-[linear-gradient(110deg,#ffd700,45%,#f5f5f5,55%,#ffd700)] bg-[length:250%_100%] text-2xl font-bold">
                  Grand Prize
                </span>
              </div>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.div
              className="bg-secondary/20 border-secondary flex h-full flex-col items-center rounded-xl border p-6 text-center backdrop-blur-xs"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="bg-accent/10 mb-4 rounded-full p-4">
                <Medal className="text-accent h-10 w-10" />
              </div>
              <h3 className="font-header mb-2 text-xl font-bold">2nd Place</h3>
              <p className="text-muted-foreground font-body mb-4">
                Runner-up team with exceptional technical implementation
              </p>
              <div className="mt-auto">
                <span className="font-header text-xl font-bold">
                  Silver Award
                </span>
              </div>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <motion.div
              className="bg-secondary/20 border-secondary flex h-full flex-col items-center rounded-xl border p-6 text-center backdrop-blur-xs"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="bg-accent/10 mb-4 rounded-full p-4">
                <Medal className="text-accent h-10 w-10" />
              </div>
              <h3 className="font-header mb-2 text-xl font-bold">3rd Place</h3>
              <p className="text-muted-foreground font-body mb-4">
                Third-place team demonstrating outstanding creativity
              </p>
              <div className="mt-auto">
                <span className="font-header text-xl font-bold">
                  Bronze Award
                </span>
              </div>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <motion.div
              className="bg-secondary/20 border-secondary flex h-full flex-col items-center rounded-xl border p-6 text-center backdrop-blur-xs"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="bg-accent/10 mb-4 rounded-full p-4">
                <Sparkles className="text-accent h-10 w-10" />
              </div>
              <h3 className="font-header mb-2 text-xl font-bold">
                Special Awards
              </h3>
              <p className="text-muted-foreground font-body">
                Individual recognition for:
              </p>
              <ul className="text-muted-foreground font-body mt-2 mb-4">
                <li>Best Idea</li>
                <li>Most Innovative Design</li>
              </ul>
              <div className="mt-auto">
                <span className="font-header text-xl font-bold">
                  Excellence Awards
                </span>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>

      {/* <div className="relative z-10 container mx-auto flex justify-center px-4 pt-12">
        <Link
          href="https://forms.gle/rVZSGH5zWUk5SGNG7"
          target="_blank"
          className={buttonVariants({
            variant: "secondary",
            size: "lg",
            className: "w-[1/4]",
          })}
        >
          More Details
        </Link>
      </div> */}
    </section>
  );
}
