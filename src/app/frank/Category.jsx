"use client"
import React, { useEffect, useState } from "react";

import axios from "axios";
export default function Category() {
  let [subcat, setSubcat] = useState([]);
  let [path, setPath] = useState("");
  let subcategory = () => {
    axios.get("http://localhost:8000/website/subcat/addsubcat").then((res) => {
      setSubcat(res.data.data);
      setPath(res.data.path); // Set path to handle product upload image
      console.log(res.data);
    });
  };
  useEffect(() => {
    subcategory();
  }, []);
  return (
    <div>
      <div className="w-full p-10">
        <h1 className="text-[25px] font-bold mb-5">Sub Categories</h1>
        <div className="flex space-x-5 flex-wrap my-3">
            {subcat.map((items , index)=>{
                return(
                    <div>
                 
                    <img src={path + items.categoryImage} alt="" className="w-[150px] object-cover h-[200px]"/>
                    <h1 className="text-[16px] font-bold my-2 uppercase">{items.subcategoryName}</h1>
                  </div>
                )
            })}
       
        </div>
      </div>
    </div>
  );
}
