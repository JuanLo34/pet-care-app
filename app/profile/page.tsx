"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Save, Edit3, Heart, Calendar, Weight, Ruler, MapPin, Phone, Mail, User, Camera } from "lucide-react"

interface PetProfile {
  name: string
  breed: string
  age: string
  weight: string
  height: string
  gender: string
  color: string
  microchip: string
  birthDate: string
  notes: string
  ownerName: string
  ownerPhone: string
  ownerEmail: string
  emergencyContact: string
  veterinarian: string
  vetPhone: string
  allergies: string
  medications: string
  photo: string
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useState<PetProfile>({
    name: "Max",
    breed: "Golden Retriever",
    age: "3",
    weight: "28.5",
    height: "58",
    gender: "Macho",
    color: "Dorado",
    microchip: "982000123456789",
    birthDate: "2021-03-15",
    notes: "Muy juguetón y amigable. Le encanta nadar y jugar con pelotas.",
    ownerName: "María González",
    ownerPhone: "+34 612 345 678",
    ownerEmail: "maria.gonzalez@email.com",
    emergencyContact: "+34 698 765 432",
    veterinarian: "Dr. Carlos Ruiz - Clínica Veterinaria Central",
    vetPhone: "+34 915 123 456",
    allergies: "Ninguna conocida",
    medications: "Ninguna actualmente",
    photo: "/golden-retriever.png",
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simular guardado con animación
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
      // Aquí se guardaría en la base de datos
    }, 1500)
  }

  const handleInputChange = (field: keyof PetProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploadingPhoto(true)

      // Validar que sea una imagen
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona un archivo de imagen válido")
        setIsUploadingPhoto(false)
        return
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen es demasiado grande. Máximo 5MB.")
        setIsUploadingPhoto(false)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfile((prev) => ({ ...prev, photo: result }))
        setIsUploadingPhoto(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerPhotoUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <div className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="flex items-center justify-between p-2 sm:p-4">
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = "/dashboard")}
              className="p-1 sm:p-2 hover:scale-110 transition-transform duration-200"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-sm sm:text-lg">Perfil de Mascota</h1>
              <p className="text-xs text-muted-foreground">Información completa de {profile.name}</p>
            </div>
          </div>
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            disabled={isSaving}
            className="gap-1 hover:scale-105 transition-transform duration-200 text-xs px-2 py-1.5"
          >
            {isSaving ? (
              <div className="w-3 h-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : isEditing ? (
              <Save className="w-3 h-3" />
            ) : (
              <Edit3 className="w-3 h-3" />
            )}
            {isSaving ? "Guardando..." : isEditing ? "Guardar" : "Editar"}
          </Button>
        </div>
      </div>

      <div className="p-2 sm:p-4 space-y-3 sm:space-y-6">
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardContent className="p-3 sm:p-6">
            <div className="flex flex-col items-center text-center space-y-2 sm:space-y-4">
              <div className="relative group">
                <Avatar className="w-20 h-20 sm:w-32 sm:h-32 border-4 border-primary/20 shadow-lg hover:scale-105 transition-transform duration-300">
                  <AvatarImage src={profile.photo || "/placeholder.svg"} className="object-cover" />
                  <AvatarFallback className="text-xl sm:text-3xl font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                    {profile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <Button
                  size="sm"
                  onClick={triggerPhotoUpload}
                  disabled={isUploadingPhoto}
                  className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-10 sm:h-10 rounded-full p-0 bg-primary hover:bg-primary/90 shadow-lg hover:scale-110 transition-all duration-200"
                >
                  {isUploadingPhoto ? (
                    <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <Camera className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-primary-foreground" />
                  )}
                </Button>

                {/* Input oculto para seleccionar archivo */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-3">
                <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {profile.name}
                </h2>
                <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                  <Badge variant="secondary" className="animate-pulse-gentle text-xs">
                    {profile.breed}
                  </Badge>
                  <Badge variant="outline" className="animate-pulse-gentle text-xs">
                    {profile.age} años
                  </Badge>
                  <Badge variant="outline" className="animate-pulse-gentle text-xs">
                    {profile.gender}
                  </Badge>
                </div>

                <div className="flex justify-center gap-2 sm:gap-4 mt-2 sm:mt-4">
                  <div className="flex items-center gap-1 text-green-600">
                    <div className="w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">Saludable</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <div className="w-1 h-1 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">Activo</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-600">
                    <div className="w-1 h-1 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">Conectado</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-2 px-3 pt-3 sm:px-4 sm:pt-4">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-lg">
              <Heart className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-red-500 animate-pulse-gentle" />
              Información Básica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 sm:space-y-4 px-3 pb-3 sm:px-4 sm:pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="name" className="text-xs font-medium">
                  Nombre
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                  className="transition-all duration-200 hover:border-primary/50 focus:border-primary text-sm h-8 sm:h-10"
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="breed" className="text-xs font-medium">
                  Raza
                </Label>
                <Input
                  id="breed"
                  value={profile.breed}
                  onChange={(e) => handleInputChange("breed", e.target.value)}
                  disabled={!isEditing}
                  className="transition-all duration-200 hover:border-primary/50 focus:border-primary text-sm h-8 sm:h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="age" className="text-xs font-medium">
                  Edad (años)
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={profile.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  disabled={!isEditing}
                  className="transition-all duration-200 hover:border-primary/50 focus:border-primary text-sm h-8 sm:h-10"
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="gender" className="text-xs font-medium">
                  Género
                </Label>
                <Select
                  value={profile.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="transition-all duration-200 hover:border-primary/50 focus:border-primary text-sm h-8 sm:h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Macho">Macho</SelectItem>
                    <SelectItem value="Hembra">Hembra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="weight" className="flex items-center gap-1 text-xs font-medium">
                  <Weight className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                  Peso (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={profile.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  disabled={!isEditing}
                  className="transition-all duration-200 hover:border-primary/50 focus:border-primary text-sm h-8 sm:h-10"
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="height" className="flex items-center gap-1 text-xs font-medium">
                  <Ruler className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                  Altura (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={profile.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  disabled={!isEditing}
                  className="transition-all duration-200 hover:border-primary/50 focus:border-primary text-sm h-8 sm:h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="color" className="text-xs font-medium">
                  Color
                </Label>
                <Input
                  id="color"
                  value={profile.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  disabled={!isEditing}
                  className="transition-all duration-200 hover:border-primary/50 focus:border-primary text-sm h-8 sm:h-10"
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="birthDate" className="flex items-center gap-1 text-xs font-medium">
                  <Calendar className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                  Fecha de Nacimiento
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={profile.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  disabled={!isEditing}
                  className="transition-all duration-200 hover:border-primary/50 focus:border-primary text-sm h-8 sm:h-10"
                />
              </div>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="microchip" className="text-xs font-medium">
                Microchip
              </Label>
              <Input
                id="microchip"
                value={profile.microchip}
                onChange={(e) => handleInputChange("microchip", e.target.value)}
                disabled={!isEditing}
                className="font-mono transition-all duration-200 hover:border-primary/50 focus:border-primary text-sm h-8 sm:h-10"
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="notes" className="text-xs font-medium">
                Notas Adicionales
              </Label>
              <Textarea
                id="notes"
                value={profile.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                disabled={!isEditing}
                className="transition-all duration-200 hover:border-primary/50 focus:border-primary text-sm"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2 px-3 pt-3 sm:px-4 sm:pt-4">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-lg">
              <User className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-500" />
              Información del Propietario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 sm:space-y-4 px-3 pb-3 sm:px-4 sm:pb-4">
            <div>
              <Label htmlFor="ownerName" className="text-xs font-medium">
                Nombre Completo
              </Label>
              <Input
                id="ownerName"
                value={profile.ownerName}
                onChange={(e) => handleInputChange("ownerName", e.target.value)}
                disabled={!isEditing}
                className="mt-1 text-sm h-8 sm:h-10"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
              <div>
                <Label htmlFor="ownerPhone" className="flex items-center gap-1 text-xs font-medium">
                  <Phone className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                  Teléfono
                </Label>
                <Input
                  id="ownerPhone"
                  type="tel"
                  value={profile.ownerPhone}
                  onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 text-sm h-8 sm:h-10"
                />
              </div>
              <div>
                <Label htmlFor="emergencyContact" className="text-xs font-medium">
                  Contacto de Emergencia
                </Label>
                <Input
                  id="emergencyContact"
                  type="tel"
                  value={profile.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 text-sm h-8 sm:h-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="ownerEmail" className="flex items-center gap-1 text-xs font-medium">
                <Mail className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                Email
              </Label>
              <Input
                id="ownerEmail"
                type="email"
                value={profile.ownerEmail}
                onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                disabled={!isEditing}
                className="mt-1 text-sm h-8 sm:h-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2 px-3 pt-3 sm:px-4 sm:pt-4">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-lg">
              <MapPin className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-green-500" />
              Información Veterinaria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 sm:space-y-4 px-3 pb-3 sm:px-4 sm:pb-4">
            <div>
              <Label htmlFor="veterinarian" className="text-xs font-medium">
                Veterinario
              </Label>
              <Input
                id="veterinarian"
                value={profile.veterinarian}
                onChange={(e) => handleInputChange("veterinarian", e.target.value)}
                disabled={!isEditing}
                className="mt-1 text-sm h-8 sm:h-10"
              />
            </div>

            <div>
              <Label htmlFor="vetPhone" className="text-xs font-medium">
                Teléfono Veterinario
              </Label>
              <Input
                id="vetPhone"
                type="tel"
                value={profile.vetPhone}
                onChange={(e) => handleInputChange("vetPhone", e.target.value)}
                disabled={!isEditing}
                className="mt-1 text-sm h-8 sm:h-10"
              />
            </div>

            <div>
              <Label htmlFor="allergies" className="text-xs font-medium">
                Alergias
              </Label>
              <Textarea
                id="allergies"
                value={profile.allergies}
                onChange={(e) => handleInputChange("allergies", e.target.value)}
                disabled={!isEditing}
                className="mt-1 text-sm"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="medications" className="text-xs font-medium">
                Medicamentos Actuales
              </Label>
              <Textarea
                id="medications"
                value={profile.medications}
                onChange={(e) => handleInputChange("medications", e.target.value)}
                disabled={!isEditing}
                className="mt-1 text-sm"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 backdrop-blur-sm border-red-200 dark:border-red-800 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-2.5 sm:p-4">
            <Button
              variant="destructive"
              className="w-full h-10 sm:h-14 text-sm font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Phone className="w-3.5 h-3.5 sm:w-5 sm:h-5 mr-1.5 animate-pulse-gentle" />
              Llamar Veterinario de Emergencia
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
