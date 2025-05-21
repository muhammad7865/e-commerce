import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Cart, OrderItem, ShippingAddress } from '@/types'
import { calcDeliveryDateAndPrice } from '@/lib/actions/order.actions'

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: undefined,
  shippingPrice: undefined,
  totalPrice: 0,
  paymentMethod: undefined,
  shippingAddress: undefined,
  deliveryDateIndex: undefined,
}
interface CartState {
  cart: Cart
  addItem: (item: OrderItem, quantity: number) => Promise<string>
  updateItem: (item: OrderItem, quantity: number) => Promise<void>
  removeItem: (item: OrderItem) => void
  clearCart: () => void
  setShippingAddress: (shippingAddress: ShippingAddress) => Promise<void>
  setPaymentMethod: (paymentMethod: string) => void
  setDeliveryDateIndex: (index: number) => Promise<void>
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cart: initialState,

      addItem: async (item: OrderItem, quantity: number) => {
        const { items, shippingAddress } = get().cart
        const existItem = items.find(
          (x) =>
            x.product === item.product &&
            x.size === item.size &&
            x.color === item.color
        )
        if (existItem) {
          if (existItem.countInStock < quantity + existItem.quantity) {
            throw new Error('Not enough stock')
          }
        } else {
          if (item.countInStock < item.quantity) {
            throw new Error('Not enough stock')
          }
        }
        const updatedCartItems = existItem
          ? items.map((x) =>
              x.product === existItem.product &&
              x.size === existItem.size &&
              x.color === existItem.color
                ? { ...existItem, quantity: existItem.quantity + quantity }
                : x
            )
          : [...items, { ...item, quantity }]
        set({
          cart: {
            ...get().cart,
            items: updatedCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updatedCartItems,
              shippingAddress,
            })),
          },
        })
       
        const foundItem = updatedCartItems.find(
          (x) =>
            x.product === item.product &&
            x.size === item.size &&
            x.color === item.color
        )
        if (!foundItem) {
          throw new Error('Item not found in cart')
        }
        return foundItem.clientId
      },

      updateItem: async (item: OrderItem, quantity: number) => {
        const { items, shippingAddress } = get().cart
        const exist = items.find(
          (x) =>
            x.product === item.product &&
            x.size === item.size &&
            x.color === item.color
        )
        if (!exist) return
        const updatedCartItems = items.map((x) =>
          x.product === exist.product &&
          x.size === exist.size &&
          x.color === exist.color
            ? { ...exist, quantity }
            : x
        )
        set({
          cart: {
            ...get().cart,
            items: updatedCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updatedCartItems,
              shippingAddress,
            })),
          },
        })
      },

      removeItem: async (item: OrderItem) => {
        const { items, shippingAddress } = get().cart
        const updatedCartItems = items.filter(
          (x) =>
            x.product !== item.product ||
            x.size !== item.size ||
            x.color !== item.color
        )
        set({
          cart: {
            ...get().cart,
            items: updatedCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updatedCartItems,
              shippingAddress,
            })),
          },
        })
      },

      init: () => set({ cart: initialState }),
      setShippingAddress: async (shippingAddress: ShippingAddress) => {
        const { items } = get().cart
        set({
          cart: {
            ...get().cart,
            shippingAddress,
            ...(await calcDeliveryDateAndPrice({
              items,
              shippingAddress,
            })),
          },
        })
      },
      setPaymentMethod: (paymentMethod: string) => {
        set({
          cart: {
            ...get().cart,
            paymentMethod,
          },
        })
      },
      setDeliveryDateIndex: async (index: number) => {
        const { items, shippingAddress } = get().cart

        set({
          cart: {
            ...get().cart,
            ...(await calcDeliveryDateAndPrice({
              items,
              shippingAddress,
              deliveryDateIndex: index,
            })),
          },
        })
      },
      clearCart: () => {
        set({
          cart: {
            ...get().cart,
            items: [],
          },
        })
      },
    }),

    {
      name: 'cart-store',
    }
  )
)
export default useCartStore
