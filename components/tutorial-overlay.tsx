"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ArrowRight, ArrowLeft } from "lucide-react"

interface TutorialStep {
  id: string
  title: string
  description: string
  targetElement: string
  position: "top" | "bottom" | "left" | "right"
  action?: string
}

interface TutorialOverlayProps {
  steps: TutorialStep[]
  isVisible: boolean
  onComplete: () => void
  onSkip: () => void
}

export function TutorialOverlay({ steps, isVisible, onComplete, onSkip }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!isVisible || !steps[currentStep]) return

    const targetElement = document.getElementById(steps[currentStep].targetElement)
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect()
      setTargetPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
    }
  }, [currentStep, isVisible, steps])

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!isVisible || !steps[currentStep]) return null

  const step = steps[currentStep]

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Spotlight en el elemento objetivo */}
      <div
        className="absolute w-20 h-20 rounded-full border-4 border-primary animate-pulse pointer-events-auto"
        style={{
          left: targetPosition.x - 40,
          top: targetPosition.y - 40,
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.6)",
        }}
      />

      {/* Tooltip con información */}
      <div
        className="absolute pointer-events-auto"
        style={{
          left: targetPosition.x,
          top: targetPosition.y + (step.position === "bottom" ? 60 : -120),
          transform: "translateX(-50%)",
        }}
      >
        <Card className="border-0 shadow-2xl bg-card max-w-xs">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-sm">{step.title}</h3>
              <Button variant="ghost" size="sm" onClick={onSkip} className="w-6 h-6 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{step.description}</p>

            {step.action && (
              <div className="mb-4 p-2 bg-accent/20 rounded-lg">
                <p className="text-xs font-medium text-accent-foreground">{step.action}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentStep ? "bg-primary" : "bg-muted"}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button variant="outline" size="sm" onClick={prevStep} className="h-8 px-3 bg-transparent">
                    <ArrowLeft className="w-3 h-3" />
                  </Button>
                )}
                <Button size="sm" onClick={nextStep} className="h-8 px-3">
                  {currentStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
                  {currentStep < steps.length - 1 && <ArrowRight className="w-3 h-3 ml-1" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flecha apuntando al elemento */}
        <div
          className={`absolute w-0 h-0 ${
            step.position === "bottom"
              ? "border-l-4 border-r-4 border-b-4 border-transparent border-b-card -top-2 left-1/2 transform -translate-x-1/2"
              : "border-l-4 border-r-4 border-t-4 border-transparent border-t-card -bottom-2 left-1/2 transform -translate-x-1/2"
          }`}
        />
      </div>
    </div>
  )
}
