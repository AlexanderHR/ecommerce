import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { Container } from 'reactstrap';
import Layout from '../../components/Layout'
import { ProductListItem } from '../../components/ProductListItem';
import { Breadcrumb } from '../../components/SEO';
import { productQueryApi } from '../../store/modules/product/api';
import styles from './items.module.scss';

const Items: NextPage = () => {
    const router = useRouter()
    const { search } = router.query

    const { data, isLoading } = productQueryApi.useSearchProductsQuery(String(search));

    const onClickProduct = (id: string, description?: string) => {
        const pathDescription = description ? `/${description}` : '';
        router.push(`/items/${id}${pathDescription}`);
    }
    return (
        <Layout>
            <div className={styles.searchResult}>
                <div className={styles.breadcrumb}>
                    {data?.categories && <Breadcrumb categories={data?.categories} />}
                </div>
                <Container className={styles.resultView}>
                    {isLoading
                        ? 'Carregando...'
                        : (
                            data?.items && data.items.length > 0
                                ? data.items.map(item => <ProductListItem key={item.id} productItem={item} onClickProduct={onClickProduct} />)
                                : <span>No se encontraron resultados.</span>
                        )
                    }
                </Container>
            </div>
        </Layout>
    )
}


export default Items
