"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import s1 from "../../img/d1.webp";
import s2 from "../../img/d2.webp";
import s3 from "../../img/d3.webp";
import s4 from "../../img/d4.webp";

import s5 from "../../img/d5.webp";
export default function Img() {

  return (
    <>
      <div className="w-full">
        <div className="flex flex-wrap space-x-5 pl-[20px] pt-[10px]">
          <Image src={s1} width={320} className="mb-[20px]"/>
          <Image src={s2} width={320} className="mb-[20px]"/>
          <Image src={s3} width={315} className="mb-[20px]"/>
          <Image src={s4} width={315}  />
          <Image src={s5} width={320} />
     
        </div>
      </div>
    </>
  );
}
