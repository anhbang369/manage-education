export const getFullClassCalendars = async () => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/syllabus/training-program/training-class/class-calendars', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch class calendars data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching class calendars data:', error);
        throw error;
    }
};