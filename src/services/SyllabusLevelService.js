export const getSyllabusProgram = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/syllabus/syllabus-levels');
        if (!response.ok) {
            throw new Error('Failed to fetch syllabus data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching syllabus data:', error);
        throw error;
    }
};