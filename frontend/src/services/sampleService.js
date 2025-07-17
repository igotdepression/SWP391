import api from './api';

const sampleService = {
    // Get all samples
    getAllSamples: async () => {
        try {
            const response = await api.get('/samples');
            return response.data;
        } catch (error) {
            console.error('Error fetching samples:', error);
            throw error;
        }
    },

    // Get sample by ID
    getSampleById: async (sampleID) => {
        try {
            const response = await api.get(`/samples/${sampleID}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching sample by ID:', error);
            throw error;
        }
    },

    // Get samples by booking ID
    getSamplesByBookingId: async (bookingID) => {
        try {
            const response = await api.get(`/samples/booking/${bookingID}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching samples by booking ID:', error);
            throw error;
        }
    },

    // Update sample
    updateSample: async (sampleID, sampleData) => {
        try {
            const response = await api.put(`/samples/${sampleID}`, sampleData);
            return response.data;
        } catch (error) {
            console.error('Error updating sample:', error);
            throw error;
        }
    },

    // Delete sample
    deleteSample: async (sampleID) => {
        try {
            await api.delete(`/samples/${sampleID}`);
            return true;
        } catch (error) {
            console.error('Error deleting sample:', error);
            throw error;
        }
    }
};

export default sampleService;
