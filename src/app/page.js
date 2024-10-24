import Image from "next/image";
import Section1 from "./frank/Section1";
import Category from "./frank/Category";
import Saleslider from "./frank/Saleslider";
import Review from "./frank/Review";
import Footer from "./common/Footer";


export default function Home() {
  return (
    <>
      <Section1 />
      <Category />
      <Saleslider />
      <Review />
      {/* <Footer /> */}

    </>
  );
}
