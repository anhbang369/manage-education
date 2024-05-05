export const getMaterialAuthorities = async () => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/authorities?resource=LEARNING_MATERIAL', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
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
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/authorities?resource=SYLLABUS', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
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
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/authorities?resource=TRAINING_PROGRAM', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
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
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/authorities?resource=CLASS', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch attendee data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching attendee data:', error);
        throw error;
    }
};

export const getRoleAuthorities = async (role, resource) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:8080/api/v1/auth/authority?role=${role}&resource=${resource}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch attendee data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching attendee data:', error);
        throw error;
    }
};