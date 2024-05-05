export const getProgramContents = async () => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/program-contents', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch program content data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching program content data:', error);
        throw error;
    }
};