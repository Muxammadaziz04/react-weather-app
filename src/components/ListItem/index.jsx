import React from 'react';

import styles from './index.module.scss'

const ListItem = ({city, onClick, param, value}) => {
    return city ? (
        <li className={styles.item + ' ' + styles.cursor} onClick={() => onClick(city)}>
            { city }
        </li>
    ) : (
        <li className={styles.item + ' ' + styles.details}>
            <p>{ param }</p>
            <span>{ value }</span>
        </li>
    );
}

export default React.memo(ListItem);
