export const getFsu = async () => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/fsus', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch fsu data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching fsu data:', error);
        throw error;
    }
};