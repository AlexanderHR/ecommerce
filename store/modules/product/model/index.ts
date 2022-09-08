export interface SearchProductItem {
    id: string,
    title: string,
    price: {
        currency: string, amount: number, decimals: number
    },
    picture: string,
    condition: string,
    free_shipping: boolean,
    city: string
}

export interface SearchProduct {
    author: {
        name: string
        lastname: string
    },
    categories: { id: string, name: string }[],
    items: SearchProductItem[]
}


export interface ProductDetails {
    author: {
        name: string
        lastname: string
    },
    categoryId: string,
    categories: { id: string, name: string }[],
    item: {
        id: string,
        title: string,
        price: {
            currency: string, amount: number, decimals: number,
        },
        picture: string,
        condition: string,
        free_shipping: boolean,
        sold_quantity: number,
        description: string,
        brand: string
    }
}