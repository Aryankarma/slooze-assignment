"use client"

import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import { Navbar } from "@/components/navbar"
import { MenuItemCard } from "@/components/menu-item-card"
import { restaurants, getMenuItemsByRestaurant } from "@/lib/data"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, Clock } from "lucide-react"
import Link from "next/link"

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const { user, isLoading } = useAuth()
  const { itemCount } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const restaurant = restaurants.find((r) => r.id === params.id)
  const menuItems = getMenuItemsByRestaurant(params.id)

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Restaurant not found</h1>
          <Link href="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Check if user has access to this restaurant's region
  if (restaurant.region !== user.region) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600 mt-2">You can only access restaurants in your region ({user.region}).</p>
          <Link href="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const categories = [...new Set(menuItems.map((item) => item.category))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Restaurants
            </Button>
          </Link>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="text-8xl animate-float">{restaurant.image}</div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
                <p className="text-gray-600 mb-3">{restaurant.description}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-yellow-600">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    <span className="font-semibold">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    {restaurant.cuisine}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuItemCard key={item.id} menuItem={item} restaurant={restaurant} />
                ))}
            </div>
          </div>
        ))}

        {itemCount > 0 && (
          <div className="fixed bottom-6 right-6">
            <Link href="/cart">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg animate-bounce-slow">
                View Cart ({itemCount})
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
