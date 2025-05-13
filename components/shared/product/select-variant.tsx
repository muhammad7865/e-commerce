'use client'

import { Button } from '@/components/ui/button'
import { IProduct } from '@/lib/db/models/product.model'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export default function SelectVariant({
  product,
  size,
  color,
}: {
  product: IProduct
  color: string
  size: string
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedColor = color || product.colors[0]
  const selectedSize = size || product.sizes[0]

  const buildUrl = (newColor: string, newSize: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('color', newColor)
    params.set('size', newSize)
    return `${pathname}?${params.toString()}`
  }

  return (
    <>
      {product.colors.length > 0 && (
        <div className='space-x-2 space-y-2'>
          <div>Color:</div>
          {product.colors.map((x: string) => (
            <Button
              asChild
              variant='outline'
              className={
                selectedColor === x ? 'border-2 border-primary' : 'border-2'
              }
              key={x}
            >
              <Link replace scroll={false} href={buildUrl(x, selectedSize)}>
                <div
                  style={{ backgroundColor: x }}
                  className='h-4 w-4 rounded-full border border-muted-foreground'
                ></div>
                {x}
              </Link>
            </Button>
          ))}
        </div>
      )}

      {product.sizes.length > 0 && (
        <div className='mt-2 space-x-2 space-y-2'>
          <div>Size:</div>
          {product.sizes.map((x: string) => (
            <Button
              asChild
              variant='outline'
              className={
                selectedSize === x
                  ? 'border-2 border-primary'
                  : 'border-2'
              }
              key={x}
            >
              <Link replace scroll={false} href={buildUrl(selectedColor, x)}>
                {x}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </>
  )
}
