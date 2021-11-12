import axios from 'axios';

export default {
    register (email, password) {
        return axios.post(
            '/api/auth/register',
            {
                email: email,
                password: password,
            }
        );
    },
    login (email, password) {
        return axios.post(
            '/api/auth/login',
            {
                email: email,
                password: password,
            }
        );
    }
}