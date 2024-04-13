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


export const importSyllabus = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:8080/api/v1/auth/customer/syllabus/import', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW1hbmhiYW5nQGdtYWlsLmNvbSIsImlhdCI6MTcxMjk3MjM3OSwiZXhwIjoxNzEzMDU4Nzc5fQ.RSCPRH9xYgIeDD-KKbVaOjtCYsnbQ2AODEXwuTxAyW8"
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
