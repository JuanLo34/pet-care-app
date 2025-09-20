"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PawPrint, Shield, Smartphone, Zap } from "lucide-react"

export default function LoginPage() {
  const [collarCode, setCollarCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)


  const handleLogin = async () => {
    if (!collarCode.trim()) return

    setIsLoading(true)
    // Simular validación del código
    setTimeout(() => {
      if (collarCode.length >= 6) {
        // Redirigir al dashboard
        window.location.href = "/dashboard"
      } else {
        alert("Código inválido. Debe tener al menos 6 caracteres.")
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <>
      <LoadingScreen isVisible={showLoadingScreen} onComplete={() => setShowLoadingScreen(false)} />

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 flex flex-col items-center justify-center p-4">
        {/* Header con logo */}
        <div className="text-center mb-8 animate-float">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <PawPrint className="w-10 h-10 text-primary-foreground animate-pulse-soft" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Koayaan</h1>
          <p className="text-muted-foreground text-balance">Monitorea la salud de tu mascota en tiempo real</p>
        </div>

        {/* Card de login */}
        <Card className="w-full max-w-md shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-card-foreground">Conecta tu Collar Inteligente</CardTitle>
            <CardDescription className="text-pretty">
              Ingresa el código único de tu collar Koayaan para acceder al dashboard de tu mascota
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="collar-code" className="text-sm font-medium text-card-foreground">
                Código del Collar
              </label>
              <Input
                id="collar-code"
                type="text"
                placeholder="Ej: PC-ABC123"
                value={collarCode}
                onChange={(e) => setCollarCode(e.target.value.toUpperCase())}
                className="text-center text-lg tracking-wider font-mono"
                maxLength={10}
              />
              <p className="text-xs text-muted-foreground text-center">
                Encuentra el código en la etiqueta de tu collar
              </p>
            </div>

            <Button
              onClick={handleLogin}
              disabled={!collarCode.trim() || isLoading}
              className="w-full h-12 text-base font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Conectando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Conectar Collar
                </div>
              )}
            </Button>

            {/* Características */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
                  <PawPrint className="w-5 h-5 text-accent-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">Monitoreo Cardíaco</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-5 h-5 text-accent-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">Datos Seguros</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground mb-2">¿No tienes un collar Koayaan?</p>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            <Smartphone className="w-4 h-4 mr-2" />
            Comprar Collar
          </Button>
        </div>
      </div>
    </>
  )
}
