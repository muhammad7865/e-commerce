import Link from 'next/link'
import { ShoppingCartIcon} from 'lucide-react'

export default function Menu() {
  return (
    <div className='flex justify-end'>
      <nav className='flex gap-3 w-full'>
        <Link href='/signin' className='flex items-center header-button'>
         Hello , Sign In
        </Link>

        <Link href='/cart' className='header-button'>
          <ShoppingCartIcon className='h-8 w-8' />
          <span className='font-bold text-sm'>Cart</span>
        </Link>
      </nav>
    </div>
  )
}
