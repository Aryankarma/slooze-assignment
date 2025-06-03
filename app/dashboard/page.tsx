"use client"

import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"
import { RestaurantCard } from "@/components/restaurant-card"
import { getRestaurantsByRegion } from "@/lib/data"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
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

  const restaurants = getRestaurantsByRegion(user.region)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {user.name}! {user.avatar}
          </h1>
          <p className="text-gray-600 text-lg">
            Discover amazing restaurants in {user.region === "india" ? "🇮🇳 India" : "🇺🇸 America"}
          </p>
          <div className="mt-4 inline-block">
            <span
              className={`px-4 py-2 rounded-full text-white font-semibold ${
                user.role === "admin" ? "bg-purple-600" : user.role === "manager" ? "bg-blue-600" : "bg-green-600"
              }`}
            >
              {user.role.toUpperCase()} ACCESS
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        {restaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No restaurants available in your region.</p>
          </div>
        )}
      </div>
    </div>
  )
}
