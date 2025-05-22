export const appName = process.env.Next_PUBLIC_APP_NAME || 'NEW_COMMERCE'
export const APP_SLOGAN =
  process.env.NEXT_PUBLIC_APP_SLOGAN || 'Your trust our priority'
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'BUILT WITH NEXT.JS, TAILWIND CSS, AND MONGODB'
export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9)

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  'http://localhost:3000'

export const SENDER_EMAIL =
  process.env.NEXT_PUBLIC_SENDER_EMAIL || 'NewCommerce@resend.dev'
export const SENDER_NAME =
  process.env.NEXT_PUBLIC_SENDER_NAME || 'NEW_COMMERCE support'

export const FREE_SHIPPING_MIN_PRICE = Number(
  process.env.FREE_SHIPPING_MIN_PRICE || 35
)
export const APP_COPYRIGHT =
  process.env.NEXT_PUBLIC_APP_COPYRIGHT ||
  `Copyright © 2025 ${appName}. All rights reserved.`

export const AVAILABLE_PAYMENT_METHODS = [
  {
    name: 'PayPal',
    commission: 0,
    isDefault: true,
  },
  {
    name: 'Stripe',
    commission: 0,
    isDefault: true,
  },
  {
    name: 'Cash On Delivery',
    commission: 0,
    isDefault: true,
  },
]
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || 'PayPal'

export const AVAILABLE_DELIVERY_DATES = [
  {
    name: 'Tomorrow',
    daysToDeliver: 1,
    shippingPrice: 12.9,
    freeShippingMinPrice: 0,
  },
  {
    name: 'Next 3 Days',
    daysToDeliver: 3,
    shippingPrice: 6.9,
    freeShippingMinPrice: 0,
  },
  {
    name: 'Next 5 Days',
    daysToDeliver: 5,
    shippingPrice: 4.9,
    freeShippingMinPrice: 35,
  },
]
export const USER_ROLES = ['Admin', 'User']