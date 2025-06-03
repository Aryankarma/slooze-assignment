"use client"

import { type Order, menuItems, restaurants, updateOrderStatus } from "@/lib/data"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  const { user } = useAuth()
  const { toast } = useToast()

  if (!user) return null

  const restaurant = restaurants.find((r) => r.id === order.restaurantId)
  const canCancelOrder = user.role === "admin" || user.role === "manager"

  const formatPrice = (price: number) => {
    return user.region === "india" ? `₹${price}` : `$${price}`
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "preparing":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCancelOrder = () => {
    if (!canCancelOrder) {
      toast({
        title: "Access Denied",
        description: "Only Admins and Managers can cancel orders.",
        variant: "destructive",
      })
      return
    }

    if (order.status === "delivered" || order.status === "cancelled") {
      toast({
        title: "Cannot Cancel",
        description: "This order cannot be cancelled.",
        variant: "destructive",
      })
      return
    }

    const success = updateOrderStatus(order.id, "cancelled")
    if (success) {
      toast({
        title: "Order Cancelled",
        description: `Order #${order.id} has been cancelled.`,
      })
      // Force a page refresh to show updated status
      window.location.reload()
    }
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Order #{order.id}</CardTitle>
          <Badge className={getStatusColor(order.status)}>{order.status.toUpperCase()}</Badge>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {order.createdAt.toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <CreditCard className="h-4 w-4 mr-1" />
            {order.paymentMethod}
          </div>
          {restaurant && <span>• {restaurant.name}</span>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {order.items.map((item, index) => {
            const menuItem = menuItems.find((m) => m.id === item.menuItemId)
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{menuItem?.image || "🍽️"}</span>
                  <div>
                    <p className="font-medium">{menuItem?.name || "Unknown Item"}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
              </div>
            )
          })}

          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total: {formatPrice(order.total)}</span>
              {canCancelOrder && order.status !== "delivered" && order.status !== "cancelled" && (
                <Button variant="destructive" size="sm" onClick={handleCancelOrder}>
                  <X className="h-4 w-4 mr-1" />
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
