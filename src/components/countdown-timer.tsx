"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: Date
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      <div className="flex flex-col items-center">
        <div className="text-3xl md:text-4xl font-bold bg-secondary rounded-lg p-3 md:p-4 min-w-[80px] text-center">
          {timeLeft.days}
        </div>
        <span className="text-sm mt-2">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl md:text-4xl font-bold bg-secondary rounded-lg p-3 md:p-4 min-w-[80px] text-center">
          {timeLeft.hours}
        </div>
        <span className="text-sm mt-2">Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl md:text-4xl font-bold bg-secondary rounded-lg p-3 md:p-4 min-w-[80px] text-center">
          {timeLeft.minutes}
        </div>
        <span className="text-sm mt-2">Minutes</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl md:text-4xl font-bold bg-secondary rounded-lg p-3 md:p-4 min-w-[80px] text-center">
          {timeLeft.seconds}
        </div>
        <span className="text-sm mt-2">Seconds</span>
      </div>
    </div>
  )
}

