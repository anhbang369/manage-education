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

export const getProfile = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/customer/profile');
        if (!response.ok) {
            throw new Error('Failed to fetch profile user data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching gender profile data:', error);
        throw error;
    }
};

export const getUserStatus = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/customers/status');
        if (!response.ok) {
            throw new Error('Failed to fetch status user data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching status user data:', error);
        throw error;
    }
};

export const getUserRoles = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/customers/roles');
        if (!response.ok) {
            throw new Error('Failed to fetch role user data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching role user data:', error);
        throw error;
    }
};

export const getUserLevels = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/customers/levels');
        if (!response.ok) {
            throw new Error('Failed to fetch level user data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching level user data:', error);
        throw error;
    }
};

export const getUserGenders = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/customers/genders');
        if (!response.ok) {
            throw new Error('Failed to fetch gender user data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching gender user data:', error);
        throw error;
    }
};

export const getUserByRole = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/customers/role?role=CLASS_ADMIN');
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const getUserByRoleStudent = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/customers/role?role=STUDENT');
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const getUserByRoleTrainer = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/customers/role?role=TRAINER');
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
        const accessToken = localStorage.getItem('jwt');
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:8080/api/v1/auth/customer/import', {
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


export const deActiveUser = async (itemId) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/${itemId}/de-active`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken
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
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:8080/api/v1/auth/customer/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken
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
