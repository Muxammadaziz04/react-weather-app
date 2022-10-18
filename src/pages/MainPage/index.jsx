import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WeatherInfo from '@components/WeatherInfo';
import SearchForm from '@components/SearchForm';
import ListItem from '@components/ListItem';
import Loader from '@components/Loader';
import Alert from '@components/Alert';

import { getWeatherInfo } from '@redux/slices/weatherSlice'
import { regions, mistCode, sunnyCode, cloudCode, rainCode, heavyRainCode, snowCode, thunderCode } from '@constants';
import SunnyImage from '@assets/images/sunny.jpg'
import CloudImage from '@assets/images/cloud.jpg'
import MistImage from '@assets/images/mist.jpg'
import HeavyRainImage from '@assets/images/heavy_rain.jpg'
import RainImage from '@assets/images/rain.jpg'
import SnowImage from '@assets/images/snow.jpg'
import ThunderImage from '@assets/images/thunder.jpg'
import styles from './index.module.scss'

const MainPage = () => {
    const dispatch = useDispatch()
    const { location, current, loading, error } = useSelector(state => state.weatherInfo)

    const handleSubmit = useCallback((e, input) => {
        e.preventDefault()
        if (!input.current.value.trim()) return
        dispatch(getWeatherInfo(input.current.value.trim()))
        input.current.value = ''
    }, [dispatch])

    const hanldeClick = useCallback((region) => {
        dispatch(getWeatherInfo(region))
    }, [dispatch])

    const changeBgImage = (code) => {
        if (sunnyCode.includes(code)) return SunnyImage
        else if (mistCode.includes(code)) return MistImage
        else if (cloudCode.includes(code)) return CloudImage
        else if (rainCode.includes(code)) return RainImage
        else if (heavyRainCode.includes(code)) return HeavyRainImage
        else if (snowCode.includes(code)) return SnowImage
        else if (thunderCode.includes(code)) return ThunderImage
        else return MistImage
    }

    useEffect(() => {
        dispatch(getWeatherInfo(regions[0]))
    }, [dispatch])

    return (
        <div className={styles.app} style={{ backgroundImage: `url(${changeBgImage(current.condition.code)})` }}>

            {loading && <Loader />}
            {!!error && <Alert isError={!!error} message={error} />}

            <div className={styles.app__container}>
                <h1 className={styles.app__title}>the.weather</h1>
                <WeatherInfo
                    temp={current.temp_c}
                    country={location.region}
                    time={location.localtime}
                    icon={`https:${current.condition.icon}`}
                    weather={current.condition.text}
                    error={error}
                />
            </div>

            <div className={styles.app__panel}>
                <SearchForm onSubmit={handleSubmit} />
                <div className={styles.app__panel__lists}>
                    <div className={styles.app__panel__lists__wrapper}>
                        <ul>
                            {
                                regions.map((region, index) => <ListItem city={region} onClick={hanldeClick} key={index} />)
                            }
                        </ul>
                    </div>
                    <div style={{ borderBottom: "1px solid #ccc", paddingBottom: '30px', marginBottom: '30px' }}>
                        <ul>
                            <h3 className={styles.app__details__title}>Weather Details</h3>
                            <ListItem param='Cloudly' value={!!error || current.cloud + ' %'} />
                            <ListItem param='Humidity' value={!!error || current.humidity + ' %'} />
                            <ListItem param='Windy' value={!!error || current.wind_kph + ' km/h'} />
                            <ListItem param='Rain' value={!!error || current.precip_mm + ' mm'} />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
