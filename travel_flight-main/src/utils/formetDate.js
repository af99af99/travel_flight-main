// Function to get the next day's date in 'YYYY-MM-DD' format
// export default function getNextDay() {
//     const today = new Date();
//     const dd = String(today.getDate()).padStart(2, "0");
//     const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
//     const yyyy = today.getFullYear();
//     return `${yyyy}-${mm}-${dd}`;
// }

// Function to get today's date in YYYY-MM-DD format
export const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
};

// Function to get tomorrow's date in YYYY-MM-DD format
export const getNextDay = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Increment the day by 1
    return tomorrow.toISOString().split("T")[0];
};

// Function to get day of the week from a date
export const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return days[date.getUTCDay()];
};
