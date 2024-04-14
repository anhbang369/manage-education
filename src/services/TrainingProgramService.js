export const getTrainingProgram = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/customer/training-program');
        if (!response.ok) {
            throw new Error('Failed to fetch training program data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching training program data:', error);
        throw error;
    }
};
