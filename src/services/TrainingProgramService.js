export const getTrainingProgram = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/customer/training-program');
        if (!response.ok) {
            throw new Error('Failed to fetch training program data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching training program data:', error);
        throw error;
    }
};

export const deleteTrainingProgram = async (itemId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/${itemId}`, {
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
        console.error('Error Delete training program:', error);
        throw error;
    }
};

export const deActiveTrainingProgram = async (itemId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/${itemId}/de-active`, {
            method: 'PUT',
        });

        if (response.ok) {
            const data = await response;
            console.log('De-active successful', data);
            return data;
        } else {
            console.error('De-active failed');
            throw new Error('De-active failed');
        }
    } catch (error) {
        console.error('Error De-active training program:', error);
        throw error;
    }
};

const duplicatedTrainingProgram = async (itemId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/${itemId}/duplicated`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW1hbmhiYW5nQGdtYWlsLmNvbSIsImlhdCI6MTcxMzEwNDcyOSwiZXhwIjoxNzEzMTkxMTI5fQ._CNbKhWKc0PjqLsZK2W1NIBfbNMrC_BmU2OeHo8pOFA"
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
        console.error('Error duplicating program:', error);
        throw error;
    }
};

export { duplicatedTrainingProgram };
