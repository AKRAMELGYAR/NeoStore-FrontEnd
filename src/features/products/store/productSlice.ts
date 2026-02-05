import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ProductState {
    currentPage: number;
    filters: {
        category: string;
        brand: string;
        minPrice: number | undefined;
        maxPrice: number | undefined;
        search: string;
        sort: string;
    };
}

const initialState: ProductState = {
    currentPage: 1,
    filters: {
        category: '',
        brand: '',
        minPrice: undefined,
        maxPrice: undefined,
        search: '',
        sort: '-createdAt',
    },
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<ProductState['filters']>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setFilters, resetFilters, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;
