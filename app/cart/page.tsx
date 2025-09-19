"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Truck,
  Shield,
  Tag,
  MapPin,
  Clock,
} from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  inStock: boolean
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Collar Inteligente PetCare Pro",
      price: 149.99,
      image: "/smart-collar-for-dogs.jpg",
      quantity: 1,
      inStock: true,
    },
    {
      id: "3",
      name: "Juguete Interactivo LED",
      price: 24.99,
      image: "/led-interactive-dog-toy.jpg",
      quantity: 2,
      inStock: true,
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    // Códigos promocionales simulados
    const promoCodes = {
      PETCARE10: 10,
      WELCOME15: 15,
      SAVE20: 20,
    }

    const discount = promoCodes[promoCode.toUpperCase() as keyof typeof promoCodes]
    if (discount) {
      setAppliedPromo({ code: promoCode.toUpperCase(), discount })
      setPromoCode("")
    } else {
      alert("Código promocional inválido")
    }
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0
  const total = subtotal + shipping - promoDiscount

  const handleCheckout = () => {
    setIsProcessing(true)
    // Simular proceso de pago
    setTimeout(() => {
      setIsProcessing(false)
      alert("¡Pedido realizado con éxito! Recibirás un email de confirmación.")
      setCartItems([])
      setAppliedPromo(null)
    }, 2000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
          <div className="flex items-center gap-2 p-3">
            <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/shop")} className="p-1.5">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="font-bold text-base">Carrito</h1>
              <p className="text-xs text-muted-foreground">Tu carrito está vacío</p>
            </div>
          </div>
        </div>

        <div className="p-3 flex items-center justify-center min-h-[60vh]">
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm w-full max-w-md">
            <CardContent className="p-6 text-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-medium text-base mb-2">Tu carrito está vacío</h3>
              <p className="text-sm text-muted-foreground mb-4">Agrega algunos productos para comenzar</p>
              <Button onClick={() => (window.location.href = "/shop")} className="w-full">
                Ir a la Tienda
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <div className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="flex items-center gap-2 p-3">
          <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/shop")} className="p-1.5">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-bold text-base">Carrito</h1>
            <p className="text-xs text-muted-foreground">{cartItems.length} productos</p>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-4">
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2 px-3 pt-3">
            <CardTitle className="text-base">Productos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-3 pb-3">
            {cartItems.map((item, index) => (
              <div key={item.id}>
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium line-clamp-2 mb-1 text-sm">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">${item.price.toFixed(2)} c/u</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-medium w-6 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="w-6 h-6 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                {index < cartItems.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2 px-3 pt-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Tag className="w-4 h-4" />
              Código Promocional
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            {appliedPromo ? (
              <div className="flex items-center justify-between p-2.5 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs"
                  >
                    {appliedPromo.code}
                  </Badge>
                  <span className="text-sm text-green-700 dark:text-green-300">-{appliedPromo.discount}% aplicado</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAppliedPromo(null)}
                  className="text-green-700 hover:text-green-800 dark:text-green-300 p-1"
                >
                  Quitar
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Ingresa tu código"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 h-8"
                />
                <Button onClick={applyPromoCode} variant="outline" className="h-8 px-3 bg-transparent">
                  Aplicar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center">
                <Truck className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-sm">Envío gratis en compras mayores a $50</p>
                <p className="text-xs text-muted-foreground">
                  {subtotal >= 50 ? "¡Felicidades! Tu envío es gratis" : `Agrega $${(50 - subtotal).toFixed(2)} más`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2 px-3 pt-3">
            <CardTitle className="text-base">Resumen del Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 px-3 pb-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Envío</span>
              <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
            </div>
            {appliedPromo && (
              <div className="flex justify-between text-green-600 dark:text-green-400 text-sm">
                <span>Descuento ({appliedPromo.code})</span>
                <span>-${promoDiscount.toFixed(2)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-2">
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardContent className="p-3 text-center">
              <Shield className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <p className="text-xs font-medium">Compra Segura</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardContent className="p-3 text-center">
              <Clock className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <p className="text-xs font-medium">Entrega 24-48h</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardContent className="p-3 text-center">
              <MapPin className="w-5 h-5 text-purple-500 mx-auto mb-1" />
              <p className="text-xs font-medium">Envío Nacional</p>
            </CardContent>
          </Card>
        </div>

        <Button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full h-12 text-sm font-semibold sticky bottom-3 z-10"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Procesando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Proceder al Pago - ${total.toFixed(2)}
            </div>
          )}
        </Button>
      </div>
    </div>
  )
}
