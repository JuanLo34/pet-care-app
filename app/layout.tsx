import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AnimatedBackground } from "@/components/animated-background"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Monitoreo Inteligente de Mascotas",
  description: "App móvil para monitorear la salud de tu mascota en tiempo real con collar inteligente",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <AnimatedBackground />
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
