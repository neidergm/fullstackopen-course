import { useState } from "react"
import Country from "./Country"
import { useEffect } from "react"

const Countries = ({ countries }) => {

    const [selectedCountry, setSelectedCountry] = useState(null)

    const showOne = (country) => setSelectedCountry(country)

    useEffect(() => {

        if (countries.length === 1) {
            showOne(countries[0])
        } else if (selectedCountry) {
            setSelectedCountry(null)
        }

    }, [countries])

    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } 
    
    if (selectedCountry) {
        return <Country country={selectedCountry} />
    }

    return (
        <div>
            {countries.map(country => <div key={country.name.common}>
                {country.name.common} <button onClick={() => showOne(country)}>Show</button>
            </div>)}
        </div>
    )
}

export default Countries