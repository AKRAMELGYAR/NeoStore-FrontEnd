

export interface IFormInput {
    name: string,
    email: string,
    pass: string,
    cpass: string,
    phone: string,
    DOB: string,
    address: string,
    gender: "male" | "female"
}

export interface ILoginInput {
    email: string,
    pass: string
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    subPrice: number;
    stock: number;
    mainImage: {
        secure_url: string;
    };
    images?: {
        secure_url: string;
    }[];
    subImages?: {
        secure_url: string;
    }[];
    category: {
        _id: string;
        name: string;
    };
    brand?: {
        _id: string;
        name: string;
    };
}

export interface Category {
    _id: string;
    name: string;
    image?: {
        secure_url: string;
    };
}

export interface Brand {
    _id: string;
    name: string;
}

export interface ProductsResponse {
    products: Product[];
    totalProducts: number;
    totalPages: number;
    currentPage: number;
}

export interface CartItem {
    _id: string;
    productId: {
        _id: string;
        name: string;
        price: number;
        subPrice: number;
        mainImage: {
            secure_url: string;
        };
    };
    quantity: number;
}

export interface CartResponse {
    _id: string;
    products: CartItem[];
    subTotal: number;
}

export interface OrderResponse {
    _id: string;
    totalPrice: number;
    status: string;
    arrivesAt: Date;
    items: any[];
}