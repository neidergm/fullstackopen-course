import Weather from "./Weather"

const Country = ({ country }) => {
    const [lat, lang] = country.capitalInfo.latlng;

    return (
        <div>
            <h1>{country.name.common}</h1>

            <p>
                capital {country.capital[0]} <br />
                area {country.area}
            </p>

            <h3>languages:</h3>

            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>

            <img src={country.flags.png} alt={country.flags.alt} width={200} />

            <h2>Weather in {country.capital[0]}</h2>
            
            <Weather
                lat={lat}
                lang={lang}
            />
        </div>
    )
}

export default Country