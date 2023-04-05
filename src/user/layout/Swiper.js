import { Autoplay, Pagination, Navigation } from "swiper";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const SwiperPage=()=>{
    return(
       
           <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="http://localhost:5000/card/JL-806.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="http://localhost:5000/card/banner112.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="http://localhost:5000/card/banner-PRO-06.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="http://localhost:5000/card/banner-pf-117D-tang-giay-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="http://localhost:5000/card/banner-chay-bo.jpg" />
        </SwiperSlide>
      </Swiper>

    )
}
export default SwiperPage