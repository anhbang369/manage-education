export const getSyllabusData = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/syllabus');
        if (!response.ok) {
            throw new Error('Failed to fetch syllabus data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching syllabus data:', error);
        throw error;
    }
};


export const getSyllabusProgram = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/syllabuses/program-syllabus');
        if (!response.ok) {
            throw new Error('Failed to fetch syllabus data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching syllabus data:', error);
        throw error;
    }
};


export const createSyllabus = async (dto) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/customer/syllabus', {
            method: 'POST',
            body: JSON.stringify(dto),
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


export const importSyllabus = async (file) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:8080/api/v1/auth/customer/syllabus/import', {
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


export const deleteSyllabus = async (itemId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/syllabus/${itemId}`, {
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


export const getByIdSyllabus = async (itemId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/syllabus/${itemId}`, {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('View syllabus');
            throw new Error('View syllabus');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};


// SyllabusService.js

const duplicatedSyllabus = async (itemId) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/syllabus/${itemId}/duplicated`, {
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

export { duplicatedSyllabus };

