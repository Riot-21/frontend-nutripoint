import type { ProductInterface } from "./products-response.interface"

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  rating: number
  reviews: number
  benefits: string[]
  ingredients?: string
  usage?: string
  sku?: string
  brand?: string
}

export interface CartItem {
  product: ProductInterface
  quantity: number
}

export interface User {
  id: string
  email: string
  name: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: Date
}
