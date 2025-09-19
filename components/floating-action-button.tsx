"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, HelpCircle, Phone, Settings, Heart } from "lucide-react"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: Phone,
      label: "Emergencia",
      href: "tel:+34915123456",
      color: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    },
    {
      icon: Settings,
      label: "Perfil",
      href: "/profile",
      color: "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700",
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in-0 duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Botones de acción mejorados */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 space-y-4 animate-in slide-in-from-bottom-4 fade-in-0 duration-500">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <div
                key={action.label}
                className="flex items-center gap-4 animate-in slide-in-from-right-2 fade-in-0 hover-lift"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <span className="bg-card/90 backdrop-blur-sm text-card-foreground px-4 py-2 rounded-xl text-sm font-semibold shadow-xl border border-border/50 animate-slide-in-left whitespace-nowrap">
                  {action.label}
                </span>
                <Button
                  size="sm"
                  className={`w-14 h-14 rounded-full shadow-xl ${action.color} text-white hover-scale animate-breathe border-2 border-white/20`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => {
                    if (action.href.startsWith("tel:")) {
                      window.location.href = action.href
                    } else {
                      window.location.href = action.href
                    }
                    setIsOpen(false)
                  }}
                >
                  <Icon className="w-6 h-6" />
                </Button>
              </div>
            )
          })}
        </div>
      )}

      {/* Botón principal mejorado */}
      <div className="relative">
        {/* Anillo pulsante de fondo */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isOpen ? "bg-red-500/20 animate-ping" : "bg-primary/20 animate-pulse"
          }`}
        />

        {/* Botón principal */}
        <Button
          size="lg"
          className={`relative w-16 h-16 rounded-full shadow-2xl transition-all duration-500 border-2 border-white/20 ${
            isOpen
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rotate-45 scale-110 animate-glow"
              : "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 animate-float hover-scale"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-7 h-7 animate-spin" />
          ) : (
            <div className="relative">
              <HelpCircle className="w-7 h-7 animate-pulse-gentle" />
              <Heart className="w-3 h-3 absolute -top-1 -right-1 text-red-400 animate-heartbeat" />
            </div>
          )}
        </Button>

        {/* Partículas flotantes alrededor del botón */}
        {!isOpen && (
          <>
            <div
              className="absolute -top-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute -bottom-1 -right-3 w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce opacity-60"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute -top-3 -right-1 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-60"
              style={{ animationDelay: "1s" }}
            />
          </>
        )}
      </div>
    </div>
  )
}
