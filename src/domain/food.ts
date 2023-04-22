import { Category } from "@prisma/client"

export interface Food {
  id: string
  name: string
  description?: string
  categories?: Category[]
}

export interface FoodToSend {
  id: string
  name: string
  description?: string
  categories?: string[]
}