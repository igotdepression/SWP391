import React, { useState } from 'react';
import axios from 'axios';
import './CreateModal.css'; // We'll create this CSS file next

const CreateModal = ({ type, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let endpoint = '';
      let payload = {};

      switch (type) {
        case 'bookings':
          endpoint = '/api/staff/bookings';
          payload = { ...formData }; // Assume formData contains all booking fields
          break;
        case 'consultations':
          endpoint = '/api/staff/consultations';
          payload = { ...formData }; // Assume formData contains all consultation fields
          break;
        case 'samples':
          endpoint = '/api/staff/samples';
          payload = { ...formData }; // Assume formData contains all sample fields
          break;
        case 'test-results':
          endpoint = '/api/staff/test-results';
          payload = { ...formData }; // Assume formData contains all test result fields
          break;
        default:
          throw new Error('Invalid type for creation');
      }

      await axios.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      onSuccess(); // Refresh data on parent component
    } catch (err) {
      console.error(`Error creating ${type}:`, err);
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (type) {
      case 'bookings':
        return (
          <form onSubmit={handleSubmit}>
            <h2>Create New Booking</h2>
            <input type="text" name="userID" placeholder="User ID" onChange={handleChange} required />
            <input type="text" name="serviceID" placeholder="Service ID" onChange={handleChange} required />
            <input type="date" name="bookingDate" onChange={handleChange} required />
            <select name="status" onChange={handleChange} required>
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>
            <input type="number" name="totalPrice" placeholder="Total Price" onChange={handleChange} required />
            <button type="submit" disabled={loading}>Create Booking</button>
          </form>
        );
      case 'consultations':
        return (
          <form onSubmit={handleSubmit}>
            <h2>Create New Consultation</h2>
            <input type="text" name="bookingID" placeholder="Booking ID" onChange={handleChange} required />
            <input type="text" name="consultantUserID" placeholder="Consultant User ID" onChange={handleChange} required />
            <input type="date" name="consultationDate" onChange={handleChange} required />
            <input type="text" name="consultationMode" placeholder="Mode (e.g., Online, In-person)" onChange={handleChange} />
            <textarea name="notes" placeholder="Notes" onChange={handleChange}></textarea>
            <select name="status" onChange={handleChange} required>
                <option value="">Select Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>
            <button type="submit" disabled={loading}>Create Consultation</button>
          </form>
        );
      case 'samples':
        return (
          <form onSubmit={handleSubmit}>
            <h2>Create New Sample</h2>
            <input type="text" name="surchargeID" placeholder="Surcharge ID" onChange={handleChange} required />
            <input type="text" name="bookingID" placeholder="Booking ID" onChange={handleChange} required />
            <input type="text" name="participantID" placeholder="Participant ID" onChange={handleChange} required />
            <input type="text" name="sampleType" placeholder="Sample Type (e.g., Blood, Saliva)" onChange={handleChange} required />
            <input type="date" name="receivedDate" onChange={handleChange} />
            <select name="status" onChange={handleChange} required>
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Received">Received</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>
            <button type="submit" disabled={loading}>Create Sample</button>
          </form>
        );
      case 'test-results':
        return (
          <form onSubmit={handleSubmit}>
            <h2>Create New Test Result</h2>
            <input type="text" name="bookingID" placeholder="Booking ID" onChange={handleChange} required />
            <input type="date" name="resultDate" onChange={handleChange} required />
            <select name="resultStatus" onChange={handleChange} required>
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Issued">Issued</option>
            </select>
            <textarea name="resultContent" placeholder="Result Content" onChange={handleChange} required></textarea>
            <button type="submit" disabled={loading}>Create Test Result</button>
          </form>
        );
      default:
        return <p>Select a type to create.</p>;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        {error && <p className="modal-error">{error}</p>}
        {renderForm()}
      </div>
    </div>
  );
};

export default CreateModal; 