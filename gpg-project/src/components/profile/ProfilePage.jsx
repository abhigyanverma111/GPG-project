import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase'; // Import firebase configuration
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const db = getFirestore(app);
const storage = getStorage(app);

export const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    // Function to fetch profile data
    const fetchProfile = async () => {
        const docRef = doc(db, "professionalProfile", "ueaiPwoA3OGvT3QWurT5");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const profileData = docSnap.data();
            setProfile(profileData);

            // Fetch the image from Firebase Storage
            if (profileData.profilePicture) {
                const imageRef = ref(storage, profileData.profilePicture);
                const url = await getDownloadURL(imageRef);
                setImageUrl(url); // Set image URL to display
            }
        } else {
            console.log("No such document!");
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (!profile) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={`${profile.firstName} ${profile.lastName}`}
                        style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                )}
                <h2 className="text-xl font-bold mb-2">{`${profile.firstName} ${profile.lastName}`}</h2>
                <p><strong>College:</strong> {profile.college_name || 'N/A'}</p>
                <p><strong>Branch:</strong> {profile.branch || 'N/A'}</p>
                <p><strong>Graduation Year:</strong> {profile.year_of_passing || 'N/A'}</p>
                <p><strong>Degree:</strong> {profile.degree_obtained || 'N/A'}</p>
                <p><strong>Personal Email:</strong> {profile.personalEmail || 'N/A'}</p>
                <p><strong>Professional Email:</strong> {profile.professionalEmail || 'N/A'}</p>
                <p><strong>Phone Number:</strong> {profile.phoneNumber || 'N/A'}</p>
                <p><strong>GitHub:</strong> <a href={profile.github_profile_url} target="_blank" rel="noopener noreferrer">{profile.github_profile_url}</a></p>
                <p><strong>LinkedIn:</strong> <a href={profile.linkedinProfile} target="_blank" rel="noopener noreferrer">{profile.linkedinProfile}</a></p>

                <h3 className="text-lg font-bold mt-4">Current Job</h3>
                {profile.current_job ? (
                    <>
                        <p><strong>Company:</strong> {profile.current_job.current_employer || 'N/A'}</p>
                        <p><strong>Location:</strong> {profile.current_job.current_job_location || 'N/A'}</p>
                        <p><strong>Position:</strong> {profile.current_job.current_job_title || 'N/A'}</p>
                        <p><strong>Start Date:</strong> {new Date(profile.current_job.current_job_start_date?.seconds * 1000).toLocaleDateString() || 'N/A'}</p>
                    </>
                ) : (
                    <p>N/A</p>
                )}

                <h3 className="text-lg font-bold mt-4">Technical Skills</h3>
                <ul>
                    {profile.technical_skills ? profile.technical_skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    )) : <p>N/A</p>}
                </ul>

                <h3 className="text-lg font-bold mt-4">Professional Achievements</h3>
                <ul>
                    {profile.professional_achievements ? profile.professional_achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                    )) : <p>N/A</p>}
                </ul>
                console.log(profile.past_jobs);
console.log(profile.internships);

                {/* <h3 className="text-lg font-bold mt-4">Past Jobs</h3>
                {profile.past_jobs ? profile.past_jobs.map((job, index) => (
                    <div key={index} className="mb-2">
                        <p><strong>Company:</strong> {job.organization_name || 'N/A'}</p>
                        <p><strong>Title:</strong> {job.job_title || 'N/A'}</p>
                        <p><strong>Location:</strong> {job.location_of_job || 'N/A'}</p>
                        <p><strong>Start Date:</strong> {new Date(job.past_jobs_start_date?.seconds * 1000).toLocaleDateString() || 'N/A'}</p>
                        <p><strong>End Date:</strong> {new Date(job.past_jobs_end_date?.seconds * 1000).toLocaleDateString() || 'N/A'}</p>
                    </div>
                )) : <p>N/A</p>} */}

                {/* <h3 className="text-lg font-bold mt-4">Internships</h3>
                {profile.internships ? profile.internships.map((internship, index) => (
                    <div key={index} className="mb-2">
                        <p><strong>Company:</strong> {internship.company || 'N/A'}</p>
                        <p><strong>Title:</strong> {internship.internship_title || 'N/A'}</p>
                        <p><strong>Start Date:</strong> {new Date(internship.start_date?.seconds * 1000).toLocaleDateString() || 'N/A'}</p>
                        <p><strong>End Date:</strong> {new Date(internship.end_date?.seconds * 1000).toLocaleDateString() || 'N/A'}</p>
                    </div>
                )) : <p>N/A</p>} */}
                <h3 className="text-lg font-bold mt-4">Previous Jobs</h3>
                {profile.past_jobs ? (
                    <>
                        <p><strong>Company:</strong> {profile.past_jobs.organization_name || 'N/A'}</p>
                        <p><strong>Location:</strong> {profile.past_jobs.location_of_job || 'N/A'}</p>
                        <p><strong>Position:</strong> {profile.past_jobs.job_title || 'N/A'}</p>
                        <p><strong>Start Date:</strong> {new Date(profile.past_jobs.past_jobs_start_date?.seconds * 1000).toLocaleDateString() || 'N/A'}</p>
                        <p><strong>End Date:</strong> {new Date(profile.past_jobs.past_jobs_end_date?.seconds * 1000).toLocaleDateString() || 'N/A'}</p>
                    </>
                ) : (
                    <p>N/A</p>
                )}
                <h3 className="text-lg font-bold mt-4">Internships</h3>
                {profile.internships ? (
                    <>
                        <p><strong>Company:</strong> {profile.internships.company || 'N/A'}</p>
                        <p><strong>Position:</strong> {profile.internships.internship_title || 'N/A'}</p>
                        <p><strong>Start Date:</strong> {new Date(profile.internships.start_date?.seconds * 1000).toLocaleDateString() || 'N/A'}</p>
                        <p><strong>End Date:</strong> {new Date(profile.internships.end_date?.seconds * 1000).toLocaleDateString() || 'N/A'}</p>
                    </>
                ) : (
                    <p>N/A</p>
                )}
            </div>
        </div>
    );
};
