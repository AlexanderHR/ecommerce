import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './index.module.scss';

const SearchBar = () => {
    const router = useRouter();

    const searchProduct = () => {
        const search = (document.getElementById('searchText') as HTMLInputElement).value;
        if (search.trim().length > 0) {
            router.push({ pathname: '/items', query: { search } });
        }
    }

    const onKeyUp = (event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        if (event.key == "Enter") {
            searchProduct();
        }
    }

    return <div className={styles.bar}>
        <div className={styles.searchBar}>
            <div className={styles.logo}>
                <Link href={'/'}>
                    <Image className={styles.logo} src="/assets/Logo_ML.png" alt="MercadoLivre Logo" width={50} height={33} />
                </Link>
            </div>
            <div className={styles.inputContainer}>
                <input className={styles.inputField} id='searchText' onKeyUp={onKeyUp} type="text" placeholder="Nunca dejes de buscar" />
                <div className={styles.inputIcon} onClick={searchProduct}>
                    <i className={styles.icon}></i>
                </div>
            </div>

        </div>
    </div>
}
export default SearchBar;