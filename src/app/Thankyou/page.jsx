"use client";
import React from "react";
import Link from "next/link";

export default function ThanksPage() {
  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVh5ePyeC5tEagHAuWRys-En3V5U1EQlSETg&s')", // Update with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Thank You for Your Order!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We appreciate your purchase and will start processing your order soon.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out">
          <Link href={'/'}> Back to Home</Link>
        </button>
      </div>
    </div>
  );
}
