// src/utils/Auth.js
const Auth = {
    // Function to save token to local storage
    saveToken(token) {
        localStorage.setItem('jwt', token);
    },

    // Function to get token from local storage
    getToken() {
        return localStorage.getItem('jwt');
    },

    // Function to remove token from local storage (for logout)
    removeToken() {
        localStorage.removeItem('jwt');
    },

    // Function to decode token to get user information
    decodeToken(token) {
        if (!token) return null;
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    }
};

export default Auth;
