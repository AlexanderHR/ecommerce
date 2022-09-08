import Image from "next/image";
import { SearchProductItem } from "../../store/modules/product/model"
import { formatNumber, seoUrlText } from "../../util";
import styles from './index.module.scss';
import { Container, Row, Col } from "reactstrap";

type Props = {
    productItem: SearchProductItem
    onClickProduct: (id: string, description?: string) => void
}
const ProductListItem = ({ productItem, onClickProduct }: Props) => {

    const onClickEvent = () => {
        const description = seoUrlText(productItem.title);
        onClickProduct(productItem.id, description)
    }
    return (
        <Row className={styles.block}>
            <Col className={styles.image} onClick={onClickEvent}>
                <Image
                    src={productItem.picture}
                    alt={productItem.title}
                    width={180} height={180}
                />
            </Col>
            <Col className={styles.description}>
                <Row>
                    <Col>
                        <div className={styles.content} onClick={onClickEvent}>
                            <span className={styles.price}>
                                <span>
                                    {formatNumber(productItem.price.amount, { fractionDigits: productItem.price.decimals, currency: productItem.price.currency })}
                                </span>
                                {productItem.free_shipping && (
                                    <span>
                                        <Image

                                            src={'/assets/ic_shipping.png'}
                                            alt={'shipping'}
                                            width={18} height={18}
                                        />
                                    </span>)}
                            </span>
                            <span className={styles.descriptionText}>{productItem.title}</span>
                        </div>
                    </Col>
                    <Col className={styles.localization} >
                        <span>{productItem.city}</span>
                    </Col>
                </Row>



            </Col>

        </Row>)
}

export { ProductListItem }