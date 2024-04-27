export const getClassStatus = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/class-status');
        if (!response.ok) {
            throw new Error('Failed to fetch class status data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching class status data:', error);
        throw error;
    }
};