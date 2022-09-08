import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { meliAxios } from "../../../../config/meliAxios";
import { MELI_API_BASE_URL } from "../../../../constants";
import { SearchProduct } from "../model";
import { categoriesNormalize, productByIdNormalize, searchProductsNormalize } from "./normalize";

const productQueryApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: MELI_API_BASE_URL }),
    tagTypes: ["products"],
    endpoints: (builder) => ({
        searchProducts: builder.query<SearchProduct, string>({
            query: (input) => `/sites/MLA/search?q=${input}&limit=4`,
            keepUnusedDataFor: 30,
            providesTags: ["products"],
            transformResponse: searchProductsNormalize,
        })
    }),
});

const productApi = {
    productById: async (id: string) => {

        const resultAll = await Promise.all([
            meliAxios.get(`items/${id}`),
            meliAxios.get(`items/${id}/description`)
        ])

        const [productData, descriptionData] = resultAll.map(res => res?.data);

        const productDetails = productByIdNormalize(productData);

        productDetails.item.description = String(descriptionData?.plain_text);

        const categoryResult = await meliAxios.get(`categories/${productDetails.categoryId}`);
        productDetails.categories = categoriesNormalize(categoryResult?.data);

        return productDetails;
    }
}
export { productQueryApi, productApi };