import { useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage'; // Import for Firebase Storage
import { app } from './../../firebase/firebase'; // Import firebase configuration
import { LocationInput } from './LocationInput';
import { CompanyNameInput } from './CompanyNameInput';
import { PositionInput } from './PositionInput';
import { GraduationYearInput } from './GraduationYearInput';

const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

export const Search = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [yearOfGraduation, setYearOfGraduation] = useState('');
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState('');

    const handleSearch = async () => {
        // Check if all inputs are empty
        if (!firstName && !lastName && !location && !companyName && !position && !yearOfGraduation) {
            setMessage('Please enter at least one search criteria.');
            setResults([]);
            return;
        }

        let q = query(collection(db, "professionalProfile"));

        if (firstName) {
            q = query(q, where("firstName", "==", firstName));
        }
        if (lastName) {
            q = query(q, where("lastName", "==", lastName));
        }
        if (location) {
            q = query(q, where("current_job.current_job_location", "==", location));
        }
        if (companyName) {
            q = query(q, where("current_job.current_employer", "==", companyName));
        }
        if (position) {
            q = query(q, where("current_job.current_job_title", "==", position));
        }
        if (yearOfGraduation) {
            q = query(q, where("year_of_passing", "==", yearOfGraduation));
        }

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const searchResults = await Promise.all(querySnapshot.docs.map(async doc => {
                const data = doc.data();
                let profilePictureUrl = '';

                // Check if profilePicture exists and get its downloadable URL
                if (data.profilePicture) {
                    const profilePictureRef = ref(storage, data.profilePicture);
                    try {
                        profilePictureUrl = await getDownloadURL(profilePictureRef);
                    } catch (error) {
                        console.error('Error fetching image URL:', error);
                    }
                }

                return {
                    id: doc.id,
                    fullName: `${data.firstName} ${data.lastName}`,
                    profilePictureUrl, // Use the generated URL
                    currentJob: data.current_job?.current_job_title || 'N/A',
                    currentEmployer: data.current_job?.current_employer || 'N/A',
                    location: data.current_job?.current_job_location || 'N/A',
                    graduationYear: data.year_of_passing || 'N/A'
                };
            }));
            setResults(searchResults);
            setMessage('');
        } else {
            setResults([]);
            setMessage('No results found for the given criteria.');
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <input
                    type="text"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="p-2 border rounded"
                />
                <LocationInput setLocation={setLocation} />
                <CompanyNameInput setCompanyName={setCompanyName} />
                <PositionInput setPosition={setPosition} />
                <GraduationYearInput setYearOfGraduation={setYearOfGraduation} />
            </div>
            
            <button 
                onClick={handleSearch}
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Search
            </button>

            {message && (
                <p className="text-center text-red-500 mb-4">{message}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((result) => (
                    <div key={result.id} className="bg-white shadow-lg rounded-lg p-4">
                        {result.profilePictureUrl ? (
                            <img 
                                src={result.profilePictureUrl} 
                                alt={`${result.fullName} Profile`} 
                                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
                                className="mb-2"
                            />
                        ) : (
                            <p>No Profile Picture</p>
                        )}
                        <h3 className="text-xl font-bold mb-2">{result.fullName}</h3>
                        <p><strong>Current Job:</strong> {result.currentJob}</p>
                        <p><strong>Current Employer:</strong> {result.currentEmployer}</p>
                        <p><strong>Location:</strong> {result.location}</p>
                        <p><strong>Graduation Year:</strong> {result.graduationYear}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
