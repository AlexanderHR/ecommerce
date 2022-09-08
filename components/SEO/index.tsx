import { ProductDetails } from "../../store/modules/product/model";
import { NavLink } from "../UI";

export const ProductSEO = ({ product }: { product: ProductDetails }) => {
    return (
        <div>
            <div itemType="https://schema.org/Product" itemScope>
                <meta itemProp="mpn" content={product.item.id} />
                <meta itemProp="name" content={product.item.title} />
                <link itemProp="image" href={product.item.picture} />
                <meta itemProp="description" content={product.item.description} />
                <div itemProp="offers" itemType="https://schema.org/Offer" itemScope>
                    <link itemProp="url" href="https://example.com/anvil" />
                    <meta itemProp="availability" content="https://schema.org/InStock" />
                    <meta itemProp="priceCurrency" content={product.item.price.currency} />
                    <meta itemProp="itemCondition" content={product.item.condition == "Nuevo" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition"} />
                    <meta itemProp="price" content={String(product.item.price.amount)} />
                    <meta itemProp="priceValidUntil" content="2023-01-01" />
                </div>
                <meta itemProp="sku" content={product.item.id} />
                <div itemProp="brand" itemType="https://schema.org/Brand" itemScope>
                    <meta itemProp="name" content={product.item.brand} />
                </div>
            </div>
        </div>
    );
}


export const Breadcrumb = ({ categories }: { categories: { id: string, name: string }[] }) => {
    return (<ol>
        {categories.map((item) => {
            return <li key={item.id}>
                <NavLink name={item.name} href={'#'} />
            </li>
        })}
    </ol>)
}