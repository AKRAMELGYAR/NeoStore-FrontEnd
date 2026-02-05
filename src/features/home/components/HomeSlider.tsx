import image1 from '../../../assets/images/خصومات 3.webp'
import image2 from '../../../assets/images/صوره خصومات2.jpg'
import image3 from '../../../assets/images/صوره خصومات.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Mousewheel } from "swiper/modules";
// @ts-ignore: allow importing CSS module without type declarations
import 'swiper/css';
// @ts-ignore: allow importing CSS module without type declarations
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';




export default function HomeSlider() {
    const navigate = useNavigate();
    return (
        <section className="mb-8 px-4 sm:px-6 max-w-8xl mx-auto">
            <div className="grid grid-cols-1 gap-4">

                {/* Main Slider */}
                <div className="aspect-[16/9] rounded-xl overflow-hidden">
                    <Swiper
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        mousewheel={{
                            forceToAxis: true,
                            sensitivity: 0.1,
                        }}
                        modules={[Pagination, Autoplay, Mousewheel]}
                        className="h-full"
                    >
                        {[image1, image2, image3].map((img, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    onClick={() => navigate('/product')}
                                    src={img}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Side Images */}
                {/* <div className="hidden lg:col-span-4 lg:flex flex-col gap-4">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden">
                        <img
                            src={image2}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="aspect-[4/3] rounded-xl overflow-hidden">
                        <img
                            src={image1}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div> */}

            </div>
        </section>
    )
}
