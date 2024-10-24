"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { changeQty, removeCart } from "../slice/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartReducer.cart);

  return (
    <>
      <ToastContainer />
      <div className="w-full px-6">
        <h1 className="text-[30px] text-center mt-6 mb-6 font-bold">
          Your Cart
        </h1>
        <div className="flex justify-between">
          {/* Products side */}
          <div className="w-2/3 pr-6">
            {cartData.length >= 1 ? (
              cartData.map((item, index) => (
                <CartItem item={item} key={index} dispatch={dispatch} />
              ))
            ) : (
            <h1 className="text-red-500 font-bold text-[30px]">Empty Cart !</h1>
            )}
          </div>

          {/* Order Summary side */}
          <div className="w-1/3 border p-[30px] rounded-lg h-fit bg-gray-100">
            <h1 className="font-bold text-[20px] mb-4">Order Summary</h1>

            <div className="flex justify-between mb-4">
              <h2 className="text-gray-600">Sub Total</h2>
              <h1 className="font-bold">
                ${cartData.reduce((acc, item) => acc + item.pPrice * item.quantity, 0)}
              </h1>
            </div>

            <div className="flex justify-between mb-4">
              <h2 className="text-gray-600">Delivery Charges</h2>
              <h1 className="font-bold">$20</h1>
            </div>

            <div className="flex justify-between mb-6">
              <h2 className="text-gray-600">Total</h2>
              <h1 className="font-bold text-lg">
                $
                {cartData.reduce((acc, item) => acc + item.pPrice * item.quantity, 0) + 20}
              </h1>
            </div>

            <button className="w-full bg-blue-600 rounded p-2 text-white">
              <Link href="/Checkout">Check-Out</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function CartItem({ item, dispatch }) {
  let [qty, setQty] = useState(item.quantity);

  useEffect(() => {
    dispatch(changeQty({ pId: item.pId, qty }));
  }, [qty]);

  return (
    <div className="flex space-x-4 mb-6 p-4 bg-white shadow-lg rounded-lg">
      <div className="w-1/4">
        <img src={item.pImg} alt={item.pName} className="w-full h-auto" />
      </div>
      <div className="flex-1 pl-[20px]">
        <h1 className="font-semibold text-lg uppercase">{item.pName}</h1>
        <div className="flex space-x-2 items-center mt-[20px]">
          <FaMinus
            className="bg-[#ccc] p-[5px] font-bold cursor-pointer text-[20px]"
            onClick={() => {
              if (qty > 1) {
                setQty(qty - 1);
              }
            }}
          />
          <input
            min={1}
            max={5}
            type="number"
            value={qty}
            className="w-[40px] border pl-[8px] text-center"
            // onChange={(e) => setQty(Number(e.target.value))}
          />
          <FaPlus
            className="bg-[#ccc] p-[5px] font-bold cursor-pointer text-[20px]"
            onClick={() => {
              if (qty < 5) {
                setQty(qty + 1);
              }
            }}
          />
        </div>
        <h3 className="font-bold mt-[15px] text-xl"> ${item.pPrice}</h3>
        <h3 className="font-bold mt-[15px] text-xl">
          Total : ${qty * item.pPrice}
        </h3>
        <button
          className="bg-red-700 rounded p-[5px] text-white mt-[15px]"
          onClick={() => dispatch(removeCart({ pId: item.pId }))}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
}
