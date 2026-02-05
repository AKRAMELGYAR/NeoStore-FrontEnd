
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useProduct } from '../../hooks/useProduct';
import { useAddToCart } from '../../../cart/hooks/useCart';
import Loader from '../../../../components/Loader/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import toast from 'react-hot-toast';

// Import Swiper styles
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import 'swiper/css/thumbs';

export default function ProductDetails() {
    const { productId } = useParams<{ productId: string }>();
    const { data: product, isLoading, error } = useProduct(productId);
    const { mutateAsync: addToCart } = useAddToCart();

    // Client state for UI
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader /></div>;
    if (error || !product) return <div className="text-center py-20 text-red-500">Error loading product or product not found.</div>;

    const images = [product.mainImage, ...(product.subImages || product.images || [])];

    const handleAddToCart = async () => {
        if (isAdding) return;
        setIsAdding(true);
        try {
            await addToCart({ productId: product._id, quantity });
            toast.success('Added to cart successfully!');
        } catch (err: any) {
            toast.error(err?.message || 'Failed to add to cart');
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
                    {/* Image Gallery Section */}
                    <div className="space-y-4">
                        <div className="bg-gray-50 rounded-xl overflow-hidden shadow-inner border border-gray-100">
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#000',
                                    '--swiper-pagination-color': '#000',
                                } as any}
                                loop={true}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="h-[300px] md:h-[500px] w-full"
                            >
                                {images.map((img, idx) => (
                                    <SwiperSlide key={idx} className="flex items-center justify-center bg-white cursor-grab active:cursor-grabbing">
                                        <img src={img?.secure_url} alt={product.name} className="h-full w-full object-contain" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Thumbs */}
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="h-24 w-full"
                        >
                            {images.map((img, idx) => (
                                <SwiperSlide key={idx} className="rounded-lg overflow-hidden border border-gray-200 cursor-pointer opacity-70 hover:opacity-100 transition-opacity !h-full">
                                    <img src={img?.secure_url} alt={`Thumb ${idx}`} className="h-full w-full object-cover" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Product Info Section */}
                    <div className="flex flex-col justify-center space-y-6">
                        <div>
                            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-3">
                                {product.category.name}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            {product.brand && (
                                <p className="text-gray-500 font-medium">Brand: <span className="text-gray-900">{product.brand.name}</span></p>
                            )}
                        </div>

                        <div className="border-t border-b border-gray-100 py-6">
                            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Description</h2>
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                        </div>

                        <div>
                            <div className="flex items-end gap-3 mb-4">
                                <span className="text-4xl font-bold text-gray-900">EGP {product.subPrice.toLocaleString()}</span>
                                {product.price > product.subPrice && (
                                    <span className="text-xl text-gray-400 line-through mb-1">EGP {product.price.toLocaleString()}</span>
                                )}
                            </div>

                            <div className="flex items-center gap-2 mb-6 text-sm">
                                {product.stock > 0 ? (
                                    <span className="flex items-center gap-1 text-green-600 font-medium">
                                        <i className="fa-solid fa-check-circle"></i> In Stock ({product.stock} available)
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-red-600 font-medium">
                                        <i className="fa-solid fa-circle-xmark"></i> Out of Stock
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Quantity */}
                                <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 w-fit">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black transition"
                                    >
                                        <i className="fa-solid fa-minus"></i>
                                    </button>
                                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black transition"
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>

                                {/* Add to Cart */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAdding || product.stock === 0}
                                    className={`
                                        flex-1 py-3 px-8 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1
                                        ${product.stock === 0
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gray-900 hover:bg-black hover:shadow-gray-900/30'
                                        }
                                    `}
                                >
                                    {isAdding ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <i className="fa-solid fa-spinner fa-spin"></i> Adding...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
