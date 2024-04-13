export const getUserData = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/customers');
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const importUser = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:8080/api/v1/auth/customer/import', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW1hbmhiYW5nQGdtYWlsLmNvbSIsImlhdCI6MTcxMjk5ODcyMywiZXhwIjoxNzEzMDg1MTIzfQ.dIh2K5k3ncL4d7OQLBOqcPd-EV82XLfroswC7JNBEpM'
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