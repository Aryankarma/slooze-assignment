"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "admin" | "manager" | "member"
export type UserRegion = "india" | "america"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  region: UserRegion
  avatar: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Nick Fury",
    email: "nick.fury@shield.com",
    role: "admin",
    region: "america",
    avatar: "🕴️",
  },
  {
    id: "2",
    name: "Captain Marvel",
    email: "captain.marvel@shield.com",
    role: "manager",
    region: "india",
    avatar: "⭐",
  },
  {
    id: "3",
    name: "Captain America",
    email: "captain.america@shield.com",
    role: "manager",
    region: "america",
    avatar: "🛡️",
  },
  {
    id: "4",
    name: "Thanos",
    email: "thanos@shield.com",
    role: "member",
    region: "india",
    avatar: "💜",
  },
  {
    id: "5",
    name: "Thor",
    email: "thor@shield.com",
    role: "member",
    region: "india",
    avatar: "⚡",
  },
  {
    id: "6",
    name: "Travis",
    email: "travis@shield.com",
    role: "member",
    region: "america",
    avatar: "🤠",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser && password === "password123") {
      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
