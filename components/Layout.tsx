import Head from 'next/head'
import Image from 'next/image';
import { ProductDetails } from '../store/modules/product/model';
import styles from './layout.module.scss';
import SearchBar from './SearchBar';
import { ProductSEO } from './SEO';

type Props = {
    children?: React.ReactNode
    seoProduct?: ProductDetails
}

const Layout = ({ children, seoProduct }: Props) => {
    const description = seoProduct ? seoProduct.item.title : '';
    return (
        <>
            <Head>
                <title>{`MercadoLivre ${description}`}</title>
                <meta name="description" content={description ? description : 'MercadoLivre'} />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            </Head>
            {seoProduct && <ProductSEO product={seoProduct} />}
            <main className={styles.main}>
                <SearchBar />
                {children}
            </main>
        </>
    )
}

export default Layout
