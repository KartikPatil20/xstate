import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedcity] = useState("")
  const [selectedState, setSelectedstate] = useState("")
  const [selectedCountry, setSelectedcountry] = useState("")

  useEffect(()=>{
    fetch("https://crio-location-selector.onrender.com/countries")
    .then((res) => res.json())
    .then((data) => {setCountries(data)})
    .catch((e)=>console.error("Error in fetching countries", e))
  },[])

  useEffect(()=>{
    if(selectedCountry){
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
      .then((res) => res.json())
      .then((data) => {setStates(data); setSelectedstate(""); setCities([]); setSelectedcity("")})
      .catch((e) => console.log("Error in fetching states", e))
    }
  },[selectedCountry])

  useEffect(()=>{
    if(selectedState && selectedCountry){
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
      .then((res) => res.json())
      .then((data) => {setCities(data); setSelectedcity("")})
      .catch((e)=> console.log("Error in fetching cities", e))
    }
  },[selectedCountry, selectedState])

  return (
    <div className="App">
      <h1>Select Location</h1>

      <select value={selectedCountry} onChange={(e)=>setSelectedcountry(e.target.value)}>
        <option value="" disabled>Select Country</option>
        {countries.map((country) => {
          return(<option key={country} value={country}>{country}</option>)
        })}
      </select>

      <select value={selectedState} onChange={(e)=>setSelectedstate(e.target.value)}>
        <option value="" disabled>Select State</option>
        {states.map((state) => {
          return(<option key={state} value={state}>{state}</option>)
        })}
      </select>

      <select value={selectedCity} onChange={(e)=>setSelectedcity(e.target.value)}>
        <option value="" disabled>Select City</option>
        {cities.map((city) => {
          return(<option key={city} value={city}>{city}</option>)
        })}
      </select>

        { selectedCity && <p><span>You selected</span> <span className='cityname'>{selectedCity}</span>, {selectedState}, {selectedCountry}</p>}

    </div>
  );
}

export default App;
