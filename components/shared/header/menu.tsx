import CartButton from './cart-button'
import UserButton from './user-button'



export default function Menu() {
  return (
    <div className='flex justify-end'>
      <nav className=' hidden md:flex gap-3 w-full'>
      
        <UserButton />
        <CartButton />
      </nav>
  
    </div>
  )
}