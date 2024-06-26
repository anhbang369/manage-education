export const getOutputStandard = async () => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/syllabus/syllabus-day/syllabus-unit/unit-chapter/output-standards', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch output standard data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching output standard data:', error);
        throw error;
    }
};