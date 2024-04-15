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


const duplicatedTrainingClass = async (itemId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/training-program/training-class/${itemId}/duplicated`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW1hbmhiYW5nQGdtYWlsLmNvbSIsImlhdCI6MTcxMzE4NDM1MSwiZXhwIjoxNzEzMjcwNzUxfQ.kmR4UBnSaIs5cWmyeE0xJ0hKBJNgEwnwVhmBBxkDbxE"
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