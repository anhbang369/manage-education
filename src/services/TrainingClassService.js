export const getTrainingProgram = async () => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/customer/training-program/training-classes', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch syllabus data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching syllabus data:', error);
        throw error;
    }
};

export const deleteTrainingClass = async (itemId) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/training-class/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (response.ok) {
            return await response.status;
        } else {
            return await response.status;
        }
    } catch (error) {
        console.error('Error Delete syllabus:', error);
        return 500;
    }
};


export const getByIdTrainingClass = async (itemId) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/training-classes/${itemId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('View training class');
            throw new Error('view training class');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const createClass = async (itemId, dto) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/${itemId}/training-class`, {
            method: 'POST',
            body: JSON.stringify(dto[0]),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (response.ok) {
            return await response.status;
        } else {
            return await response.status;
        }
    } catch (error) {
        console.error('Error Create:', error);
        return 500;
    }
};

export const importTrainingClass = async (file) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:8080/api/v1/auth/customer/training-program/training-class/import', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (response.ok) {
            return await response.status;
        } else {
            return await response.status;
        }
    } catch (error) {
        console.error('Error importing:', error);
        return 500;
    }
};


const duplicatedTrainingClass = async (itemId) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/training-class/${itemId}/duplicated`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (response.ok) {
            return await response.status;
        } else {
            return await response.status;
        }
    } catch (error) {
        console.error('Error duplicating syllabus:', error);
        return 500;
    }
};

export { duplicatedTrainingClass };