export const getAttendLevel = async () => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/attend-levels');
        if (!response.ok) {
            throw new Error('Failed to fetch attendee data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching attendee data:', error);
        throw error;
    }
};