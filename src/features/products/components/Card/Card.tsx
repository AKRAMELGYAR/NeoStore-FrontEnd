import { useState } from 'react';
import { useAddToCart } from '../../../cart/hooks/useCart';
import type { Product } from '../../../../shared/types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface CardProps {
    product: Product;
}

export default function Card({ product }: CardProps) {
    const { mutateAsync: addItem } = useAddToCart();
    const [isAdding, setIsAdding] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isAdding) return;

        setIsAdding(true);
        try {
            await addItem({ productId: product._id, quantity: 1 });
            toast.success(`${product.name} added to cart!`, {
                icon: '🛒',
            });
        } catch (error: any) {
            toast.error(error?.message || 'Failed to add to cart');
        } finally {
            setIsAdding(false);
        }
    };

    return <>

        <div onClick={() => navigate(`/product/${product._id}`)} className="card shadow-lg rounded-lg overflow-hidden max-w-sm bg-white hover:shadow-2xl transition-shadow duration-300 hover:scale-[1.02] transition cursor-pointer ">
            <div className="image mb-3 overflow-hidden">
                <img src={product.mainImage.secure_url} alt="Card Image" className="hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="content mb-4 gap-2 px-3">
                <div className="category text-gray-600">{product.category.name}</div>
                <h2 className="title text-xl font-bold">{product.name}</h2>
                <p className="description line-clamp-2">{product.description}</p>
            </div>
            <div className="info flex items-center justify-between px-3 mb-2">
                <div className="price font-semibold text-lg">
                    <span className="text-sm">EGP</span>
                    {product.subPrice}</div>
                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`buy-button cursor-pointer bg-black text-white rounded-md p-2 flex justify-center items-center gap-0.5 hover:scale-109 transition ${isAdding ? 'opacity-50' : ''}`}
                >
                    <span className="font-semibold py-0.5">{isAdding ? 'Adding...' : 'Buy Now'}</span>
                    <i className={`fa-solid ${isAdding ? 'fa-spinner fa-spin' : 'fa-cart-plus'}`}></i>
                </button>
            </div>
        </div>
    </>
}
