export const getAttendLevel = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/attend-levels');
        if (!response.ok) {
            throw new Error('Failed to fetch fsu data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching fsu data:', error);
        throw error;
    }
};