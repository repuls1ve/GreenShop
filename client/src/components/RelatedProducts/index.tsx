import {FC, useEffect} from 'react'

import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {receive} from '../../store/slices/products-slice'

import Product from '../Product'

import styles from './styles.module.css'

const RelatedProductsSection: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(receive())
    }, [dispatch])

    const {products} = useAppSelector(state => state.products)

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <h2 className={styles.title}>Related Products</h2>
                </div>
                <div className={styles.images}>
                    {products && products.slice(0, 4).map(product => (
                        <Product
                        key={product.sku}
                        className={styles.product}
                        product={product}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default RelatedProductsSection
