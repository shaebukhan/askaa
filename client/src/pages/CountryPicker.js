import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Country list with their coordinates
const countryCoordinates = {
    "United States": [37.0902, -95.7129],
    "United Kingdom": [55.3781, -3.4360],
    "Canada": [56.1304, -106.3468],
    // Add more countries with coordinates as needed
};

const CountryPicker = ({ onCountryChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("Pick a country");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectCountry = (country) => {
        setSelectedCountry(country);
        setIsOpen(false);
        if (onCountryChange && countryCoordinates[country]) {
            onCountryChange(countryCoordinates[country]);
        }
    };

    return (
        <div className="country-picker-container">
            <div className="country-picker" onClick={toggleDropdown}>
                <div className="country-circle"></div>
                <button className="country-picker-button">
                    {selectedCountry}
                </button>
                <div className="country-icons">
                    <FaChevronLeft className="chevron-icon" />
                    <FaChevronRight className="chevron-icon" />
                </div>
            </div>

            {isOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li onClick={() => selectCountry('United States')}>United States</li>
                        <li onClick={() => selectCountry('United Kingdom')}>United Kingdom</li>
                        <li onClick={() => selectCountry('Canada')}>Canada</li>
                        {/* Add more countries */}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CountryPicker;
