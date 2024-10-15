import { useState } from 'react';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { app } from "./../../firebase/firebase"; // Import firebase configuration

const db = getFirestore(app);

export const PositionInput = ({ setPosition }) => {
    const [position, setPositionInput] = useState('');
    const [positionSuggestions, setPositionSuggestions] = useState([]);

    // Fetch position suggestions based on user input
    const fetchPositionSuggestions = async (input) => {
        const q = query(collection(db, "jobDetail"));
        const querySnapshot = await getDocs(q);

        const positions = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const matchingPositions = data.jobPosition.filter((position) =>
                position.toLowerCase().startsWith(input.toLowerCase())
            );
            positions.push(...matchingPositions);
        });

        setPositionSuggestions(positions);
    };

    // Handle input changes and fetch suggestions
    const handlePositionChange = (e) => {
        const input = e.target.value;
        setPositionInput(input);
        setPosition(input); // Set custom input directly

        if (input.length > 0) {
            fetchPositionSuggestions(input);
        } else {
            setPositionSuggestions([]); // Clear suggestions when input is empty
        }
    };

    // When a suggestion is selected, set position and clear suggestions
    const handleSuggestionClick = (position) => {
        setPosition(position);
        setPositionInput(position);
        setPositionSuggestions([]); // Clear suggestions after selection
    };

    return (
        <div style={{ position: 'relative', width: '200px' }}>
            <input
                type="text"
                placeholder="Search by Position"
                value={position}
                onChange={handlePositionChange}
                style={{ width: '100%' }}
            />
            {positionSuggestions.length > 0 && (
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
                    {positionSuggestions.map((position, index) => (
                        <li 
                            key={index} 
                            style={{ cursor: 'pointer', padding: '5px' }}
                            onClick={() => handleSuggestionClick(position)}
                        >
                            {position}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
