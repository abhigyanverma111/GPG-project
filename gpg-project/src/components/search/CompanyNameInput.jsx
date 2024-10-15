import { useState } from 'react';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { app } from "./../../firebase/firebase"; // Import firebase configuration

const db = getFirestore(app);

export const CompanyNameInput = ({ setCompanyName }) => {
    const [companyName, setCompanyNameInput] = useState('');
    const [companySuggestions, setCompanySuggestions] = useState([]);

    // Fetch company suggestions based on user input
    const fetchCompanySuggestions = async (input) => {
        const q = query(collection(db, "companyName"));
        const querySnapshot = await getDocs(q);

        const companies = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const matchingCompanies = data.dreamCompany.filter((company) =>
                company.toLowerCase().startsWith(input.toLowerCase())
            );
            companies.push(...matchingCompanies);
        });

        setCompanySuggestions(companies);
    };

    // Handle input changes and fetch suggestions
    const handleCompanyNameChange = (e) => {
        const input = e.target.value;
        setCompanyNameInput(input);
        setCompanyName(input); // Set custom input directly

        if (input.length > 0) {
            fetchCompanySuggestions(input);
        } else {
            setCompanySuggestions([]); // Clear suggestions when input is empty
        }
    };

    // When a suggestion is selected, set company name and clear suggestions
    const handleSuggestionClick = (company) => {
        setCompanyName(company);
        setCompanyNameInput(company);
        setCompanySuggestions([]); // Clear suggestions after selection
    };

    return (
        <div style={{ position: 'relative', width: '200px' }}>
            <input
                type="text"
                placeholder="Search by Company Name"
                value={companyName}
                onChange={handleCompanyNameChange}
                style={{ width: '100%' }}
            />
            {companySuggestions.length > 0 && (
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
                    {companySuggestions.map((company, index) => (
                        <li 
                            key={index} 
                            style={{ cursor: 'pointer', padding: '5px' }}
                            onClick={() => handleSuggestionClick(company)}
                        >
                            {company}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
