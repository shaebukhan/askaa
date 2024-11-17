import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import CountryPicker from './CountryPicker';
import 'leaflet/dist/leaflet.css';
import Header from '../components/Header';
import SearchCountry from './SearchCountry';
import axios from 'axios';

// Component to change the map's view when a country is selected
const ChangeMapView = ({ center }) => {
    const map = useMap(); // Get the map instance
    map.setView(center, map.getZoom()); // Set the map view
    return null; // This component is just for side-effects, no rendering
};

const GeoView = () => {
    // Default coordinates (London)
    const [selectedCountryCoordinates, setSelectedCountryCoordinates] = useState([51.505, -0.09]);

    // Handle country change to update map center
    const handleCountryChange = (coordinates) => {
        setSelectedCountryCoordinates(coordinates);
    };

    const [orders, setOrders] = useState([]); // Ensure orders is an array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Function to get country name and coordinates dynamically
    const fetchCountryData = async (countryCode) => {
        try {
            // Step 1: Get country name using REST Countries API
            const restCountryResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
            const countryName = restCountryResponse.data[0]?.name?.common;

            // Step 2: Get coordinates using OpenCage Geocoding API (replace YOUR_API_KEY with your key)
            const openCageResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                params: {
                    q: countryName,
                    key: 'ca2873ded47a4ab0a43eda3124905350',
                }
            });

            const coordinates = openCageResponse.data.results[0]?.geometry;

            return {
                countryName: countryName,
                coordinates: coordinates ? [coordinates.lat, coordinates.lng] : null
            };
        } catch (err) {
            console.error('Error fetching country data:', err);
            return { countryName: null, coordinates: null };
        }
    };

    // Main function to fetch orders and country details
    const fetchOrderDetails = async () => {
        try {
            setLoading(true); // Start loading
            const response = await axios.get('http://localhost:5000/api/zalando-data');

            // Correctly access the nested data
            const fetchedOrders = Array.isArray(response.data.data) ? response.data.data : [];

            // Process each order to get country data
            const countryDataPromises = fetchedOrders.map(async (order) => {
                const shippingCountryCode = order.attributes.shipping_address?.country_code;

                // Fetch the country name and coordinates using the dynamic fetch function
                const countryData = await fetchCountryData(shippingCountryCode);

                return {
                    countryCode: shippingCountryCode,
                    countryName: countryData.countryName,
                    coordinates: countryData.coordinates
                };
            });

            // Wait for all country data to be fetched
            const countryData = await Promise.all(countryDataPromises);

            setOrders(fetchedOrders); // Set the state with the correct data
            console.log('Country Data with Coordinates:', countryData); // Log country data
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false); // Stop loading
        }
    };




    useEffect(() => {
        fetchOrderDetails();
    }, []);



    return (
        <div className="container mx-auto">
            <Header />
            <div className="py-8">
                <span className="text-[30px] font-[600]">Geographical View</span>
            </div>
            <div className="map-page">
                <div className="controls">
                    {/* Passing handleCountryChange to CountryPicker */}
                    <CountryPicker onCountryChange={handleCountryChange} />
                </div>
                <div className="map-container">
                    <MapContainer center={selectedCountryCoordinates} zoom={5} style={{ height: '600px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                        {/* Change the map view when a new country is selected */}
                        <ChangeMapView center={selectedCountryCoordinates} />
                    </MapContainer>
                </div>
                <SearchCountry />
            </div>
        </div>
    );
};

export default GeoView;
