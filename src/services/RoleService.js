export const getRolePermission = async () => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/roles/permissions', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch role permission data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching role permission data:', error);
        throw error;
    }
};

export const updateRolePermission = async (dto) => {
    try {
        const accessToken = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/v1/auth/roles/permissions', {
            method: 'PUT',
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
        console.error('Error Update:', error);
        return 500;
    }
};