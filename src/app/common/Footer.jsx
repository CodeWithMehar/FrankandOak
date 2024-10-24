import React from "react";
import web1 from "../../img/web1.webp";
import web2 from "../../img/web2.webp";
import web3 from "../../img/web3.webp";
import web4 from "../../img/web4.webp";
import Image from "next/image";
import { CiInstagram } from "react-icons/ci";
import { SlSocialFacebook } from "react-icons/sl";
import { CiTwitter } from "react-icons/ci";
import { PiPinterestLogoLight } from "react-icons/pi";
import { LuMailOpen } from "react-icons/lu";
import { RiLinkedinBoxLine } from "react-icons/ri";
export default function Footer() {
  return (
    <>
      <div className="flex justify-around items-center w-full bg-black pt-[100px] pb-[100px]">
        <div>
          <Image src={web2} className="ml-[35px] mb-[10px]" />
          <h4 className="text-white mb-[10px] ml-[10px]">Free Shipping</h4>
          <p className="text-white"> On orders over $99.</p>
        </div>
        <div>
          <Image src={web3} className="ml-[35px] mb-[10px]" />
          <h4 className="text-white mb-[10px] ml-[10px]">Free Shipping</h4>
          <p className="text-white"> On orders over $99.</p>
        </div>
        <div>
          <Image src={web1} className="ml-[35px] mb-[10px]" />
          <h4 className="text-white mb-[10px] ml-[10px]">Free Shipping</h4>
          <p className="text-white"> On orders over $99.</p>
        </div>
        <div>
          <Image src={web4} className="ml-[35px] mb-[10px]" />
          <h4 className="text-white mb-[10px] ml-[10px]">Free Shipping</h4>
          <p className="text-white"> On orders over $99.</p>
        </div>
      </div>
      <div className="flex justify-around items-center w-full bg-black pl-[25px] pr-[25px] pb-[50px]">
        <div>
          <Image src={web1} />
          <ul className="flex mt-[10px] justify-between">
            <li className="text-white space-x-3 mr-[10px] text-[30px]">
              <CiInstagram />
            </li>
            <li className="text-white mr-[10px] text-[30px]">
              <SlSocialFacebook />
            </li>
            <li className="text-white mr-[10px] text-[30px]">
              <CiTwitter />
            </li>
            <li className="text-white mr-[10px] text-[30px]">
              <PiPinterestLogoLight />
            </li>
            <br />
            <li className="text-white mr-[10px] text-[30px]">
              <LuMailOpen />
            </li>
            <li className="text-white mr-[10px] text-[30px]">
              <RiLinkedinBoxLine />
            </li>
          </ul>
        </div>
        <div className="text-white">
          <ul>
            <li className="mb-[10px]">Our Story</li>
            <li className="mb-[10px]">Who we are</li>
            <li className="mb-[10px]">Sustainable practices</li>
            <li className="mb-[10px]">Design Ideology</li>
            <li className="mb-[10px]">Fabrics</li>
            <li className="mb-[10px]">Circular denim™</li>
            <li className="mb-[10px]">Partners and factories</li>
          </ul>
        </div>
        <div>
          <div className="text-white">
            <ul>
              <li className="mb-[10px]">Discover</li>
              <li className="mb-[10px]">Gift Cards</li>
              <li className="mb-[10px]">Frank Rewards</li>
              <li className="mb-[10px]">Give $15, Get $15</li>
              <li className="mb-[10px]">Fabrics</li>
              <li className="mb-[10px]">Circular denim™</li>
              <li className="mb-[10px]">Partners and factories</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="text-white">
            <ul>
              <li className="mb-[10px]">Customer Carer</li>
              <li className="mb-[10px]">Shipping Information</li>
              <li className="mb-[10px]">Frank Rewards</li>
              <li className="mb-[10px]">Give $15, Get $15</li>
              <li className="mb-[10px]">Fabrics</li>
              <li className="mb-[10px]">Circular denim™</li>
              <li className="mb-[10px]">Partners and factories</li>
              <li className="mb-[10px]">Privacy policy</li>
              <li className="mb-[10px]">Customer Data Requests</li>
            </ul>
          </div>
        </div>
        <div className="">
          <h3 className="text-white">Stay in touch</h3>
          <p className="text-white text-[10px]">
            Join our newsletter and stay in the know about new <br />{" "}
            collections, outfit inspiration, sales, and more.
          </p>
          <input type="email" placeholder="EMAIL" className="email" />
          <br />
          <input type="email" placeholder="NAME" className="email" />
          <br />
          <p className="text-white">I shop For</p>
          <input type="radio" id="html" name="fav_language" value="HTML" />
          <label for="html" className="text-white mr-[10px] ml-[10px]">MEN</label>
        
          <input type="radio" id="css" name="fav_language" value="CSS" />
          <label for="css" className="text-white ml-[10px]">WOMEN</label><br />
          <input type="email" placeholder="Subscribe" className="email" />
        </div>
      </div>
      <p className="text-white bg-black p-[50px]">© Frank And Oak 2024 , All Rights Reserved.</p>
    </>
  );
}
