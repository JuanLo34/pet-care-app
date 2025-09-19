"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, ShoppingCart, Heart, Star, Plus, Minus, Package, Truck, Shield, Zap } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  description: string
  inStock: boolean
  isPopular?: boolean
  discount?: number
}

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  {
    id: "1",
    name: "Collar Inteligente PetCare Pro",
    price: 149.99,
    originalPrice: 199.99,
    image: "/smart-collar-for-dogs.jpg",
    rating: 4.8,
    reviews: 324,
    category: "tecnologia",
    description: "Collar inteligente con GPS, monitor cardíaco y seguimiento de actividad",
    inStock: true,
    isPopular: true,
    discount: 25,
  },
  {
    id: "2",
    name: "Comedero Automático Smart",
    price: 89.99,
    image: "/automatic-pet-feeder.jpg",
    rating: 4.6,
    reviews: 156,
    category: "alimentacion",
    description: "Comedero programable con control desde la app",
    inStock: true,
  },
  {
    id: "3",
    name: "Juguete Interactivo LED",
    price: 24.99,
    originalPrice: 34.99,
    image: "/led-interactive-dog-toy.jpg",
    rating: 4.7,
    reviews: 89,
    category: "juguetes",
    description: "Pelota LED con sensores de movimiento",
    inStock: true,
    discount: 29,
  },
  {
    id: "4",
    name: "Cama Ortopédica Premium",
    price: 79.99,
    image: "/orthopedic-dog-bed.png",
    rating: 4.9,
    reviews: 203,
    category: "descanso",
    description: "Cama con memoria viscoelástica para el descanso óptimo",
    inStock: true,
    isPopular: true,
  },
  {
    id: "5",
    name: "Suplemento Vitamínico",
    price: 29.99,
    image: "/pet-vitamins-supplements.jpg",
    rating: 4.5,
    reviews: 67,
    category: "salud",
    description: "Vitaminas esenciales para la salud de tu mascota",
    inStock: true,
  },
  {
    id: "6",
    name: "Correa Retráctil LED",
    price: 34.99,
    image: "/led-retractable-dog-leash.jpg",
    rating: 4.4,
    reviews: 112,
    category: "paseo",
    description: "Correa retráctil con luces LED para paseos nocturnos",
    inStock: false,
  },
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  const categories = [
    { id: "todos", name: "Todos", icon: Package },
    { id: "tecnologia", name: "Tecnología", icon: Zap },
    { id: "alimentacion", name: "Alimentación", icon: Package },
    { id: "juguetes", name: "Juguetes", icon: Heart },
    { id: "salud", name: "Salud", icon: Shield },
    { id: "descanso", name: "Descanso", icon: Package },
    { id: "paseo", name: "Paseo", icon: Truck },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === productId)
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
      }
      return prev.filter((item) => item.id !== productId)
    })
  }

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const getCartItemCount = () => cart.reduce((total, item) => total + item.quantity, 0)
  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <div className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="flex items-center justify-between p-2 sm:p-4">
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = "/dashboard")}
              className="p-1 sm:p-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-sm sm:text-lg">Tienda PetCare</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Todo para tu mascota</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = "/cart")}
            className="relative gap-1 text-xs px-2 py-1.5 sm:px-3 sm:py-2"
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            {getCartItemCount() > 0 && (
              <Badge className="absolute -top-1 -right-1 w-3.5 h-3.5 p-0 flex items-center justify-center text-xs">
                {getCartItemCount()}
              </Badge>
            )}
            <span className="hidden sm:inline">Carrito</span>
          </Button>
        </div>

        <div className="px-2 sm:px-4 pb-2 sm:pb-4">
          <div className="relative">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 sm:pl-10 text-sm h-8 sm:h-10"
            />
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-4 space-y-3 sm:space-y-6">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex-shrink-0 gap-1 text-xs px-2 py-1.5 h-7 sm:h-8"
              >
                <Icon className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </Button>
            )
          })}
        </div>

        {selectedCategory === "todos" && (
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-2 px-3 pt-3 sm:px-4 sm:pt-4">
              <CardTitle className="flex items-center gap-2 text-sm sm:text-lg">
                <Star className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-yellow-500" />
                Destacados
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                {products
                  .filter((p) => p.isPopular)
                  .slice(0, 2)
                  .map((product) => (
                    <div key={product.id} className="relative">
                      {product.discount && (
                        <Badge className="absolute top-1 left-1 z-10 bg-destructive text-xs px-1 py-0">
                          -{product.discount}%
                        </Badge>
                      )}
                      <div className="aspect-square bg-muted rounded-lg mb-1.5 overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="font-medium text-xs line-clamp-2 mb-1">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-primary text-xs">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through ml-1">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button size="sm" onClick={() => addToCart(product)} className="h-6 w-6 p-0">
                          <Plus className="w-2.5 h-2.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {filteredProducts.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id)
            const isFavorite = favorites.includes(product.id)

            return (
              <Card key={product.id} className="border-0 shadow-lg bg-card/80 backdrop-blur-sm relative">
                <CardContent className="p-2 sm:p-3">
                  {product.discount && (
                    <Badge className="absolute top-1 left-1 z-10 bg-destructive text-xs px-1 py-0">
                      -{product.discount}%
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-1 right-1 z-10 w-5 h-5 p-0"
                  >
                    <Heart
                      className={`w-2.5 h-2.5 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                    />
                  </Button>

                  <div className="aspect-square bg-muted rounded-lg mb-1.5 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  <h3 className="font-medium text-xs line-clamp-2 mb-1">{product.name}</h3>

                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 mb-1.5">{product.description}</p>

                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="font-bold text-primary text-xs">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through ml-1">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Badge variant={product.inStock ? "default" : "secondary"} className="text-xs px-1 py-0">
                      {product.inStock ? "Stock" : "Agotado"}
                    </Badge>
                  </div>

                  {cartItem ? (
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(product.id)}
                        className="w-5 h-5 p-0"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </Button>
                      <span className="font-medium text-xs">{cartItem.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="w-5 h-5 p-0"
                        disabled={!product.inStock}
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="w-full h-6 text-xs"
                    >
                      <ShoppingCart className="w-2.5 h-2.5 mr-1" />
                      Agregar
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-medium mb-1 text-sm">No se encontraron productos</h3>
              <p className="text-xs text-muted-foreground">Intenta con otros términos de búsqueda</p>
            </CardContent>
          </Card>
        )}
      </div>

      {getCartItemCount() > 0 && (
        <div className="fixed bottom-2 left-2 right-2 z-20">
          <Card className="border-0 shadow-xl bg-primary text-primary-foreground">
            <CardContent className="p-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{getCartItemCount()} productos</p>
                  <p className="text-xs opacity-90">Total: ${getCartTotal().toFixed(2)}</p>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => (window.location.href = "/cart")}
                  className="gap-1 bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-xs px-2 py-1.5"
                >
                  <ShoppingCart className="w-3 h-3" />
                  Ver Carrito
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
