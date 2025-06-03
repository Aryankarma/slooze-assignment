"use client"

import type { PaymentMethod } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Wallet, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod
}

export function PaymentMethodCard({ paymentMethod }: PaymentMethodCardProps) {
  const { toast } = useToast()

  const getIcon = () => {
    switch (paymentMethod.type) {
      case "card":
        return <CreditCard className="h-6 w-6" />
      case "upi":
        return <Smartphone className="h-6 w-6" />
      case "wallet":
        return <Wallet className="h-6 w-6" />
      default:
        return <CreditCard className="h-6 w-6" />
    }
  }

  const getTypeColor = () => {
    switch (paymentMethod.type) {
      case "card":
        return "bg-blue-100 text-blue-800"
      case "upi":
        return "bg-green-100 text-green-800"
      case "wallet":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleEdit = () => {
    toast({
      title: "Edit Payment Method",
      description: "Edit functionality would be implemented here.",
    })
  }

  const handleDelete = () => {
    toast({
      title: "Delete Payment Method",
      description: "Delete functionality would be implemented here.",
      variant: "destructive",
    })
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-purple-600">{getIcon()}</div>
            <div>
              <CardTitle className="text-lg">{paymentMethod.name}</CardTitle>
              <p className="text-sm text-gray-600">{paymentMethod.details}</p>
            </div>
          </div>
          {paymentMethod.isDefault && <Badge className="bg-green-100 text-green-800">Default</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Badge className={getTypeColor()}>{paymentMethod.type.toUpperCase()}</Badge>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleDelete}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
