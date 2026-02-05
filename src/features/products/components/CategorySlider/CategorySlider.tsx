import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation, Autoplay } from "swiper/modules";
import { useCategories } from "../../hooks/useProducts";

// @ts-ignore: allow importing CSS module without type declarations
import 'swiper/css';
// @ts-ignore: allow importing CSS module without type declarations
import 'swiper/css/navigation';
import Loader from "../../../../components/Loader/Loader";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/hooks';
import { setFilters } from '../../store/productSlice';


export default function CategorySlider() {
    const { data: categories, isLoading } = useCategories();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleCategoryClick = (categoryId: string) => {
        dispatch(setFilters({ category: categoryId }));
        navigate(`/product?category=${categoryId}`);
    }

    return (
        <>
            <section className="my-8 mx-6">
                {isLoading || !categories ? (<Loader />) : (
                    <Swiper
                        slidesPerView={6}
                        loop={true}
                        navigation={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 15,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 6,
                                spaceBetween: 25,
                            },
                        }}
                        modules={[Navigation, Autoplay, Mousewheel]}
                    >
                        {categories.map((category) => (
                            <SwiperSlide key={category._id}>
                                <div className="flex flex-col items-center gap-2">
                                    <img
                                        onClick={() => handleCategoryClick(category._id)}
                                        className="w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                                        src={category.image?.secure_url}
                                        alt={category.name} />
                                </div>
                                <h3 className="text-center">{category.name}</h3>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </section>
        </>
    )
}