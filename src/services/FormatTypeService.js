export const getFormatTypes = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/format-types');
        if (!response.ok) {
            throw new Error('Failed to fetch format type data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching format type data:', error);
        throw error;
    }
};