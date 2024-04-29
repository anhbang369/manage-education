export const getTrainingProgram = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/customer/training-program/training-classes');
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
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/training-class/${itemId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const data = await response;
            console.log('Delete successful', data);
            return data;
        } else {
            console.error('Delete failed');
            throw new Error('Delete failed');
        }
    } catch (error) {
        console.error('Error Delete syllabus:', error);
        throw error;
    }
};


export const getByIdTrainingClass = async (itemId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/training-classes/${itemId}`, {
            method: 'GET',
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
        console.log("loi string jdon: " + JSON.stringify(dto))
        console.log("loi full jdon: " + JSON.stringify([dto]))
        console.log("loi [] jdon: " + [dto])
        console.log("loi chatGPT: " + JSON.stringify(dto[0]))
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/${itemId}/training-class`, {
            method: 'POST',
            body: JSON.stringify(dto[0]),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (response.ok) {
            const data = await response;
            console.log('Create successful', data);
            console.log(response.status);
            return data;
        } else {
            console.error('Create failed');
            throw new Error('Create failed');
        }
    } catch (error) {
        console.error('Error Create:', error);
        throw error;
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
            const data = await response;
            console.log('Import successful', data);
            console.log(response.status);
            return data;
        } else {
            console.error('Import failed');
            throw new Error('Import failed');
        }
    } catch (error) {
        console.error('Error importing:', error);
        throw error;
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
            const data = await response;
            console.log('Duplicated successful', data);
            return data;
        } else {
            console.error('Duplicated failed');
            throw new Error('Duplicated failed');
        }
    } catch (error) {
        console.error('Error duplicating syllabus:', error);
        throw error;
    }
};

export { duplicatedTrainingClass };