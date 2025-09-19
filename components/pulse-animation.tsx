"use client"

import type React from "react"

interface PulseAnimationProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function PulseAnimation({ children, delay = 0, className = "" }: PulseAnimationProps) {
  return (
    <div className={`animate-pulse-gentle ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export function SlideInAnimation({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  direction?: "up" | "left" | "right"
  delay?: number
  className?: string
}) {
  const animationClass = {
    up: "animate-slide-in-up",
    left: "animate-slide-in-left",
    right: "animate-slide-in-right",
  }[direction]

  return (
    <div className={`${animationClass} ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export function FloatAnimation({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`animate-float ${className}`}>{children}</div>
}

export function HeartbeatAnimation({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`animate-heartbeat ${className}`}>{children}</div>
}
