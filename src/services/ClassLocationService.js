export const getClassLocation = async () => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/class-locations', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch class status data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching class status data:', error);
        throw error;
    }
};