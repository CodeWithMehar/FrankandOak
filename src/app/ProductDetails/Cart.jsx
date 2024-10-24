import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import img1 from "../../img/bb1.png";
import Image from "next/image";
import c1 from "../../img/cc1.svg";
import c2 from "../../img/cc2.svg";
import { CiStar } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import s1 from "../../img/sl1.webp";
import { CiHeart } from "react-icons/ci";
export default function Cart() {
  return (
    <>
      <div className="w-full pt-[30px] pl-[10px]">
        <ul className="flex">
          <li>
            <a href="/" className="underline">
              Home/
            </a>
          </li>
          <li>
            <a href="/women" className="underline">
              New In/
            </a>
          </li>
          <li>
            <a href="#" className="underline">
              Women
            </a>
          </li>
        </ul>
        <button className="bg-black text-white rounded text-[10px] p-[5px] my-[15px]">
          NEW
        </button>
        <h1 className="text-[25px] my-[15px]">
          The Crisp Poplin Shirt in Latte{" "}
        </h1>
        <h1 className="text-[16px] my-[15px]">$99.50 </h1>
        <h1 className="text-[10px] my-[15px]">
          4 interest-free payments of $24.87 with Klarna. Learn More
        </h1>
        <div className="star flex space-x-2 my-[25px]">
          <CiStar />
          <CiStar />
          <CiStar />
          <CiStar />
          <CiStar />
        </div>
        <hr />
        <h1 className="text-[14px] my-[15px]">Select a size</h1>
        <div className="flex space-x-5">
          <input
            type="text"
            placeholder="XXS"
            className="w-[40px] border  size"
          />
          <input
            type="text"
            placeholder="XS"
            className="w-[40px] border pl-[5px] size"
          />
          <input type="text" placeholder="S" className="w-[40px] border size" />
          <input type="text" placeholder="M" className="w-[40px] border size" />
          <input type="text" placeholder="L" className="w-[40px] border size" />
          <input
            type="text"
            placeholder="XL"
            className="w-[40px] border size"
          />
        </div>
        <div className="flex space-x-1">
          <button className="bg-black text-white w-[85%] my-[25px] p-[10px]">
            ADD TO CART
          </button>
          <button className="text-black text-center border-2 text-[30px] me-[10px] border-black w-[10%] my-[25px] p-[10px]">
            <FaRegHeart />
          </button>
        </div>
        <hr />
        <Image src={img1} width={550} className="my-[20px]" />
        <hr />
        <div className="flex my-[30px] space-x-10">
          <div className="flex space-x-3 justify-center text-center align-middle">
            <Image src={c1} />
            <h1 className="text-[12px] pt-[5px]">Free Shipping over $99</h1>
          </div>
          <div className="flex space-x-3 justify-center text-center align-middle">
            <Image src={c2} />
            <h1 className="text-[12px] pt-[5px]">Free Returns</h1>
          </div>
        </div>
        <hr />
        <div className="my-[20px]">
          <h1 className="text-[16px] mb-[20px] font-bold">Overview</h1>
          <p className="text-[10px]">
            An effortless design to elevate the everyday. Crafted from organic
            cotton, the boxy T-shirt features an ample fit and a thick fabric
            with a sleek look and feel. Dropped shoulders. Wide sleeves. Classic
            crewneck. Long length. Black contrast topstitches.
          </p>
        </div>
        <hr />
        <div>
          {" "}
          <div className="flex space-x-[450px] my-[15px]">
            <h1>Fit & Sizing</h1>
            <FaPlus />
          </div>
          <hr />
          <div className="flex space-x-[420px] my-[15px]">
            <h1>Material & Care</h1>
            <FaPlus />
          </div>
          <hr />
          <div className="flex space-x-[410px] my-[15px]">
            <h1>Shipping & Return</h1>
            <FaPlus />
          </div>
          <hr />
        </div>
        <div className="relative my-[40px]">
          <a href="/ProductDetails">
            <Image
              src={s1}
              alt="Slide 1"
              width={100}
              height={100}
              className="object-cover  img1"
            />
          </a>
          <div className="absolute top-[0%] ml-[20%] bg-black">
            <p className="text-white text-[8px] p-[3px]">NEW</p>
          </div>
          <div className="flex space-x-7">
            {" "}
            <h1 className="text-[13px] font-bold">The baby T-Shirt in Black</h1>
            <CiHeart className="text-[25px] absolute top-[80%] left-[15%]" />
          </div>
          <span className="line-through text-[13px]">$200.50 </span>
          <span className="text-red-600 font-bold text-[13px]">
            {" "}
            $100.50
          </span>{" "}
          <br />
          <span className="text-gray-500 mt-[15px] text-[10px]">1 colour</span>
        </div>
      </div>
    </>
  );
}
