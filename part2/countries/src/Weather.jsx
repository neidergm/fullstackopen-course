import { useState } from "react"
import { useEffect } from "react"

const Weather = ({ lat, lang }) => {

    const [weatherData, setWeatherData] = useState()

    const fahrenheitToCelsius = (fahrenheit) => {
        return (fahrenheit - 32) * 5 / 9;
    }

    useEffect(() => {
        const apikey = import.meta.env.VITE_SOME_KEY

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lang}&appid=${apikey}`)
            .then(response =>{
                return response.json()})
            .then(response => {
                if (response.cod === 200) {
                    setWeatherData(response)
                }else{
                    console.log(response)
                }
            })
    }, [])

    if (!weatherData) {
        return <div>loading...</div>
    }

    return (
        <div>
            <p>temperature {fahrenheitToCelsius(weatherData.main.temp)} °C</p>
            <div>
                <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                />
            </div>
            <p>wind {weatherData.wind?.speed} m/s</p>
        </div>
    )
}

export default Weather