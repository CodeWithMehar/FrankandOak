import React from 'react'
import Img from './Img'
import Cart from './Cart';
import Saleslider from '../frank/Saleslider';
export default function page() {
  return (
    <div>
      <div className="w-full flex">
     <div className="w-[55%]"> <Img/> </div>
      <div className="w-[45%]"> <Cart/>  </div>
      </div>
      <Saleslider/>
    </div>
  )
}
