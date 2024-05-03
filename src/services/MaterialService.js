export const getMaterials = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/syllabus/syllabus-day/syllabus-unit/unit-chapter/materials');
        if (!response.ok) {
            throw new Error('Failed to fetch material data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching material data:', error);
        throw error;
    }
};