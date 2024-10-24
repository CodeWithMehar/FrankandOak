"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Filter() {
  let [subcat, setSubcat] = useState([]);
  let [size, setSize] = useState([]);
  let [color, setColor] = useState([]);
  let [productData, setProductData] = useState([]);
  let { slug } = useParams();

  let subcategory = (slug) => {
    axios
      .get(`http://localhost:8000/website/product/product-data/${slug}`)
      .then((res) => {
        return res.data;
      })
      .then((finalres) => {
        console.log("finalresponse", finalres.subcatData);
        console.log("finalresponse of size", finalres.size);
        setSubcat(finalres.subcatData);
        setSize(finalres.size);
        setColor(finalres.color);
        setProductData(finalres.productData); // Set product data to handle price
      });
  };

  useEffect(() => {
    if (slug) {
      subcategory(slug); // Pass slug to subcategory
    }
  }, [slug]);

  return (
    <>
      <div className="mt-[10px] pl-[40px] w-full">
        <button className="mr-2 cursor-pointer">
          <a href="/">Home / </a>{" "}
        </button>
        <button className="cursor-pointer font-bold">{slug}</button>

        <div className="filter overflow-y-scroll h-[350px]">
          <h1 className="text-[20px] mt-4 mb-8">New In </h1>
          <hr />

          {/* Subcategory Section */}
          <h1 className="mt-[8px] font-bold">Subcategory</h1>
          <ul className="text-[13px]">
            {subcat.map((items, index) => {
              return (
                <li className="text-[18px]" key={index}>
                  <input
                    type="checkbox"
                    id={`subcat-${index}`}
                    className="mr-[10px] mt-[10px] w-[18px] h-[18px] rounded-none"
                  />
                  <label htmlFor={`subcat-${index}`} className="mb-[0px]">
                    {items.subcategoryName}
                  </label>
                </li>
              );
            })}
          </ul>
          <hr />

          {/* Size Section */}
          <div>
            <h1 className="font-bold">Size</h1>
            <ol className="">
              {size.map((item, index) => (
                <li key={index} className="text-[18px]">
                <input type="checkbox" className="mr-[10px] mt-[10px] w-[18px] h-[18px] rounded-none"/>
                
                  <label htmlFor={`subcat-${index}`} className="mb-[0px]">
                  {item.sizeName}
                  </label>
                </li>
              ))}
            </ol>
          </div>
          <hr />

          {/* Color Section */}
          <div>
            <h1 className="font-bold">Color</h1>
            <ol className="">
              {color.map((item, index) => (
                <li key={index} className="text-[18px]">
                  <input type="checkbox" className="mr-[10px] mt-[10px] w-[18px] h-[18px] rounded-none"/>
                  <label htmlFor={`subcat-${index}`} className="mb-[0px]">
                  {item.colorName}
                  </label>
                 
                </li>
              ))}
            </ol>
          </div>
          <hr />

          {/* Price Section */}
          <div className="">
            <h1 className="font-bold">Price</h1>
            <ul>
              {productData.map((product, index) => (
                <li key={index} className="text-[18px]">
                  <input type="checkbox" className="mr-[10px] mt-[10px] w-[18px] h-[18px] rounded-none"/>
                  <label htmlFor={`subcat-${index}`} className="mb-[0px]">
                  {product.productPrice}$
                  </label>
               
                </li>
              ))}
            </ul>
          </div>
          <hr />

          {/* Feature Section */}
          <div className="feature">
            <ul className="text-[13px]">
              <li className="font-bold mb-[10px] mt-[10px] text-[16px]">Feature</li>
              <li>New Seller</li>
              <li>Linene</li>
              <li>Original</li>
              <li>Warm dresses</li>
              <li>Sale</li>
            </ul>
          </div>

          {/* Accessories Section */}
          <div className="feature">
            <ul className="text-[13px]">
              <li className="font-bold mb-[10px] mt-[10px] text-[16px]">Accessories</li>
              <li>New Seller</li>
              <li>Linene</li>
              <li>Original</li>
              <li>Warm dresses</li>
              <li>Sale</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
