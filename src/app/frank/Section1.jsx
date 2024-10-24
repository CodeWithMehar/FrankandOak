"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import web1 from "../../img/web1.webp";
import web2 from "../../img/web2.webp";
import web3 from "../../img/web3.webp";
import web4 from "../../img/web4.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

export default function Section1() {
  let [sliderData , setSliderdata] = useState([])
  let [path, setPath] = useState("");
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  let addSlider = () => {
    axios.get('http://localhost:8000/website/slider/addslider').then((res) => {
      console.log("slider",res.data);
      setSliderdata(res.data.data);
      setPath(res.data.path);
    });
  };
  useEffect(()=>{
    addSlider();
  },[])
  return (
    <div>
      <div className="grid grid-cols-2 w-full h-[100vh] mt-[10px] bg-[#F0F0EE] p-[30px]">
        <div className="pt-[90px] pl-[35px] w-[50%]">
          <h1 className="text-[65px] font-bold leading-[60px]">
            The <br />
            Stockroom Sale
          </h1>
          <div className="flex space-x-3">
            <button className="border-2 mt-[30px] w-[150px] font-bold mr-5 px-[30px] py-[10px] border-black">
              Women
            </button>
            <button className="border-2 mt-[30px] w-[150px] font-bold px-[30px] py-[10px] border-black">
              Men
            </button>
          </div>
        </div>
        <div className="w-[50%]">
          <Slider {...settings} className="mt-[0%]">
            {sliderData.map((items , index) =>{
              return(
                <div>
                <img
                  src={path+items.sliderImage}
                  alt="Slider Image 1"
                  className="w-full h-[300px]"
                />{" "}
                <div className="w-full bg-black text-white py-4 -rotate-12 text-center rounded mb-[10%] z-50">
                 {items.sliderName}
                </div>
              </div>
              )
            })}
          
          
          </Slider>
        </div>
      </div>
      <div className="bg-black w-full flex space-x-11 justify-around pl-[40px] py-[10px]">
        <div className="flex align-middle items-center space-x-3">
          <Image src={web3} className="w-[15px]" alt="icon" />
          <p className="text-white ">Free Shopping at $10 Sale</p>
        </div>
        <div className="flex align-middle items-center space-x-3">
          <Image src={web2} className="w-[15px]" alt="icon" />
          <p className="text-white ">Free Returns</p>
        </div>
        <div className="flex align-middle items-center space-x-3">
          <Image src={web1} className="w-[15px]" alt="icon" />
          <p className="text-white ">Earn Points</p>
        </div>
        <div className="flex align-middle items-center space-x-3">
          <Image src={web4} className="w-[15px]" alt="icon" />
          <p className="text-white ">Buy Now, Pay Later</p>
        </div>
      </div>
    </div>
  );
}
