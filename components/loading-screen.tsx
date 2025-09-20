"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

interface LoadingScreenProps {
  isVisible: boolean
  onComplete: () => void
}

export function LoadingScreen({ isVisible, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [isVisible, onComplete])

  if (isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-primary/10 via-background to-accent/10 flex flex-col items-center justify-center">
      {/* Logo animado */}
      <div className="mb-8 animate-float">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl">
          <Heart className="w-12 h-12 text-primary-foreground animate-pulse-soft" />
        </div>
      </div>

      {/* Texto */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">PetCare</h1>
        <p className="text-muted-foreground">Conectando con tu mascota...</p>
      </div>

      {/* Barra de progreso */}
      <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>

      {/* Porcentaje */}
      <p className="text-sm text-muted-foreground mt-4">{Math.round(progress)}%</p>

      {/* Puntos animados */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  )
}
