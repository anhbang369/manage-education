export const getTrainingProgram = async () => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/customer/training-program', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch training program data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching training program data:', error);
        throw error;
    }
};

export const getTrainingProgramById = async (programId) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/${programId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch training program data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching training program data:', error);
        throw error;
    }
};

export const getTrainingProgramAdd = async () => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/customer/training-programs/classes', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch training program data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching training program data:', error);
        throw error;
    }
};

export const importTrainingProgram = async (file) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:8080/api/v1/auth/customer/training-program/import', {
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

export const createTrainingProgram = async (dto) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/customer/training-program', {
            method: 'POST',
            body: JSON.stringify(dto),
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


export const deleteTrainingProgram = async (itemId) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/${itemId}`, {
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
        console.error('Error Delete training program:', error);
        return 500;
    }
};

export const deActiveTrainingProgram = async (itemId) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/${itemId}/de-active`, {
            method: 'PUT',
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
        console.error('Error De-active training program:', error);
        return 500;
    }
};

export const getByIdProgram = async (itemId) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/${itemId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('View program');
            throw new Error('View program');
        }
    } catch (error) {
        console.error(error);
        return 500;
    }
};

const duplicatedTrainingProgram = async (itemId) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/${itemId}/duplicated`, {
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
        console.error('Error duplicating program:', error);
        return 500;
    }
};

export { duplicatedTrainingProgram };
