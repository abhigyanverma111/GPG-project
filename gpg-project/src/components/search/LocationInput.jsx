import { useState } from 'react';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { app } from "./../../firebase/firebase"; // Import firebase configuration

const db = getFirestore(app);

export const LocationInput = ({ setLocation }) => {
    const [location, setLocationInput] = useState('');
    const [citySuggestions, setCitySuggestions] = useState([]);

    // Fetch city suggestions based on user input
    const fetchCitySuggestions = async (input) => {
        const q = query(collection(db, "jobLocation"));
        const querySnapshot = await getDocs(q);

        const cities = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const matchingCities = data.majorCities.filter((city) =>
                city.toLowerCase().startsWith(input.toLowerCase())
            );
            cities.push(...matchingCities);
        });

        setCitySuggestions(cities);
    };

    // Handle location input changes and fetch suggestions
    const handleLocationChange = (e) => {
        const input = e.target.value;
        setLocationInput(input);
        setLocation(input); // Set location even if it's a custom input

        if (input.length > 0) {
            fetchCitySuggestions(input);
        } else {
            setCitySuggestions([]); // Clear suggestions when input is empty
        }
    };

    // When a suggestion is selected, set location and clear suggestions
    const handleSuggestionClick = (city) => {
        setLocation(city);
        setLocationInput(city);
        setCitySuggestions([]); // Clear suggestions after selection
    };

    return (
        <div style={{ position: 'relative', width: '200px' }}>
            <input
                type="text"
                placeholder="Search by Job Location"
                value={location}
                onChange={handleLocationChange}
                style={{ width: '100%' }}
            />
            {citySuggestions.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    width: '100%',
                    border: '1px solid black',
                    padding: '5px',
                    backgroundColor: 'black',
                    listStyleType: 'none',
                    margin: '0',
                    zIndex: '10'  // Ensure it appears above other elements
                }}>
                    {citySuggestions.map((city, index) => (
                        <li 
                            key={index} 
                            style={{ cursor: 'pointer', padding: '5px' }}
                            onClick={() => handleSuggestionClick(city)}
                        >
                            {city}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
