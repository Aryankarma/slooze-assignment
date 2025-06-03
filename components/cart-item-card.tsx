"use client"

import type { CartItem } from "@/components/cart-provider"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItemCardProps {
  item: CartItem
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeItem } = useCart()
  const { user } = useAuth()

  const formatPrice = (price: number) => {
    return user?.region === "india" ? `₹${price}` : `$${price}`
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="text-3xl">{item.image}</div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.restaurantName}</p>
            <p className="text-lg font-bold text-purple-600">{formatPrice(item.price)}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-semibold">{item.quantity}</span>
            <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="text-right">
            <p className="font-bold text-gray-800">{formatPrice(item.price * item.quantity)}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
