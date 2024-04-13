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

export const getUserById = async (itemId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/${itemId}`);
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


export const deActiveUser = async (itemId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/${itemId}/de-active`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW1hbmhiYW5nQGdtYWlsLmNvbSIsImlhdCI6MTcxMjk4MzI1NiwiZXhwIjoxNzEzMDY5NjU2fQ.jA8ijVU2w15aLVAed1x7b9aY_9ohuiL5W0mdQAq0XYA"
            }
        });

        if (response.ok) {
            await response;
            console.log(response);
            console.log(response.status);
            return response;
        } else {
            console.error('Import failed');
            throw new Error('Import failed');
        }
    } catch (error) {
        console.error('Error importing:', error);
        throw error;
    }
};


export const deleteUser = async (itemId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW1hbmhiYW5nQGdtYWlsLmNvbSIsImlhdCI6MTcxMjk4MzI1NiwiZXhwIjoxNzEzMDY5NjU2fQ.jA8ijVU2w15aLVAed1x7b9aY_9ohuiL5W0mdQAq0XYA"
            }
        });

        if (response.ok) {
            await response;
            console.log(response);
            console.log(response.status);
            return response;
        } else {
            console.error('Import failed');
            throw new Error('Import failed');
        }
    } catch (error) {
        console.error('Error importing:', error);
        throw error;
    }
};


export const createUser = async (userData) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        return await response;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
