import React, { useRef } from 'react';

import SearchIcon from '@assets/icons/search_icon.svg'
import styles from './index.module.scss'

const SearchForm = ({ onSubmit }) => {
    const inputRef = useRef()

    return (
        <form className={styles.form} onSubmit={(e) => onSubmit(e, inputRef)}>
            <input className={styles.form__input} ref={inputRef} type="text" placeholder="Another location" />
            <button className={styles.form__btn} type="submit">
                <img src={SearchIcon} alt="search icon" />
            </button>
        </form>
    );
}

export default React.memo(SearchForm);
