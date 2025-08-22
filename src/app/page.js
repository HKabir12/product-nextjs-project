import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import ProductHighlights from "@/components/ProductHighlights";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div >
     < Hero></Hero>
     <ProductHighlights></ProductHighlights>
     < FeaturedProducts></FeaturedProducts>
     < Testimonials></Testimonials>
     < Newsletter></Newsletter>
    </div>
  );
}
