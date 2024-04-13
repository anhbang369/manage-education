export const getUserData = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/customers');
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};