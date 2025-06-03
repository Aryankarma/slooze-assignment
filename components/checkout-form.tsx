"use client"

import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { paymentMethods, addOrder } from "@/lib/data"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { CreditCard, Smartphone, Wallet } from "lucide-react"

export function CheckoutForm() {
  const { user } = useAuth()
  const { items, total, clearCart } = useCart()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  if (!user) return null

  // Check permissions for placing orders
  const canPlaceOrder = user.role === "admin" || user.role === "manager"

  const handleCheckout = async () => {
    if (!canPlaceOrder) {
      toast({
        title: "Access Denied",
        description: "Only Admins and Managers can place orders.",
        variant: "destructive",
      })
      return
    }

    if (!selectedPaymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      // Create order
      const order = addOrder({
        userId: user.id,
        items: items.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        total: total + (user.region === "india" ? 40 : 3),
        status: "confirmed",
        createdAt: new Date(),
        region: user.region,
        restaurantId: items[0]?.restaurantId || "",
        paymentMethod: selectedPaymentMethod,
      })

      clearCart()

      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Your order #${order.id} has been confirmed.`,
      })

      router.push("/orders")
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "card":
        return <CreditCard className="h-4 w-4" />
      case "upi":
        return <Smartphone className="h-4 w-4" />
      case "wallet":
        return <Wallet className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
        <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethods.map((method) => (
              <SelectItem key={method.id} value={method.id}>
                <div className="flex items-center space-x-2">
                  {getPaymentIcon(method.type)}
                  <span>{method.name}</span>
                  <span className="text-gray-500">({method.details})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!canPlaceOrder && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            ⚠️ Only Admins and Managers can place orders. Members can only add items to cart.
          </p>
        </div>
      )}

      <Button
        onClick={handleCheckout}
        disabled={!canPlaceOrder || isProcessing || items.length === 0}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
      >
        {isProcessing ? "Processing..." : "Place Order"}
      </Button>
    </div>
  )
}
