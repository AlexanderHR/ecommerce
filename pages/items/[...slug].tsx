import type { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { productApi } from '../../store/modules/product/api';
import styles from './items.module.scss';
import Image from 'next/image';
import { ProductDetails } from '../../store/modules/product/model';
import { Breadcrumb } from '../../components/SEO';
import { Col, Container, Row } from 'reactstrap';
import { formatNumber } from '../../util';

type Props = {
    id: string
    productData: ProductDetails
}

const SelectedItem = ({ productData }: Props) => {
    if (!productData) return;
    return (
        <Layout seoProduct={productData}>
            <div className={styles.searchResult}>
                <div className={styles.breadcrumb}>
                    {productData?.categories && <Breadcrumb categories={productData?.categories} />}
                </div>
                <Container className={styles.resultDetailsView}>
                    <Row>
                        <Col xs={7} className={styles.productMainPicture}>
                            <Image
                                src={productData.item.picture}
                                alt={productData.item.title}
                                width="100%"
                                height="100%"
                                layout="responsive"
                                objectFit="contain"
                            />
                        </Col>
                        <Col className={styles.productDetails}>
                            <Row className={styles.condition}>
                                <Col>
                                    {productData.item.condition} - {productData.item.sold_quantity} {productData.item.sold_quantity > 1 ? 'Vendidos' : 'Vendido'}
                                </Col>
                            </Row>

                            <Row className={styles.description}>
                                <Col>
                                    <h1>{productData.item.title}</h1>
                                </Col>
                            </Row>

                            <Row className={styles.price}>
                                <Col>
                                    {formatNumber(productData.item.price.amount, { currency: productData.item.price.currency, fractionDigits: productData.item.price.decimals })}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <button type={'button'}>Comprar</button>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                    <Row className={styles.descriptionView}>
                        <Col>
                            <span className={styles.descriptionTitle}>Descripción del Producto</span>
                        </Col>
                    </Row>
                    <Row className={styles.descriptionView}>
                        <Col>
                            <span className={styles.descriptionText}>
                                <p>{productData.item.description}</p>
                            </span>
                        </Col>

                    </Row>

                </Container>

            </div>

        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: [], fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const params = context?.params;
    let id = '';
    let productData = {};
    if (params && Array.isArray(params?.slug)) {
        id = (params?.slug as string[])[0];
        if (id) productData = await productApi.productById(id);
    }
    return {
        props: { id, productData },
        revalidate: 1 * 60 //  1 min
    }
}

export default SelectedItem
