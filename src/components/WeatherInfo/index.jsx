import React from 'react';

import { dateConvert } from '@utils/dateConvert';
import styles from './index.module.scss'

const WeatherInfo = ({ temp, country, time, icon, weather, error }) => {
    const { day, date, month, year, minut, hour } = dateConvert(time)

    return !!error ? <></> : (
        <div className={styles.weather}>
            <h2 className={styles.weather__temp}>{temp}°</h2>
            <div className={styles.weather__location}>
                <h2 className={styles.weather__location__name}>{country}</h2>
                <span className={styles.weather__location__time}>
                    {`${hour}:${minut} - ${day}, ${year.toString().slice(-2, year.toString().length)} ${month}' ${date}`}
                </span>
            </div>
            <div className={styles.weather__info}>
                <img src={icon} alt="weather icon" />
                <span>{weather}</span>
            </div>
        </div>
    );
}

export default WeatherInfo;