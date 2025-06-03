"use client"

import type { Restaurant } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock } from "lucide-react"
import Link from "next/link"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="text-6xl animate-float">{restaurant.image}</div>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Star className="h-3 w-3 mr-1 fill-current" />
            {restaurant.rating}
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold text-gray-800">{restaurant.name}</CardTitle>
        <CardDescription className="text-gray-600">{restaurant.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="text-purple-600 border-purple-600">
            {restaurant.cuisine}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            {restaurant.deliveryTime}
          </div>
        </div>
        <Link href={`/restaurant/${restaurant.id}`}>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            View Menu
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
