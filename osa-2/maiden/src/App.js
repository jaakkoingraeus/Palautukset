import React, {useState, useEffect} from 'react'
import axios from 'axios'

let countryName = ''

const whatCountries = (props) => {
  return (
    props.countries.filter(
        country => country.name.toLowerCase().includes(props.filter.toLowerCase())
    )
  )
}

const CountryInfo = (props) => {
  console.log(props)

  const flag = {
      maxWidth: "40%",
  }

  return (
      <div>
          <h1>{props.name}</h1>
          <br/>
          <h3>capital {props.capital}</h3>
          <h3>population {props.population}</h3>
          <br/>
          <h2>languages</h2>
          <ul>
              {props.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
          </ul>
          <img src={props.flag} style={flag}></img>
      </div>
  )
}



const App = () => {

  console.log(process.env.REACT_APP_API_KEY)

  const CountryList = (props) => {
    const countries = props.countries
    const names = countries.map(country => country.name)
  
    const countriesToShow = whatCountries(props)
  
    const chooseCountry = (event) => {
      event.preventDefault();
      setFilter(event.target.value)
    }
  
    const toReturn =
        (countriesToShow.length <= 10)
        ? countriesToShow.map(country => <div key={country.numericCode}>{country.name}<button onClick={chooseCountry} value={country.name}>Show</button></div>)
        : 'Too many matches, specify another filter';
  
    return (
        <div>{(countriesToShow.length === 1) ? CountryInfo(countriesToShow[0]) : toReturn}</div>
    )
  }



  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('Search')
  const [weather, setWeather] = useState([])

  //Handle filter actions
  const handleClick = () => {
    setFilter('')
  }

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value)
  }

  //Get the data
  useEffect(() => { axios
  .get('https://restcountries.eu/rest/v2/all')
  .then( response => {
    setCountries(response.data)
  })
  }, [])

  //Get the weather data. Error with Weather API. Says that I'm missing access key. Triple checked, still.
  const parameters = {
    access_key: process.env.REACT_APP_API_KEY,
    query: 'New York'
  }

  useEffect(() => { axios
    .get("http://api.weatherstack.com/current", {parameters})
    .then(response => {
      console.log(response.data)
      setWeather(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  return(
  <>
    <div>
      <input onClick={handleClick} value={filter} onChange={handleFilterChange}/>
    </div>
    <CountryList countries={countries} filter={filter} weather={weather}/>
  </>
  )
}

export default App;