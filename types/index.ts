import { CartSchema, OrderInputSchema, OrderItemSchema,  UserNameSchema, ProductInputSchema, ReviewInputSchema, ShippingAddressSchema, UserInputSchema, UserSignInSchema,  UserSignUpSchema ,ProductUpdateSchema, WebPageInputSchema} from '@/lib/validator'
import { z } from 'zod'

export type IProductInput = z.infer<typeof ProductInputSchema>
export type IReviewInput = z.infer<typeof ReviewInputSchema>
export type IProductUpdateInput = z.infer<typeof ProductUpdateSchema>

export type IReviewDetails = IReviewInput & {
  _id: string
  createdAt: string
  user: {
    name: string
  }
}
export type Data = {
  users: IUserInput[]
  products: IProductInput[]
  webPages: IWebPageInput[]
  
    reviews: {
    title: string
    rating: number
    comment: string
  }[]
  headerMenus: {
    name: string
    href: string
  }[]
  carousels: {
    image: string
    url: string
    title: string
    buttonCaption: string
    isPublished: boolean
  }[]
}


export type IOrderList = IOrderInput & {
  _id: string
  user: {
    name: string
    email: string
  }
  createdAt: Date
}
export type IOrderInput = z.infer<typeof OrderInputSchema>
export type OrderItem = z.infer<typeof OrderItemSchema>
export type Cart = z.infer<typeof CartSchema>
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>


// user
export type IUserInput = z.infer<typeof UserInputSchema>
export type IUserSignIn = z.infer<typeof UserSignInSchema>
export type IUserSignUp = z.infer<typeof UserSignUpSchema>
export type IUserName = z.infer<typeof UserNameSchema>
export type IWebPageInput = z.infer<typeof WebPageInputSchema>