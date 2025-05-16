export const appName = process.env.Next_PUBLIC_APP_NAME || "NEW_COMMERCE";
export const APP_SLOGAN =
  process.env.NEXT_PUBLIC_APP_SLOGAN || "Your trust our priority";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||"BUILT WITH NEXT.JS, TAILWIND CSS, AND MONGODB";
export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9)

export const FREE_SHIPPING_MIN_PRICE = Number(
  process.env.FREE_SHIPPING_MIN_PRICE || 35
)