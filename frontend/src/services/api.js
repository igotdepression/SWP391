import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'https://bloodline-backend-y2jk.onrender.com';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // Enable sending cookies
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('API Request:', {
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.data
        });
        return config;
    },
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for logging
api.interceptors.response.use(
    (response) => {
        console.log('API Response:', {
            url: response.config.url,
            status: response.status,
            data: response.data
        });
        return response;
    },
    (error) => {
        // Log detailed error information
        console.error('API Response Error:', {
            url: error.config?.url,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message,
            code: error.code,
            stack: error.stack
        });

        // Handle specific error cases
        if (error.code === 'ERR_NETWORK') {
            console.error('Network Error: Cannot connect to backend server. Please check if the server is running.');
            throw new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.');
        }

        if (error.response) {
            // Handle specific HTTP status codes
            switch (error.response.status) {
                case 400:
                    throw new Error(error.response.data?.message || 'Dữ liệu không hợp lệ');
                case 401:
                    throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                case 403:
                    throw new Error('Bạn không có quyền thực hiện thao tác này');
                case 404:
                    throw new Error('Không tìm thấy tài nguyên');
                case 409:
                    throw new Error('Email đã được sử dụng');
                case 500:
                    throw new Error('Lỗi máy chủ. Vui lòng thử lại sau');
                default:
                    throw new Error(error.response.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại sau');
            }
        }

        throw error;
    }
);

// Auth API
export const authAPI = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (fullName, email, password, phoneNumber, address) => 
        api.post('/auth/register', { fullName, email, password, phoneNumber, address }),
};

// User API
export const userAPI = {
    getAllUsers: () => {
        return api.get('/users');
    },
    getUserById: (id) => {
        return api.get(`/users/${id}`);
    },
    getUserProfile: () => {
        return api.get('/users/profile');
    },
    updateUserProfile: (profileData) => {
        return api.put('/users/profile', profileData);
    },
    createUser: (userData) => {
        return api.post('/users', userData);
    },
    updateUser: (id, userData) => {
        return api.put(`/users/${id}`, userData);
    },
    deactivateUser: (id) => {
        return api.put(`/users/${id}/deactivate`);
    },
    activateUser: (id) => {
        return api.put(`/users/${id}/activate`);
    },
    uploadAvatar: (userId, file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post(`/users/${userId}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    uploadIdCard: (userId, file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post(`/users/${userId}/idcard`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

// Test API
export const testAPI = {
    testConnection: () => api.get('/auth/test'),
};

// Service API
export const serviceAPI = {
    getAllServices: () => api.get('/service/listService'),
    addService: (service) => api.post('/service/addService', service),
    updateService: (id, service) => api.put(`/service/updateService/${id}`, service),
    deleteService: (id) => api.delete(`/service/deleteService/${id}`),
};

export const sampleAPT = {
    getAllSample: () => api.get('/samples'),
};

// Booking API
export const bookingAPI = {
    getAllBookingsForStaff: () => api.get('/bookings/staff/all'),
    getBookingsByUserId: (userId) => api.get(`/bookings/user/${userId}`),
    getBookingDetails: (bookingId) => api.get(`/bookings/${bookingId}`),
};

export const testResultAPI = {
    createTestResult: (data) => api.post('/test-results', data),
    getAllTestResults: () => api.get('/test-results'),
    getTestResultById: (id) => api.get(`/test-results/${id}`),
    getTestResultByBookingId: (bookingId) => api.get(`/test-results/booking/${bookingId}`),
    updateTestResult: (id, data) => api.put(`/test-results/${id}`, data),
    deleteTestResult: (id) => api.delete(`/test-results/${id}`),
    // Lấy trạng thái kết quả xét nghiệm (nếu backend có endpoint riêng)
    getTestResultStatusById: (id) => api.get(`/test-results/${id}`),
    // Thêm hàm gửi kết quả thực sự
    sendTestResult: (id) => api.post(`/test-results/${id}/send`),
};

export const detailResultAPI = {
    getDetailResultsByTestResultId: (testResultID) => api.get(`/detail-results/test-result/${testResultID}`),
};

export const surchargeAPI = {
    getAll: () => api.get('/surcharges'),
    add: (surcharge) => api.post('/surcharges', surcharge),
    update: (id, surcharge) => api.put(`/surcharges/${id}`, surcharge),
    delete: (id) => api.delete(`/surcharges/${id}`),
};

export const participantAPI = {
    getParticipantsByBookingId: (bookingId) => api.get(`/participants/booking/${bookingId}`),
};

export default api; 