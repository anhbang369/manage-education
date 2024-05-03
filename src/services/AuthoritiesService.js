export const getMaterialAuthorities = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/authorities?resource=LEARNING_MATERIAL');
        if (!response.ok) {
            throw new Error('Failed to fetch attendee data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching attendee data:', error);
        throw error;
    }
};

export const getSyllabusAuthorities = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/authorities?resource=SYLLABUS');
        if (!response.ok) {
            throw new Error('Failed to fetch attendee data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching attendee data:', error);
        throw error;
    }
};

export const getTrainingAuthorities = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/authorities?resource=TRAINING_PROGRAM');
        if (!response.ok) {
            throw new Error('Failed to fetch attendee data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching attendee data:', error);
        throw error;
    }
};

export const getClassAuthorities = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/authorities?resource=CLASS');
        if (!response.ok) {
            throw new Error('Failed to fetch attendee data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching attendee data:', error);
        throw error;
    }
};