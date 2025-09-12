"use client"
import React from "react";
 import "slick-carousel/slick/slick.css";
 import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
// Images are now in public directory

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };
  return (
    <Slider {...settings}>
      <div>
           <Image
      src="/jakob-owens-O_bhy3TnSYU-unsplash.jpg"
      width={500}
      height={500}
      alt="Picture of the author"
      className="w-full h-[22rem] object-cover "
    />
      </div>
        <div>
           <Image
      src="/ruslan-bardash-4kTbAMRAHtQ-unsplash.jpg"
      width={500}
      height={500}
      alt="Picture of the author"
      className="w-full h-[22rem] object-cover"
    />
      </div>
        <div>
           <Image
      src="/joan-tran-reEySFadyJQ-unsplash.jpg"
      width={500}
      height={500}
      alt="Picture of the author"
      className="w-full h-[22rem] object-cover"
    />
      </div>
     </Slider>
  );
}