"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useRazorpay } from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearCart } from "../slice/cartSlice";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { Razorpay } = useRazorpay();
  const router = useRouter();
  const [shipData, setShipdata] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [loading, setLoading] = useState(false); // Loading state
  const cartData = useSelector((state) => state.cartReducer.cart);

  const subtotal = cartData.reduce(
    (total, item) => total + item.pPrice * item.quantity,
    0
  );

  const shipping = 5.0;
  const tax = subtotal * 0.05; // Example: 5% tax
  const total = subtotal + shipping + tax;
  const token = useSelector((state) => state.loginReducer.token);

  const getValue = (e) => {
    setShipdata({ ...shipData, [e.target.name]: e.target.value });
  };

  const saveData = async (e) => {
    e.preventDefault();

    let finalData = {
      shipData,
      cartData,
      paymentMethod,
      token,
      total,
    };
    axios
      .post("http://localhost:8000/website/order/save-order", finalData)
      .then((res) => {
        if(res.data.payment_type == 1) {
        
          toast.success("Your order has been Placed!", {
            autoClose: 3000,
          });
          setShipdata({
            name: "",
            phoneNumber: "",
            address: "",
          });
          router.push("/Thankyou");
          dispatch(clearCart())
       

     
        }
        if (res.data.payment_type == 2) {
          const options = {
            key: "rzp_test_0gYcjwTJCUgngj",
            amount: res.data.order.amount, // Amount in paise
            currency: "INR",
            name: "WS",
            description: "WS Provide Product",
            order_id: res.data.order.id, // Generate order_id on server
            handler: (response) => {
              console.log(response);
              axios
                .post(
                  "http://localhost:8000/website/order/payment-verification",
                  {
                    razorpay_order_id: res.data.order.id,
                    razorpay_response: response,
                  }
                )
                .then((success) => {
                  alert("Payment Successful!");
                  router.push("/Thankyou");
                  dispatch(clearCart())
                })
                .catch((error) => {
                  notify("Client error", "error");
                });
            },
            prefill: {
              name: "John Doe",
              email: "john.doe@example.com",
              contact: "9999999999",
            },
            theme: {
              color: "#F37254",
            },
          };
          const razorpayInstance = new Razorpay(options);
          razorpayInstance.open();
          setShipdata({
            name: "",
            phoneNumber: "",
            address: "",
          });
          
        }
      });
   
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto my-10 p-6">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="loader">Loading...</div>
            {/* Replace with your loading spinner or icon */}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg">
            {/* Left Side: Delivery Information */}
            <div className="w-full lg:w-1/2 p-6">
              <h3 className="text-2xl font-semibold mb-6">Delivery</h3>

              <form onSubmit={saveData}>
                {/* Name */}
                <div className="mb-4">
                  <label className="block mb-2 text-gray-700">Full Name</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={shipData.name}
                    onChange={getValue}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Address */}
                <div className="mb-4">
                  <label className="block mb-2 text-gray-700">Address</label>
                  <textarea
                    required
                    name="address"
                    onChange={getValue}
                    value={shipData.address}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter your delivery address"
                  ></textarea>
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                  <label className="block mb-2 text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={shipData.phoneNumber}
                    onChange={getValue}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Payment Method */}
                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="1"
                      className="form-radio"
                      checked={paymentMethod == 1 ? true : ''}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="ml-2">Cash on Delivery</span>
                  </label>
                </div>

                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="2"
                      checked={paymentMethod == 2 ? true : ''}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="form-radio"
                    />
                    <span className="ml-2">Razorpay</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded"
                >
                  Place Order
                </button>
              </form>
            </div>

            {/* Right Side: Order Summary */}
            <div className="w-full lg:w-1/2 bg-gray-100 p-6">
              <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>

              {cartData.length > 0 ? (
                <>
                  {/* Item Summary */}
                  <div className="border-b pb-4 mb-4">
                    {cartData.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between mb-2 uppercase"
                      >
                        <p>{item.pName}</p>
                        <p>
                          ${item.pPrice} x {item.quantity} = $
                          {(item.pPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Price Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Subtotal</p>
                      <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Shipping</p>
                      <p>${shipping.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Tax</p>
                      <p>${tax.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mt-6 pt-4 border-t border-gray-300">
                    <div className="flex justify-between font-semibold">
                      <p>Total</p>
                      <p>${total.toFixed(2)}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <h1 className="text-[40px] text-red-600 font-bold">Your cart is empty.</h1>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderSummary;
