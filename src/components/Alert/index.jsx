import React, { useState } from 'react';

import CloseIcon from '@assets/icons/close.svg'
import styles from './index.module.scss'

const Alert = ({ message }) => {
    const [error, setError] = useState(!!message);
    
    return (
        <div className={error ? styles.alert : styles.close}>
            <span>{message}</span>
            <button onClick={() => setError(false)}>
                <img src={CloseIcon} alt="close icon" />
            </button>
        </div>
    );
}

export default React.memo(Alert);
