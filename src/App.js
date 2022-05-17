
import {useState, useEffect} from "react";
import Countries from "./components/Countries";
import "./App.css";

const url = "https://restcountries.com/v3.1/all";

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const fetchData = async (url) =>{
    setIsLoading(true);

    try{
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
      setIsLoading(false);
      setError(null);
    }
    catch(error){
      setIsLoading(false);
      setError(error);
    }
  }

  useEffect(()=>{

    fetchData(url);

  }, [])

  const handleRemoveCountry = (name) =>{
    const newFilteredCountries = filteredCountries.filter((country)=> country.name.common !== name);
    setFilteredCountries(newFilteredCountries);
  }

  return (
    <>
      <h1>Country App</h1>
      {isLoading && <h2>Loading....</h2>}
      {error && <h2>{error.message}</h2>}
      {countries && <Countries countries={filteredCountries} 
                        onRemoveCountry={handleRemoveCountry} />}
    </>
  );
}

export default App;
