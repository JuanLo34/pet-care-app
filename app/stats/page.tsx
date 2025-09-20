"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Heart,
  Thermometer,
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  ArrowLeft,
  Target,
  Award,
  Zap,
  Droplets,
  Moon,
  Sun,
} from "lucide-react"

import { globalPetData } from "../dashboard/page"

const generateRealisticHealthData = () => {
  if (globalPetData.dailyHistory.length > 0) {
    return globalPetData.dailyHistory.map((entry) => ({
      ...entry,
      temperatura: entry.temperature || entry.temperatura,
      frecuenciaCardiaca: entry.heartRate || entry.frecuenciaCardiaca,
      actividad: entry.activityLevel || entry.actividad,
      estres: entry.stressLevel || entry.estres,
      hidratacion: entry.hydrationLevel || entry.hidratacion,
      calorias: Math.random() * 50 + 20,
    }))
  }

  const data = []
  const now = new Date()

  for (let i = 47; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 30 * 60 * 1000) // Cada 30 minutos
    const hour = time.getHours()

    // Patrones realistas basados en la hora del día
    let baseTemp = 38.5
    let baseHeart = 85
    let baseActivity = 50

    // Temperatura más baja en la madrugada, más alta en la tarde
    if (hour >= 2 && hour <= 6) baseTemp -= 0.3
    if (hour >= 14 && hour <= 18) baseTemp += 0.2

    // Frecuencia cardíaca más baja durante el sueño
    if (hour >= 22 || hour <= 6) baseHeart -= 15
    if (hour >= 8 && hour <= 12) baseHeart += 10

    // Actividad alta durante el día, baja en la noche
    if (hour >= 6 && hour <= 20) baseActivity += Math.sin(((hour - 6) / 14) * Math.PI) * 40
    else baseActivity = Math.random() * 10

    data.push({
      time: time.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      fullTime: time,
      temperatura: baseTemp + (Math.random() - 0.5) * 0.4,
      frecuenciaCardiaca: baseHeart + (Math.random() - 0.5) * 10,
      actividad: Math.max(0, Math.min(100, baseActivity + (Math.random() - 0.5) * 20)),
      estres: Math.random() * 30,
      hidratacion: 85 + Math.random() * 15,
      calorias: Math.random() * 50 + 20,
    })
  }
  return data
}

const generateWeeklyData = () => {
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
  return days.map((day, index) => ({
    day,
    pasos: globalPetData.weeklyActivity[index] * 150 + 7000, // Convertir actividad a pasos
    calorias: Math.floor(Math.random() * 200) + 400,
    tiempoActivo: Math.floor(Math.random() * 120) + 180,
    tiempoDescanso: Math.floor(Math.random() * 60) + 480,
    calidad_sueno: Math.floor(Math.random() * 20) + 75,
  }))
}

const healthZones = [
  { name: "Excelente", value: 45, color: "#22c55e" },
  { name: "Bueno", value: 30, color: "#3b82f6" },
  { name: "Regular", value: 20, color: "#f59e0b" },
  { name: "Precaución", value: 5, color: "#ef4444" },
]

