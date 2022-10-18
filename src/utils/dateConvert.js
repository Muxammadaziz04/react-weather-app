import { daysOfWeek, month as monthArr } from "@constants"

export const dateConvert = (localtime = Date.now()) => {
    const localdate = new Date(localtime)
    const day = daysOfWeek[localdate.getDay()]
    const date = localdate.getDate()
    const month = monthArr[localdate.getMonth()]
    const year = localdate.getFullYear()
    const minut = localdate.getMinutes()
    const hour = localdate.getHours()
    return { day, date, month, year, minut, hour }
}