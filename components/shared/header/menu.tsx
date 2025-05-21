import CartButton from './cart-button'
import UserButton from './user-button'



export default function Menu({ forAdmin = false }: { forAdmin?: boolean }) {
  return (
    <div className='flex justify-end'>
      <nav className=' hidden md:flex gap-3 w-full'>
      
      <UserButton/>
      {forAdmin ? null : <CartButton />}
      </nav>
  
    </div>
  )
}