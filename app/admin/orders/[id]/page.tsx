// app/admin/orders/[id]/page.tsx
import { getOrderById } from '@/lib/actions/order.actions'
import { notFound } from 'next/navigation'
import { formatDateTime, formatId } from '@/lib/utils'
import ProductPrice from '@/components/shared/product/product-price'

export default async function OrderDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const order = await getOrderById(params.id)

  if (!order) return notFound()

  return (
    <div className='space-y-4'>
      <h1 className='h1-bold'>Order Details</h1>
      <p><strong>ID:</strong> {formatId(order._id)}</p>
     <p><strong>Buyer:</strong> 
  {typeof order.user === 'object' && 'name' in order.user
    ? order.user.name
    : 'Deleted User'}
</p><p>
        <strong>Created At:</strong>{' '}
        {formatDateTime(order.createdAt).dateTime}
      </p>
      <p>
        <strong>Total Price:</strong>{' '}
        <ProductPrice price={order.totalPrice} plain />
      </p>
      <p><strong>Is Paid:</strong> {order.isPaid ? 'Yes' : 'No'}</p>
      <p><strong>Is Delivered:</strong> {order.isDelivered ? 'Yes' : 'No'}</p>
    </div>
  )
}
