// GraduationYearInput.jsx
export const GraduationYearInput = ({ setYearOfGraduation }) => {
    return (
        <div>
            <input
                type="number" // Ensure it's a numeric input for the year
                placeholder="Enter Year of Graduation"
                onChange={(e) => setYearOfGraduation(Number(e.target.value))} // Convert to number
                className="p-2 border rounded" // Add consistent styling if needed
            />
        </div>
    );
};
