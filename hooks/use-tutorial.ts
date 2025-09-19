"use client"

import { useState, useEffect } from "react"

interface TutorialStep {
  id: string
  title: string
  description: string
  targetElement: string
  position: "top" | "bottom" | "left" | "right"
  action?: string
}

export function useTutorial(steps: TutorialStep[]) {
  const [isActive, setIsActive] = useState(false)
  const [hasCompletedTutorial, setHasCompletedTutorial] = useState(false)

  useEffect(() => {
    // Verificar si el usuario ya completó el tutorial
    const completed = localStorage.getItem("petcare-tutorial-completed")
    setHasCompletedTutorial(completed === "true")
  }, [])

  const startTutorial = () => {
    setIsActive(true)
  }

  const completeTutorial = () => {
    setIsActive(false)
    setHasCompletedTutorial(true)
    localStorage.setItem("petcare-tutorial-completed", "true")
  }

  const skipTutorial = () => {
    setIsActive(false)
  }

  const resetTutorial = () => {
    setHasCompletedTutorial(false)
    localStorage.removeItem("petcare-tutorial-completed")
  }

  return {
    isActive,
    hasCompletedTutorial,
    startTutorial,
    completeTutorial,
    skipTutorial,
    resetTutorial,
  }
}
