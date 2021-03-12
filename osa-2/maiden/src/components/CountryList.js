import React from 'react';
import ReactDOM from 'react-dom';

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

const CountryList = (props) => {
    const countries = props.countries
    const names = countries.map(country => country.name)

    const countriesToShow = whatCountries(props)


    const toReturn =
        (countriesToShow.length <= 10)
        ? countriesToShow.map(country => <div key={country.numericCode}>{country.name}<button>Show</button></div>)
        : 'Too many matches, specify another filter';

    return (
        <div>{(countriesToShow.length === 1) ? CountryInfo(countriesToShow[0]) : toReturn}</div>
    )
}

export default CountryList;

//        (countriesToShow.length <= 10) ? countriesToShow.map(country => <div key={country.numericCode}>{country.name}</div>) : 'Too many matches, specify another filter';
