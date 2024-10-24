import React from "react";
import Filter from "./Filter";
import Product from "./Product";
import Saleslider from "../frank/Saleslider";

export default function page() {
  return (
    <div>
      <div className="w-full flex">
      <div className="w-[20%]">  <Filter /></div>
     <div className="w-[80%]">   <Product /></div>
      </div>
      <Saleslider/>
    </div>
  );
}
