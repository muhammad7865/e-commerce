
import { Resend } from 'resend'
import { SENDER_EMAIL, SENDER_NAME } from '@/lib/constants'
import AskReviewOrderItemsEmail from './ask-review-order-items'
import { IOrder } from '@/lib/db/models/order.model'
import PurchaseReceiptEmail from './purchase-receipt'

const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable')
  }
  return new Resend(apiKey)
}

export const sendAskReviewOrderItems = async ({ order }: { order: IOrder }) => {
  const oneDayFromNow = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()
  console.log('order', order)
  const resend = getResendClient()
  await resend.emails.send({
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to: (order.user as { email: string }).email,
    subject: 'Review your order items',
    react: <AskReviewOrderItemsEmail order={order} />,
    scheduledAt: oneDayFromNow,
  })
}

export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  const resend = getResendClient()
  await resend.emails.send({
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to: (order.user as { email: string }).email,
    subject: 'Order Confirmation',
    react: <PurchaseReceiptEmail order={order} />,
  })
}