import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'
import Carts from './Carts'
import { useStateContext } from '@/context/StateContext'
const NavBar = () => {
  const {showCart,setshowCart, totalQuantites } = useStateContext()
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>HeadPhones</Link>

      </p>
      <button type='button'
      className='cart-icon' onClick={()=> setshowCart(true)}>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>{totalQuantites}</span>
      </button>

      {showCart && <Carts></Carts>}
    </div>
  )
}

export default NavBar