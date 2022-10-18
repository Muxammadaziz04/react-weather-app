import React from 'react';

import Spinner from '@assets/icons/Spinner.svg'
import styles from './index.module.scss'

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.loader__wrapper}>
                <img src={Spinner} alt="Loader" />
            </div>
        </div>
    );
}

export default Loader;
