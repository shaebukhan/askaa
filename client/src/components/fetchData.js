
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ZalandoAuthAndMerchantDetails = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [merchantDetails, setMerchantDetails] = useState(null);
    const [error, setError] = useState(null);

    // Step 1: Get access token
    const getAccessToken = async () => {
        try {
            const response = await axios.post(
                'https://api.merchants.zalando.com/auth/token',
                null,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    params: {
                        grant_type: 'client_credentials',
                        client_id: process.env.CLIENT_ID,   // Replace with your actual client_id
                        client_secret: process.env.SECRET_ID, // Replace with your actual client_secret

                    },
                }
            );

            const token = response.data.access_token;
            setAccessToken(token);  // Store the token in state
        } catch (err) {
            setError('Failed to fetch access token');
            console.error('Error:', err);
        }
    };

    // Step 2: Fetch merchant details using the token
    const fetchMerchantDetails = async () => {
        try {
            const response = await axios.get(
                'https://api.merchants.zalando.com/merchants/{{merchant_id}}/details',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,  // Pass token in the header
                    },
                }
            );

            setMerchantDetails(response.data);
        } catch (err) {
            setError('Failed to fetch merchant details');
            console.error('Error:', err);
        }
    };

    useEffect(() => {
        getAccessToken();
    }, []);

    // Fetch data only if we have the access token
    useEffect(() => {
        if (accessToken) {
            fetchMerchantDetails();
        }
    }, [accessToken]);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {accessToken && (
                <div>
                    <h2>Access Token:</h2>
                    <p>{accessToken}</p>
                </div>
            )}
            {merchantDetails ? (
                <div>
                    <h2>Merchant Details</h2>
                    <pre>{JSON.stringify(merchantDetails, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading merchant details...</p>
            )}
        </div>
    );
};

export default ZalandoAuthAndMerchantDetails;
