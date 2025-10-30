import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000';

export const chatAPI = {
    sendMessage: async (message) => {
        const response = await axios.post(`${API_BASE_URL}/prompt`, {
            question: message
        });
        return response.data;
    }
};


export const documentsAPI = {
    getList: async () => {
        const response = await axios.get(`${API_BASE_URL}/documents/list`)
        return response.data
    },
    upload: async (files) => {
        const formData = new FormData();

        // Support both single file and array of files
        const fileArray = Array.isArray(files) ? files : [files];

        fileArray.forEach(file => {
            formData.append('files', file);
        });

        const response = await axios.post(
            `${API_BASE_URL}/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    },
    delete: async (docId) => {
        const response = await axios.delete(`${API_BASE_URL}/documents/${docId}`);
        return response.data;
    }
};