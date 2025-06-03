"use client"

import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"
import { PaymentMethodCard } from "@/components/payment-method-card"
import { paymentMethods } from "@/lib/data"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CreditCard, Plus } from "lucide-react"
import Link from "next/link"

export default function PaymentMethodsPage() {
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

  // Only admins can manage payment methods
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600 mt-2">Only Admins can manage payment methods.</p>
          <Link href="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <CreditCard className="h-8 w-8 mr-3" />
              Payment Methods
            </h1>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Method
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentMethods.map((method) => (
            <PaymentMethodCard key={method.id} paymentMethod={method} />
          ))}
        </div>

        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Admin Privileges</h2>
          <div className="space-y-2 text-gray-600">
            <p>✅ View all payment methods</p>
            <p>✅ Add new payment methods</p>
            <p>✅ Edit existing payment methods</p>
            <p>✅ Set default payment method</p>
            <p>✅ Remove payment methods</p>
          </div>
        </div>
      </div>
    </div>
  )
}
