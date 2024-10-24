"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Saleslider from "@/app/frank/Saleslider";
import Review from "@/app/frank/Review";
import Link from "next/link";
export default function ProductDetails() {
  const { id } = useParams(); // Get the dynamic product ID from the URL
  const [product, setProduct] = useState(null); // Store the fetched product data
  const [path, setPath] = useState(""); // Store the image path
  const [color, setColor] = useState([]); // Store the image path
  const [size, setSize] = useState([]); // Store the image path

  useEffect(() => {
    if (id) {
      // Fetch product details by ID from the backend
      axios
        .get(`http://localhost:8000/website/product/product-details/${id}`) // Use product-data route with id
        .then((res) => {
          // Set the product and path data from the response
          setProduct(res.data.productData);
          setPath(res.data.path);
          setColor(res.data.color);
          setSize(res.data.size);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Display loading until the product data is fetched
  }

  return (
 <>
    <div className="flex my-5">
      {/* Product Gallery Section */}
      <div className="w-1/2 p-5">
        {/* Main Image */}
        <img
          src={path + product.productImage} // Display main product image from the fetched path
          alt={product.productName}
          className="object-fit w-full h-[300px]" // Styling for the main image
        />

        {/* Product Gallery - Multiple Images */}
        <h1 className="text-[30px] font-bold my-3">Product Gallery</h1>
        <div className="flex justify-between mt-5 overflow-x-auto flex-wrap">
          {/* Loop through product images */}
          {product.productGallery?.map((image, index) => (
            <img
              key={index}
              src={path + image} // Display additional images
              alt={`Gallery Image ${index + 1}`}
              className="object-cover w-[150px] h-[150px] cursor-pointer" // Thumbnail styling
            />
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="w-1/2 p-5">
        <h1 className="text-[24px] font-bold uppercase">
          {product.productName}
        </h1>
        <p>{product.productDes}</p>
        <p>4 interest-free payments of $23.99 with Klarna. Learn More</p>
        <div className="my-3 flex space-x-4 align-middle ">
          <h1 className="font-bold text-[20px]">Price</h1>
          <span className="line-through mr-2 font-bold">
            ${product.productPrice}
          </span>
          <span className="text-red-600">${product.productMrp}</span>
        </div>

        {/* Display available colors */}
       <div className="flex justify-between my-5">
       <h1>Avaliable Colors : </h1>
        <ol className="flex space-x-3">
          {color.map((c, i) => {
            return (
              <li className="">
                <input type="checkbox" /><span className="font-bold uppercase text-[18px]"> {c.colorName}</span>{" "}
              </li>
            );
          })}
        </ol>
       </div>

        {/* Display available sizes */}
        <div className="flex justify-between my-5">
      <h1>Avaliable Sizes : </h1>
        <ol className="flex space-x-3">
          {size.map((s, i) => {
            return (
              <li className="">
              <input type="checkbox" className="text-[18px]" /> <span className="font-bold uppercase text-[18px]"> {s.sizeName}</span>{" "}
              </li>
            );
          })}
        </ol>
      </div>

        {/* Add to cart button */}
        <button className="mt-5 bg-black text-white py-2 px-4 w-full">
        <Link href= {'/Cart'}>   ADD TO CART</Link>
        </button>
      </div>
    </div>
    <Saleslider/>
<Review/>
 </>
  );
}

