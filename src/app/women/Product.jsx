"use client";
import { CiHeart } from "react-icons/ci";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addtocart, removeCart } from "../slice/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Product() {
  let [productData, setProductData] = useState([]); // All products data
  let [path, setPath] = useState(""); // Path for images
  let { slug } = useParams(); // Get the dynamic slug for subcategories
  const router = useRouter(); // Next.js router to handle navigation
  let cartData = useSelector((state) => state.cartReducer.cart);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch all product data based on the subcategory (slug)
  const allProducts = (slug) => {
    setLoading(true); // Set loading to true before fetching
    axios
      .get(`http://localhost:8000/website/product/product-data/${slug}`)
      .then((res) => {
        // Set the product data and image path from response
        setProductData(res.data.productData);
        setPath(res.data.path);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching
      });
  };

  useEffect(() => {
    if (slug) {
      // Fetch product data when slug is available
      allProducts(slug);
    }
  }, [slug]);

  // Navigate to the product details page using the product ID
  const handleProductClick = (product) => {
    setLoading(true); // Set loading to true when clicking the image
    router.push(`/ProductDetails/${product._id}`); // Use product ID for dynamic navigation
  };

  return (
    <div className="w-full mt-[50px] px-[35px]">
      <ToastContainer />

      <hr />
      <h1 className="mt-[30px] mb-[10px] text-[20px] capitalize">{slug}</h1>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div> {/* You can replace this with your loader component */}
        </div>
      )}

      {!loading && (
        <div className="flex space-x-5 flex-wrap my-[30px]">
          {/* Pass productData and path to ProductItems */}
          <ProductItems
            productData={productData}
            path={path}
            handleProductClick={handleProductClick}
            cartData={cartData} // Pass the cart data here
          />
        </div>
      )}
    </div>
  );
}

// Reusable component for rendering product items
function ProductItems({
  productData,
  path,
  handleProductClick,
  cartData, // Receive cartData as a prop
}) {
  const dispatch = useDispatch();

  const addCart = (item) => {
    let obj = {
      pId: item._id,
      pPrice: item.productPrice,
      quantity: 1,
      pImg: path + item.productImage,
      pName: item.productName,
    };
    dispatch(addtocart(obj));
    toast.success("Item added to cart!", {
      autoClose: 3000, // Time in milliseconds before it disappears
    });
  };

  return (
    <>
      {productData.map((item, index) => {
        // Check if the product is already in the cart
        const isInCart = cartData.some((cartItem) => cartItem.pId === item._id);

        return (
          <div
            key={index}
            className="relative shadow-2xl py-5 px-5 cursor-pointer"
          >
            <img
              onClick={() => handleProductClick(item)} // Navigate on click
              src={path + item.productImage} // Image with dynamic path
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
            <h1 className="text-[13px] font-bold text-break">
              {item.productShortDes}
            </h1>
            <span className="line-through text-[13px] mr-2">
              ${item.productPrice}
            </span>
            <span className="text-red-600 text-[13px]">${item.productMrp}</span>
            <br />
            <span className="text-gray-600 mt-[15px] text-[13px]">
              {item.productColor.length} Colors
            </span>
            <br />
            <span className="text-gray-600 mt-[15px] text-[13px]">
              {item.productSize.length} Sizes
            </span>
            <div>
              {isInCart ? (
                <button
                  className="w-full bg-red-700 py-2 mt-3 text-white"
                  onClick={() => dispatch(removeCart({ pId: item._id }))} // Remove from cart
                >
                  REMOVE FROM CART
                </button>
              ) : (
                <button
                  className="w-full bg-black py-2 mt-3 text-white"
                  onClick={() => addCart(item)} // Add to cart
                >
                  ADD TO CART
                </button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
