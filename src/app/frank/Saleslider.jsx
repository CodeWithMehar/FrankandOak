"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiHeart } from "react-icons/ci";
import Link from "next/link";

export default function Saleslider() {
  let [productData, setProductData] = useState([]);
  let [path, setPath] = useState("");
  let { slug } = useParams(); // Dynamically capture the slug from the URL
  const [activeSlider, setActiveSlider] = useState("women");

  // Slider settings
  var settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Adjust to 4 for better spacing
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Fetch product data based on slug
  const fetchProducts = (slug) => {
    axios
      .get(`http://localhost:8000/website/product/product-data/${slug}`)
      .then((res) => {
        setProductData(res.data.productData); // Assuming the product data comes in this structure
        setPath(res.data.path); // Assuming path is part of the response
      })
      .catch((err) => {
        console.error("Error fetching product data:", err);
      });
  };

  useEffect(() => {
    if (slug) {
      fetchProducts(slug); // Fetch products based on the dynamic slug
    }
  }, [slug]);

  // Handle tab switch between Women and Men
  const handleTabClick = (sliderType) => {
    setActiveSlider(sliderType);
    fetchProducts(sliderType.toUpperCase()); // Fetch data based on selected slider
  };

  return (
    <div className="w-full p-[30px]">
      <div className="flex justify-around">
        <h1 className="text-[30px] font-bold">
          The Stockroom Sale — Incomparable prices, from our <br /> warehouse to
          you.
        </h1>
        <button
          className={`text-[25px] ${activeSlider === "women" ? "underline" : ""}`}
          onClick={() => handleTabClick("women")} // Switch to Women's products
        >
          Women
        </button>
        <button
          className={`text-[25px] ${activeSlider === "men" ? "underline text-black" : "text-[#787878]"}`}
          onClick={() => handleTabClick("men")} // Switch to Men's products
        >
          Men
        </button>
      </div>

      <div className="w-full mt-[50px]">
        <Slider {...settings}>
          {productData.map((item, index) => (
            <div key={index} className="relative shadow-2xl py-5 px-5 cursor-pointer">
              <img
                src={path + item.productImage}
                alt={item.productName}
                className="object-cover img1 mx-auto"
                height={200}
                width={200}
              />
              <div className="absolute top-[0%] ml-[70%] bg-black">
                <p className="text-white text-[10px] p-[5px]">NEW</p>
              </div>
              <div className="flex space-x-7 relative mt-5">
                <h1 className="text-[13px] font-bold">{item.productName}</h1>
                <CiHeart className="text-[25px] absolute top-0 right-0" />
              </div>
              <h1 className="text-[13px] font-bold text-break">{item.productShortDes}</h1>
              <span className="line-through text-[13px] mr-2">${item.productPrice}</span>
              <span className="text-red-600 text-[13px]">${item.productMrp}</span> <br />
              <span className="text-gray-600 mt-[15px] text-[13px]">
                {item.productColor.length} Colors
              </span>
              <br />
              <span className="text-gray-600 mt-[15px] text-[13px]">
                {item.productSize.length} Size
              </span>
              <div>
                <button className="w-full bg-black py-2 mt-3 text-white">   <Link href= {'/Cart'}>   ADD TO CART</Link></button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
