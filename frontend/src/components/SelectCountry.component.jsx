import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Or your preferred select library

const CountryCitySelector = ({ onSelect }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch country data (replace with your actual data fetching logic)
    const fetchCountries = async () => {
      const response = await fetch('https://your-country-api.com/countries');
      const data = await response.json();
      setCountries(data.map((country) => ({ value: country.code, label: country.name })));
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Fetch city data based on selected country (replace with your logic)
    const fetchCities = async () => {
      if (selectedCountry) {
        const response = await fetch(`https://your-city-api.com/cities/${selectedCountry.value}`);
        const data = await response.json();
        setCities(data.map((city) => ({ value: city.name, label: city.name })));
      } else {
        setCities([]); // Clear cities if no country is selected
      }
    };

    fetchCities();
  }, [selectedCountry]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    onSelect({ country: selectedOption?.value, city: null }); // Pass initial null city
  };

  const handleCityChange = (selectedOption) => {
    onSelect({ country: selectedCountry?.value, city: selectedOption?.value });
  };

  return (
    <div className='bg-black h-[100px] w-[100px]'>
        <h1>Hello</h1>
      <Select
        value={selectedCountry}
        onChange={handleCountryChange}
        options={countries}
        placeholder="Select Country"
        isDisabled={countries.length === 0} // Disable if no countries loaded
      />
      {cities.length > 0 && (
        <Select
          value={cities.find((city) => city.value === onSelect?.city)} // Pre-select city if provided
          onChange={handleCityChange}
          options={cities}
          placeholder="Select City"
        />
      )}
    </div>
  );
};

export default CountryCitySelector;
