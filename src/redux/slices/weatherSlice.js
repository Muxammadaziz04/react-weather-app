import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { HOST, API_KEY } from '@constants'

const initialState = {
    location: {
        region: '',
        localtime: ''
    },
    current: {
        temp_c: 0,
        condition: {
            text: '',
            icon: '',
            code: 0
        },
        cloud: 0,
        wind_kph: 0,
        humidity: 0,
        precip_mm: 0
    },
    loading: false,
    error: null
}

export const getWeatherInfo = createAsyncThunk(
    'weather/getWeatherInfo',
    async (region, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${HOST}/v1/current.json?key=${API_KEY}&q=${region}&lang=eng`)
            const info = {
                location: {
                    region: data?.location?.name,
                    localtime: data?.location?.localtime
                },
                current: {
                    temp_c: Math.round(data?.current?.temp_c),
                    condition: data?.current?.condition,
                    cloud: data?.current?.cloud,
                    wind_kph: data?.current?.wind_kph,
                    humidity: data?.current?.humidity,
                    precip_mm: data?.current?.precip_mm
                }
            }
            return info
        } catch (error) {
            return rejectWithValue(JSON.parse(error?.response?.request?.response)?.error?.message)
        }
    }
)

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    extraReducers: {
        [getWeatherInfo.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getWeatherInfo.fulfilled]: (state, action) => {
            state.loading = false
            state.error = null
            state.location = action.payload?.location
            state.current = action.payload?.current
        },
        [getWeatherInfo.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload || 'Somethink went wrong'
        }
    }
})

export default weatherSlice.reducer