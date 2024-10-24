"use client"
import React, { useEffect } from "react";

import Filter from "@/app/women/Filter";
import Product from "@/app/women/Product";
import Saleslider from "@/app/frank/Saleslider";
import { useParams } from "next/navigation";

export default function page() {
    let {slug} = useParams();
    console.log(slug)
    useEffect(()=>{

    },[slug])
  return (
    <div>
      <div className="w-full flex">
        <div className="w-[20%]">
          <Filter />
        </div>
        <div className="w-[80%]">
          {" "}
          <Product />
        </div>
      </div>
      <Saleslider />
    </div>
  );
}
