"use client"

import type { MenuItem, Restaurant } from "@/lib/data"
import { useCart } from "@/components/cart-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MenuItemCardProps {
  menuItem: MenuItem
  restaurant: Restaurant
}

export function MenuItemCard({ menuItem, restaurant }: MenuItemCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      image: menuItem.image,
    })

    toast({
      title: "Added to Cart",
      description: `${menuItem.name} has been added to your cart.`,
    })
  }

  const formatPrice = (price: number) => {
    return restaurant.region === "india" ? `₹${price}` : `$${price}`
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="text-4xl animate-float">{menuItem.image}</div>
          <div className="flex flex-col items-end space-y-1">
            {menuItem.isVeg && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                🌱 Veg
              </Badge>
            )}
            <span className="text-lg font-bold text-purple-600">{formatPrice(menuItem.price)}</span>
          </div>
        </div>
        <CardTitle className="text-lg font-bold text-gray-800">{menuItem.name}</CardTitle>
        <CardDescription className="text-gray-600">{menuItem.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}
