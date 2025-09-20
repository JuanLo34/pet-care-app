"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Thermometer,
  Droplets,
  Utensils,
  Activity,
  Play,
  Pause,
  BarChart3,
  ShoppingCart,
  User,
  Wifi,
  Battery,
  Zap,
  Moon,
  Sun,
} from "lucide-react"

interface PetStats {
  temperature: number
  heartRate: number
  hunger: number
  thirst: number
  foodLevel: number
  isActive: boolean
  activityLevel: number
  stressLevel: number
  hydrationLevel: number
}

export const globalPetData = {
  currentStats: {
    temperature: 38.5,
    heartRate: 85,
    hunger: 30,
    thirst: 45,
    foodLevel: 75,
    isActive: false,
    activityLevel: 65,
    stressLevel: 20,
    hydrationLevel: 80,
  },
  dailyHistory: [] as any[],
  weeklyActivity: [45, 62, 38, 71, 55, 48, 69], // Datos para gráficas semanales
}

export default function Dashboard() {
  const [petStats, setPetStats] = useState<PetStats>(globalPetData.currentStats)
  const [isSimulating, setIsSimulating] = useState(false)

  useEffect(() => {
    if (!isSimulating) return

    const interval = setInterval(() => {
      setPetStats((prev) => {
        const newStats = {
          temperature: Math.max(37, Math.min(40, prev.temperature + (Math.random() - 0.5) * 0.2)),
          heartRate: Math.max(60, Math.min(120, prev.heartRate + (Math.random() - 0.5) * 8)),
          hunger: Math.max(0, Math.min(100, prev.hunger + Math.random() * 2)),
          thirst: Math.max(0, Math.min(100, prev.thirst + Math.random() * 1.5)),
          foodLevel: Math.max(0, Math.min(100, prev.foodLevel - Math.random() * 0.5)),
          isActive: Math.random() > 0.7,
          activityLevel: Math.max(0, Math.min(100, prev.activityLevel + (Math.random() - 0.5) * 10)),
          stressLevel: Math.max(0, Math.min(100, prev.stressLevel + (Math.random() - 0.5) * 5)),
          hydrationLevel: Math.max(0, Math.min(100, prev.hydrationLevel + (Math.random() - 0.5) * 3)),
        }

        // Actualizar datos globales para coherencia
        globalPetData.currentStats = newStats

        // Agregar a historial diario
        globalPetData.dailyHistory.push({
          time: new Date().toLocaleTimeString(),
          ...newStats,
        })

        // Mantener solo últimas 50 entradas
        if (globalPetData.dailyHistory.length > 50) {
          globalPetData.dailyHistory = globalPetData.dailyHistory.slice(-50)
        }

        return newStats
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isSimulating])

  const getHealthStatus = () => {
    const temp = petStats.temperature
    const hr = petStats.heartRate

    if (temp < 37.5 || temp > 39.5 || hr < 70 || hr > 110) {
      return { status: "Alerta", color: "destructive" }
    } else if (temp < 38 || temp > 39 || hr < 75 || hr > 100) {
      return { status: "Precaución", color: "secondary" }
    }
    return { status: "Saludable", color: "default" }
  }

  const healthStatus = getHealthStatus()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 floating-particles">
      <div className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10 animate-slide-in-up">
        <div className="flex items-center justify-between p-2 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center animate-breathe hover-glow">
              <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground animate-heartbeat" />
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Koayaan
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground"></p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-3">
            <div className="flex items-center gap-1">
              <Wifi className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-green-500 animate-pulse-gentle" />
              <Battery className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-green-500" />
              <div className="w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <Badge variant={healthStatus.color as any} className="text-xs animate-pulse-gentle hover-scale">
              {healthStatus.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-4 space-y-3 sm:space-y-6">
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm hover-lift animate-slide-in-up animate-delay-100">
          <CardHeader className="pb-2 px-3 pt-3 sm:px-4 sm:pt-4">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-lg">
              <Activity
                className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${isSimulating ? "animate-wiggle text-green-500" : "text-muted-foreground"}`}
              />
              Control de tu masctota
              {isSimulating && <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 animate-pulse" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
            <Button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`w-full h-10 sm:h-14 text-xs sm:text-base font-semibold transition-all duration-300 hover-scale ${
                isSimulating
                  ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-glow"
                  : "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              }`}
            >
              {isSimulating ? (
                <div className="flex items-center gap-1.5">
                  <Pause className="w-3 h-3 sm:w-5 sm:h-5 animate-pulse" />
                  Detener+
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Play className="w-3 h-3 sm:w-5 sm:h-5" />
                  Iniciar+
                </div>
              )}
            </Button>
            {isSimulating && (
              <div className="text-center mt-2 animate-slide-in-up">
                <p className="text-xs text-muted-foreground animate-pulse-soft">
                  Datos actualizándose cada 2 segundos...
                </p>
                <div className="flex justify-center gap-1 mt-1">
                  <div className="w-1 h-1 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce animate-delay-100"></div>
                  <div className="w-1 h-1 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce animate-delay-200"></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 backdrop-blur-sm hover-lift animate-slide-in-left animate-delay-200">
            <CardContent className="p-2.5 sm:p-5">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-14 sm:h-14 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 rounded-full flex items-center justify-center animate-breathe">
                  <Thermometer className="w-4 h-4 sm:w-7 sm:h-7 text-red-600 animate-pulse-gentle" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground font-medium">Temperatura</p>
                  <p className="text-base sm:text-2xl font-bold text-red-600">{petStats.temperature.toFixed(1)}°C</p>
                  <p className="text-xs text-green-600 font-medium">Normal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 backdrop-blur-sm hover-lift animate-slide-in-right animate-delay-200">
            <CardContent className="p-2.5 sm:p-5">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-14 sm:h-14 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-800/40 rounded-full flex items-center justify-center animate-breathe">
                  <Heart className="w-4 h-4 sm:w-7 sm:h-7 text-pink-600 animate-heartbeat" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground font-medium">Frecuencia</p>
                  <p className="text-base sm:text-2xl font-bold text-pink-600">{Math.round(petStats.heartRate)}</p>
                  <p className="text-xs text-green-600 font-medium">BPM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm hover-lift animate-slide-in-up animate-delay-300">
          <CardHeader className="pb-2 px-3 pt-3 sm:px-4 sm:pt-4">
            <CardTitle className="text-sm sm:text-lg flex items-center gap-2">
              <Utensils className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-orange-500 animate-wiggle" />
              Necesidades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-6 px-3 pb-3 sm:px-4 sm:pb-4">
            <div className="animate-slide-in-left animate-delay-100">
              <div className="flex items-center justify-between mb-1.5 sm:mb-3">
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                    <Utensils className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-orange-600" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">Hambre</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{Math.round(petStats.hunger)}%</span>
              </div>
              <Progress value={petStats.hunger} className="h-1.5 sm:h-3 animate-progress" />
            </div>

            <div className="animate-slide-in-left animate-delay-200">
              <div className="flex items-center justify-between mb-1.5 sm:mb-3">
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Droplets className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-blue-600 animate-pulse-gentle" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">Sed</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{Math.round(petStats.thirst)}%</span>
              </div>
              <Progress value={petStats.thirst} className="h-1.5 sm:h-3 animate-progress" />
            </div>

            <div className="animate-slide-in-left animate-delay-300">
              <div className="flex items-center justify-between mb-1.5 sm:mb-3">
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <Utensils className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">Nivel de Alimento</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{Math.round(petStats.foodLevel)}%</span>
              </div>
              <Progress value={petStats.foodLevel} className="h-1.5 sm:h-3 animate-progress" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm hover-lift animate-slide-in-up animate-delay-400">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <div
                  className={`w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full ${petStats.isActive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                />
                <div className="flex items-center gap-1.5">
                  {petStats.isActive ? (
                    <Sun className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-yellow-500 animate-wiggle" />
                  ) : (
                    <Moon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-500 animate-pulse-gentle" />
                  )}
                  <span className="font-semibold text-sm sm:text-lg">
                    {petStats.isActive ? "Activo y Jugando" : "Descansando"}
                  </span>
                </div>
              </div>
              <Activity
                className={`w-4 h-4 sm:w-6 sm:h-6 ${
                  petStats.isActive ? "text-green-600 animate-bounce-gentle" : "text-gray-400 animate-pulse-gentle"
                }`}
              />
            </div>
            {petStats.isActive && (
              <div className="mt-2 text-xs sm:text-sm text-muted-foreground animate-slide-in-up">
                <p>Max está muy activo y necesita atención 🐕</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <Button
            variant="outline"
            className="h-14 sm:h-20 flex-col gap-1.5 sm:gap-3 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-0 shadow-lg hover-lift animate-slide-in-left animate-delay-500 hover-glow"
            onClick={() => (window.location.href = "/stats")}
          >
            <BarChart3 className="w-4 h-4 sm:w-7 sm:h-7 text-blue-500 animate-pulse-gentle" />
            <span className="text-xs sm:text-sm font-medium">Estadísticas</span>
          </Button>

          <Button
            variant="outline"
            className="h-14 sm:h-20 flex-col gap-1.5 sm:gap-3 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-0 shadow-lg hover-lift animate-slide-in-right animate-delay-500 hover-glow"
            onClick={() => (window.location.href = "/shop")}
          >
            <ShoppingCart className="w-4 h-4 sm:w-7 sm:h-7 text-green-500 animate-bounce-gentle" />
            <span className="text-xs sm:text-sm font-medium">Tienda</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:gap-4">
          <Button
            variant="outline"
            className="h-14 sm:h-20 flex-col gap-1.5 sm:gap-3 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-0 shadow-lg hover-lift animate-slide-in-right animate-delay-600 hover-glow"
            onClick={() => (window.location.href = "/profile")}
          >
            <User className="w-4 h-4 sm:w-7 sm:h-7 text-orange-500 animate-pulse-gentle" />
            <span className="text-xs sm:text-sm font-medium">Perfil</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
