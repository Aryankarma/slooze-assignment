import type { UserRegion } from "@/components/auth-provider"

export interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  deliveryTime: string
  image: string
  region: UserRegion
  description: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  restaurantId: string
  category: string
  isVeg: boolean
}

export interface Order {
  id: string
  userId: string
  items: Array<{
    menuItemId: string
    quantity: number
    price: number
  }>
  total: number
  status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled"
  createdAt: Date
  region: UserRegion
  restaurantId: string
  paymentMethod: string
}

export interface PaymentMethod {
  id: string
  type: "card" | "upi" | "wallet"
  name: string
  details: string
  isDefault: boolean
}

export const restaurants: Restaurant[] = [
  // India Restaurants
  {
    id: "1",
    name: "Spice Paradise",
    cuisine: "Indian",
    rating: 4.5,
    deliveryTime: "30-45 min",
    image: "🍛",
    region: "india",
    description: "Authentic Indian flavors with a modern twist",
  },
  {
    id: "2",
    name: "Mumbai Street Food",
    cuisine: "Street Food",
    rating: 4.3,
    deliveryTime: "25-35 min",
    image: "🌮",
    region: "india",
    description: "Best street food from the heart of Mumbai",
  },
  {
    id: "3",
    name: "South Indian Delights",
    cuisine: "South Indian",
    rating: 4.7,
    deliveryTime: "35-50 min",
    image: "🥞",
    region: "india",
    description: "Traditional South Indian cuisine",
  },
  // America Restaurants
  {
    id: "4",
    name: "Burger Palace",
    cuisine: "American",
    rating: 4.2,
    deliveryTime: "20-30 min",
    image: "🍔",
    region: "america",
    description: "Gourmet burgers and classic American fare",
  },
  {
    id: "5",
    name: "Pizza Corner",
    cuisine: "Italian",
    rating: 4.6,
    deliveryTime: "25-40 min",
    image: "🍕",
    region: "america",
    description: "Wood-fired pizzas with fresh ingredients",
  },
  {
    id: "6",
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.4,
    deliveryTime: "30-45 min",
    image: "🌯",
    region: "america",
    description: "Authentic Mexican flavors and fresh ingredients",
  },
]

export const menuItems: MenuItem[] = [
  // Spice Paradise (India)
  {
    id: "1",
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken",
    price: 350,
    image: "🍗",
    restaurantId: "1",
    category: "Main Course",
    isVeg: false,
  },
  {
    id: "2",
    name: "Paneer Tikka Masala",
    description: "Grilled cottage cheese in rich tomato gravy",
    price: 320,
    image: "🧀",
    restaurantId: "1",
    category: "Main Course",
    isVeg: true,
  },
  {
    id: "3",
    name: "Garlic Naan",
    description: "Soft bread with garlic and herbs",
    price: 80,
    image: "🫓",
    restaurantId: "1",
    category: "Bread",
    isVeg: true,
  },
  // Mumbai Street Food (India)
  {
    id: "4",
    name: "Vada Pav",
    description: "Mumbai's favorite street food burger",
    price: 50,
    image: "🥪",
    restaurantId: "2",
    category: "Snacks",
    isVeg: true,
  },
  {
    id: "5",
    name: "Pani Puri",
    description: "Crispy shells with spicy water",
    price: 60,
    image: "🥟",
    restaurantId: "2",
    category: "Snacks",
    isVeg: true,
  },
  // Burger Palace (America)
  {
    id: "6",
    name: "Classic Cheeseburger",
    description: "Beef patty with cheese, lettuce, and tomato",
    price: 12,
    image: "🍔",
    restaurantId: "4",
    category: "Burgers",
    isVeg: false,
  },
  {
    id: "7",
    name: "Veggie Burger",
    description: "Plant-based patty with fresh vegetables",
    price: 11,
    image: "🥬",
    restaurantId: "4",
    category: "Burgers",
    isVeg: true,
  },
  {
    id: "8",
    name: "French Fries",
    description: "Crispy golden fries",
    price: 5,
    image: "🍟",
    restaurantId: "4",
    category: "Sides",
    isVeg: true,
  },
  // Pizza Corner (America)
  {
    id: "9",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, and basil",
    price: 14,
    image: "🍕",
    restaurantId: "5",
    category: "Pizza",
    isVeg: true,
  },
  {
    id: "10",
    name: "Pepperoni Pizza",
    description: "Pizza with pepperoni and mozzarella",
    price: 16,
    image: "🍕",
    restaurantId: "5",
    category: "Pizza",
    isVeg: false,
  },
]

export const paymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "card",
    name: "Visa Card",
    details: "**** **** **** 1234",
    isDefault: true,
  },
  {
    id: "2",
    type: "upi",
    name: "Google Pay",
    details: "user@okaxis",
    isDefault: false,
  },
  {
    id: "3",
    type: "wallet",
    name: "Paytm Wallet",
    details: "Balance: ₹2,500",
    isDefault: false,
  },
]

// Mock orders data
export const orders: Order[] = [
  {
    id: "1",
    userId: "4",
    items: [
      { menuItemId: "1", quantity: 1, price: 350 },
      { menuItemId: "3", quantity: 2, price: 80 },
    ],
    total: 510,
    status: "delivered",
    createdAt: new Date("2024-01-15"),
    region: "india",
    restaurantId: "1",
    paymentMethod: "card",
  },
]

export function getRestaurantsByRegion(region: UserRegion): Restaurant[] {
  return restaurants.filter((restaurant) => restaurant.region === region)
}

export function getMenuItemsByRestaurant(restaurantId: string): MenuItem[] {
  return menuItems.filter((item) => item.restaurantId === restaurantId)
}

export function getOrdersByUserAndRegion(userId: string, region: UserRegion): Order[] {
  return orders.filter((order) => order.userId === userId && order.region === region)
}

export function addOrder(order: Omit<Order, "id">): Order {
  const newOrder: Order = {
    ...order,
    id: (orders.length + 1).toString(),
  }
  orders.push(newOrder)
  return newOrder
}

export function updateOrderStatus(orderId: string, status: Order["status"]): boolean {
  const orderIndex = orders.findIndex((order) => order.id === orderId)
  if (orderIndex !== -1) {
    orders[orderIndex].status = status
    return true
  }
  return false
}
