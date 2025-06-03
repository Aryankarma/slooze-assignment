"use client"

import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, User, LogOut, Home, UtensilsCrossed } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navbar() {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()

  if (!user) return null

  const getRegionGradient = () => {
    return user.region === "india" ? "india-gradient" : "america-gradient"
  }

  return (
    <nav className={`${getRegionGradient()} p-4 shadow-lg`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <UtensilsCrossed className="h-8 w-8 text-white animate-bounce-slow" />
          <span className="text-2xl font-bold text-white">FoodieHub</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>

          <Link href="/orders">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Orders
            </Button>
          </Link>

          {user.role === "admin" && (
            <Link href="/payment-methods">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Payment Methods
              </Button>
            </Link>
          )}

          <Link href="/cart" className="relative">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white animate-pulse">{itemCount}</Badge>
              )}
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <span className="text-2xl mr-2">{user.avatar}</span>
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role} • {user.region}
                </p>
              </div>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
