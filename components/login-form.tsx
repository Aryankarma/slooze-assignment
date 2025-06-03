"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, isLoading } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const success = await login(email, password)
    if (!success) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Try password123 for any user.",
        variant: "destructive",
      })
    }
  }

  const demoUsers = [
    { email: "nick.fury@shield.com", name: "Nick Fury (Admin)", avatar: "🕴️" },
    { email: "captain.marvel@shield.com", name: "Captain Marvel (Manager-India)", avatar: "⭐" },
    { email: "captain.america@shield.com", name: "Captain America (Manager-America)", avatar: "🛡️" },
    { email: "thanos@shield.com", name: "Thanos (Member-India)", avatar: "💜" },
    { email: "thor@shield.com", name: "Thor (Member-India)", avatar: "⚡" },
    { email: "travis@shield.com", name: "Travis (Member-America)", avatar: "🤠" },
  ]

  return (
    <Card className="w-full backdrop-blur-sm bg-white/10 border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-white text-2xl">Welcome Back!</CardTitle>
        <CardDescription className="text-white/80">Sign in to your account to start ordering</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
            />
          </div>
          <Button type="submit" className="w-full bg-white text-purple-600 hover:bg-white/90" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-6">
          <p className="text-white/80 text-sm mb-3">Demo Users (Password: password123):</p>
          <div className="grid gap-2">
            {demoUsers.map((user) => (
              <Button
                key={user.email}
                variant="ghost"
                className="justify-start text-white/90 hover:bg-white/20 text-sm"
                onClick={() => {
                  setEmail(user.email)
                  setPassword("password123")
                }}
              >
                <span className="mr-2">{user.avatar}</span>
                {user.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
