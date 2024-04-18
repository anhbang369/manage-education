export const getDeliveryType = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/syllabus/syllabus-day/syllabus-unit/unit-chapter/delivery-types');
        if (!response.ok) {
            throw new Error('Failed to fetch delivery type data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching delivery type data:', error);
        throw error;
    }
};