export default function StatsPage() {
  const [healthData, setHealthData] = useState(generateRealisticHealthData())
  const [weeklyData, setWeeklyData] = useState(generateWeeklyData())
  const [selectedPeriod, setSelectedPeriod] = useState("24h")
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive && selectedPeriod === "24h") {
        setHealthData(generateRealisticHealthData())
        setWeeklyData(generateWeeklyData()) // Actualizar datos semanales también
      }
    }, 15000) // Actualizar cada 15 segundos

    return () => clearInterval(interval)
  }, [selectedPeriod, isLive])

  const currentStats = {
    temperatura: globalPetData.currentStats.temperature || healthData[healthData.length - 1]?.temperatura || 38.5,
    frecuenciaCardiaca:
      globalPetData.currentStats.heartRate || healthData[healthData.length - 1]?.frecuenciaCardiaca || 85,
    actividad: globalPetData.currentStats.activityLevel || healthData[healthData.length - 1]?.actividad || 65,
    estres: globalPetData.currentStats.stressLevel || healthData[healthData.length - 1]?.estres || 15,
    hidratacion: globalPetData.currentStats.hydrationLevel || healthData[healthData.length - 1]?.hidratacion || 92,
  }

  const calculateTrend = (data: any[], key: string) => {
    if (data.length < 2) return "stable"
    const recent = data.slice(-6).map((d) => d[key])
    const avg1 = recent.slice(0, 3).reduce((a, b) => a + b, 0) / 3
    const avg2 = recent.slice(-3).reduce((a, b) => a + b, 0) / 3
    const diff = ((avg2 - avg1) / avg1) * 100

    if (diff > 2) return "up"
    if (diff < -2) return "down"
    return "stable"
  }

  const trends = {
    temperatura: calculateTrend(healthData, "temperatura"),
    frecuenciaCardiaca: calculateTrend(healthData, "frecuenciaCardiaca"),
    actividad: calculateTrend(healthData, "actividad"),
    estres: calculateTrend(healthData, "estres"),
  }

  const radialData = [
    { name: "Salud General", value: 92, fill: "#22c55e" },
    { name: "Actividad", value: Math.round(currentStats.actividad), fill: "#3b82f6" },
    { name: "Hidratación", value: Math.round(currentStats.hidratacion), fill: "#06b6d4" },
    { name: "Bienestar", value: Math.round(100 - currentStats.estres * 2), fill: "#8b5cf6" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <div className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = "/dashboard")}
              className="p-1.5 sm:p-2 hover:scale-110 transition-transform"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-base sm:text-lg">Estadísticas Avanzadas</h1>
              <p className="text-xs text-muted-foreground">Análisis en tiempo real de tu mascota</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Badge variant={isLive ? "default" : "outline"} className="gap-1 animate-pulse-gentle text-xs">
              <div
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              ></div>
              {isLive ? "EN VIVO" : "PAUSADO"}
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setIsLive(!isLive)} className="p-1.5 sm:p-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Thermometer className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    Temperatura
                  </p>
                  <p className="text-base sm:text-xl font-bold">{currentStats.temperatura.toFixed(1)}°C</p>
                  <p className="text-xs text-green-600">Normal</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-1">
                    <Thermometer className="w-4 h-4 sm:w-6 sm:h-6 text-red-500" />
                  </div>
                  {trends.temperatura === "up" ? (
                    <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
                  ) : trends.temperatura === "down" ? (
                    <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500" />
                  ) : (
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-400 rounded-full"></div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    Frecuencia
                  </p>
                  <p className="text-base sm:text-xl font-bold">{Math.round(currentStats.frecuenciaCardiaca)}</p>
                  <p className="text-xs text-green-600">BPM</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center mb-1">
                    <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-pink-500 animate-pulse-gentle" />
                  </div>
                  {trends.frecuenciaCardiaca === "up" ? (
                    <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
                  ) : trends.frecuenciaCardiaca === "down" ? (
                    <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500" />
                  ) : (
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-400 rounded-full"></div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    Actividad
                  </p>
                  <p className="text-base sm:text-xl font-bold">{Math.round(currentStats.actividad)}%</p>
                  <p className="text-xs text-blue-600">Activo</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-1">
                    <Activity className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500" />
                  </div>
                  {trends.actividad === "up" ? (
                    <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
                  ) : trends.actividad === "down" ? (
                    <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500" />
                  ) : (
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-400 rounded-full"></div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    Estrés
                  </p>
                  <p className="text-base sm:text-xl font-bold">{Math.round(currentStats.estres)}%</p>
                  <p className="text-xs text-green-600">Bajo</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-1">
                    <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-purple-500" />
                  </div>
                  {trends.estres === "up" ? (
                    <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500" />
                  ) : trends.estres === "down" ? (
                    <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
                  ) : (
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-400 rounded-full"></div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2 sm:pb-3 px-4 pt-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              Resumen de Salud General
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={150}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={radialData}>
                  <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-3 sm:mt-4">
              {radialData.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span className="text-xs sm:text-sm">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-1.5 sm:gap-2">
          {[
            { key: "24h", label: "24h", icon: Clock },
            { key: "7d", label: "7d", icon: Sun },
            { key: "30d", label: "30d", icon: Moon },
          ].map((period) => (
            <Button
              key={period.key}
              variant={selectedPeriod === period.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period.key)}
              className="flex-1 gap-1 sm:gap-2 hover:scale-105 transition-transform text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
            >
              <period.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              {period.label}
            </Button>
          ))}
        </div>

        <Tabs defaultValue="vitales" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card/80 backdrop-blur-sm h-9 sm:h-10">
            <TabsTrigger value="vitales" className="text-xs sm:text-sm">
              Vitales
            </TabsTrigger>
            <TabsTrigger value="actividad" className="text-xs sm:text-sm">
              Actividad
            </TabsTrigger>
            <TabsTrigger value="bienestar" className="text-xs sm:text-sm">
              Bienestar
            </TabsTrigger>
            <TabsTrigger value="logros" className="text-xs sm:text-sm">
              Logros
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vitales" className="space-y-3 sm:space-y-4">
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-2 sm:pb-3 px-4 pt-4">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <Thermometer className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                  Temperatura Corporal - Últimas 24h
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="time"
                      fontSize={9}
                      stroke="hsl(var(--muted-foreground))"
                      interval="preserveStartEnd"
                    />
                    <YAxis domain={[37.5, 39.5]} fontSize={9} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => [`${value.toFixed(1)}°C`, "Temperatura"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="temperatura"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ fill: "#ef4444", strokeWidth: 1, r: 3 }}
                      activeDot={{ r: 4, stroke: "#ef4444", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-2 sm:pb-3 px-4 pt-4">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-500 animate-pulse-gentle" />
                  Frecuencia Cardíaca - Patrón Diario
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="time"
                      fontSize={9}
                      stroke="hsl(var(--muted-foreground))"
                      interval="preserveStartEnd"
                    />
                    <YAxis domain={[60, 120]} fontSize={9} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => [`${Math.round(value)} BPM`, "Frecuencia"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="frecuenciaCardiaca"
                      stroke="#ec4899"
                      fill="#ec4899"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actividad" className="space-y-3 sm:space-y-4">
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-2 sm:pb-3 px-4 pt-4">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                  Actividad Semanal
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" fontSize={9} stroke="hsl(var(--muted-foreground))" />
                    <YAxis fontSize={9} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "black",
                      }}
                      labelStyle={{ color: "black" }}
                      itemStyle={{ color: "black" }}
                    />
                    <Bar dataKey="pasos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
                <CardContent className="p-3 sm:p-4">
                  <div className="text-center">
                    <p className="text-lg sm:text-2xl font-bold text-primary">12,450</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Pasos Hoy</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
                <CardContent className="p-3 sm:p-4">
                  <div className="text-center">
                    <p className="text-lg sm:text-2xl font-bold text-primary">2.5h</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Tiempo Activo</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bienestar" className="space-y-3 sm:space-y-4">
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-2 sm:pb-3 px-4 pt-4">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <Target className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                  Distribución de Estados de Salud
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={healthZones} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                      {healthZones.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "black",
                      }}
                      labelStyle={{ color: "black" }}
                      itemStyle={{ color: "black" }}
                      formatter={(value, name) => [`${value}%`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {healthZones.map((zone, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color }}></div>
                      <span className="text-xs">
                        {zone.name}: {zone.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-2 sm:pb-3 px-4 pt-4">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <Droplets className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-500" />
                  Niveles de Hidratación y Estrés
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" fontSize={9} stroke="hsl(var(--muted-foreground))" />
                    <YAxis fontSize={9} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "black",
                      }}
                      labelStyle={{ color: "black" }}
                      itemStyle={{ color: "black" }}
                    />
                    <Line type="monotone" dataKey="hidratacion" stroke="#06b6d4" strokeWidth={2} name="Hidratación %" />
                    <Line type="monotone" dataKey="estres" stroke="#8b5cf6" strokeWidth={2} name="Estrés %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logros" className="space-y-3 sm:space-y-4">
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-2 sm:pb-3 px-4 pt-4">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                  Logros Recientes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 px-4 pb-4">
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-accent/20 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base">¡Caminante Estrella!</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">10,000 pasos en un día</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-accent/20 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base">Corazón Saludable</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Frecuencia cardíaca estable por 7 días</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-accent/20 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base">Meta Semanal</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Completó 5 de 7 días activos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-2 sm:pb-3 px-4 pt-4">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <Target className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                  Objetivos de la Semana
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-4 pb-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                    <span className="text-xs sm:text-sm font-medium">Pasos Diarios</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">8,500 / 10,000</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5 sm:h-2">
                    <div className="bg-primary h-1.5 sm:h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                    <span className="text-xs sm:text-sm font-medium">Tiempo Activo</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">2.5 / 3.0 horas</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5 sm:h-2">
                    <div className="bg-primary h-1.5 sm:h-2 rounded-full" style={{ width: "83%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                    <span className="text-xs sm:text-sm font-medium">Días Activos</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">5 / 7 días</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5 sm:h-2">
                    <div className="bg-primary h-1.5 sm:h-2 rounded-full" style={{ width: "71%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
