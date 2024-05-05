export const getTechnicalGroups = async () => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/technical-groups', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch technical group data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching technical group data:', error);
        throw error;
    }
};