export const authAPI = async (token) => {
    try {
        console.log("token: " + JSON.stringify(token))
        const tokenValue = JSON.stringify(token).replace(/({|}|")/g, '');

        console.log("token value: " + tokenValue);

        const decode = tokenValue.replace("token:", '');


        const response = await fetch('http://localhost:8080/api/v1/auth/firebase', {
            method: 'POST',
            body: decode,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const responseData = await response.json();

            if (responseData.access_token && responseData.refresh_token) {
                console.log('Auth successful');
                console.log(responseData);
                return responseData;
            } else {
                console.error('Auth failed: Tokens not found in response');
                throw new Error('Auth failed: Tokens not found in response');
            }
        } else {
            console.error('Auth failed');
            throw new Error('Auth failed');
        }
    } catch (error) {
        console.error('Error Auth:', error);
        throw error;
    }
};
