"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import img1 from "../../img/r1.webp";
import img2 from "../../img/r2.webp";
export default function Review() {
  let [storyData, setstoryData] = useState([]);
  let [path, setPath] = useState("");
  let story = (slug) => {
    axios.get(`http://localhost:8000/website/story/addstory`).then((res) => {
      setstoryData(res.data.data);
      setPath(res.data.path);
    });
  };

  useEffect(() => {
    story(); // Pass slug to subcategory
  }, []);
  return (
    <>
      <div className="w-full mt-[50px] bg-[#F9F9F9]">
        <h1 className="text-[30px] text-center py-[20px] uppercase">
          You didn’t hear it from us
        </h1>
        <div className="grid grid-cols-2 pl-[25px] space-x-3">
          {storyData.map((items, index) => {
            return (
              <div className="grid grid-cols-2">
                <div className="bg-white p-[30px]">
                  <div className="star flex space-x-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <p className="text-[10px]">Based on 113 Reviews</p>
                  </div>
                  <div>
                    <h3 className="mb-[20px] mt-[20px]">{items.storyDes}</h3>
                    <span className="text-gray-500 mt-[20px]">
                      {items.storyName}
                    </span>
                    <br />
                    <button className="underline mt-[10px]">Shop Now</button>
                  </div>
                  <div> <img src={path + items.bannerImage} alt="" className="w-[100px] h-[100px]"/></div>
                </div>
                <div>
                  <img src={path + items.storyImage} alt="" className="w-full h-[300px] my-[40%]"/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
