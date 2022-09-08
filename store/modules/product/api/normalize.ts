import { SearchProduct, SearchProductItem, ProductDetails } from "../model";

export const searchProductsNormalize = (response: any) => {
    const result: SearchProduct = {
        author: { name: 'MercadoLivre', lastname: '' },
        categories: [],
        items: []
    };
    if (response?.results && Array.isArray(response.results)) {
        const list = (response.results as any[]);
        if (list.length > 0) {
            result.items = list.map(item => {
                let condition = String(item.condition);
                if (condition == 'new') condition = 'Nuevo';
                else if (condition == 'used') condition = 'Usado';

                const newItem: SearchProductItem = {
                    id: String(item.id),
                    title: String(item.title),
                    price: {
                        currency: String(item.currency_id), amount: Number(item.price), decimals: 0
                    },
                    picture: String(item.thumbnail),
                    condition,
                    free_shipping: Boolean(item?.shipping?.free_shipping),
                    city: String(item?.address?.city_name)
                }
                return newItem;
            });
        }

    }
    if (response?.filters && Array.isArray(response.filters)) {
        const categories = (response.filters as any[]).find(item => item.id == 'category');
        if (categories?.values && Array.isArray(categories.values)) {
            const list = categories.values as any[];
            if (list.length > 0) {
                result.categories = (categories.values[0].path_from_root as any[]).map((item) => {
                    return ({ id: item.id, name: item.name });
                })
            }
        }
    }
    return result;
}

export const productByIdNormalize = (response: any) => {
    let condition = String(response.condition);

    if (condition == 'new') condition = 'Nuevo';
    else if (condition == 'used') condition = 'Usado';

    const result: ProductDetails = {
        author: { name: 'MercadoLivre', lastname: '' },
        categoryId: String(response.category_id),
        categories: [],
        item: {
            id: String(response.id),
            title: String(response.title),
            price: {
                currency: response.currency_id,
                amount: response.price,
                decimals: 0
            },
            picture: '',
            condition,
            free_shipping: Boolean(response?.shipping?.free_shipping),
            sold_quantity: response.sold_quantity,
            description: response.descriptions,
            brand: ''
        }
    };

    if (response.pictures && Array.isArray(response.pictures) && (response.pictures as any[]).length > 0) {
        const list = (response.pictures as any[]);
        let selectedPicture = list.find(item => item.size == '368x500')
        if (!selectedPicture) selectedPicture = list[0];
        result.item.picture = selectedPicture.secure_url;
    }
    if (response.attributes && Array.isArray(response.attributes) && (response.attributes as any[]).length > 0) {
        const brandItem = (response.attributes as any[]).find(item => item.id == 'BRAND');
        if (brandItem) {
            result.item.brand = brandItem.value_name;
        }

    }

    return result;
}

export const categoriesNormalize = (response: any) => {
    let categories: { id: string, name: string }[] = [];
    if (response?.path_from_root && Array.isArray(response.path_from_root)) {
        categories = (response.path_from_root as any[]).map((item) => {
            return ({ id: item.id, name: item.name });
        })
    }
    return categories;
}