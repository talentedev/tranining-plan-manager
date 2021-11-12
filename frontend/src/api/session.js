import axios from 'axios';

export default {
    createSession (title, description, status, order) {
        return axios.post(
            '/api/session/create',
            {
                title : title,
                description: description,
                status: status,
                order: order,
            }
        );
    },
    getAll (userId) {
        return axios.get('/api/session?limit=50&sort=priority&order=1&owner=' + userId);
    },
    updateSessions (sessions) {
        return axios.post(
            '/api/session/update',
            {
                sessions: sessions,
            }
        );
    },
    delete (id) {
        return axios.get('/api/session/delete', {
            params: {
                id: id
            }
        });
    },
}