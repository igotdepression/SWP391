import React, { useState } from 'react';
import { userAPI } from '../services/api';
import './ImageUpload.css';

const ImageUpload = ({ userId, type = 'avatar', onUploadSuccess, currentImageUrl }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validate file type
            if (!selectedFile.type.startsWith('image/')) {
                setError('Vui lòng chọn file ảnh');
                return;
            }

            // Validate file size (max 5MB)
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError('File quá lớn. Vui lòng chọn file nhỏ hơn 5MB');
                return;
            }

            setFile(selectedFile);
            setError('');

            // Create preview
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Vui lòng chọn file');
            return;
        }

        setLoading(true);
        setError('');

        try {
            let response;
            if (type === 'avatar') {
                response = await userAPI.uploadAvatar(userId, file);
            } else if (type === 'idcard') {
                response = await userAPI.uploadIdCard(userId, file);
            }

            if (response.data && response.data.url) {
                onUploadSuccess(response.data.url);
                setFile(null);
                setPreview(null);
                alert('Upload thành công!');
            }
        } catch (error) {
            setError(error.message || 'Upload thất bại');
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = () => {
        setFile(null);
        setPreview(null);
        setError('');
    };

    return (
        <div className="image-upload">
            <div className="upload-section">
                <h4>{type === 'avatar' ? 'Avatar' : 'ID Card'}</h4>
                
                {/* Current Image */}
                {currentImageUrl && (
                    <div className="current-image">
                        <img src={currentImageUrl} alt="Current" />
                        <p>Ảnh hiện tại</p>
                    </div>
                )}

                {/* File Input */}
                <div className="file-input">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        id={`file-${type}`}
                    />
                    <label htmlFor={`file-${type}`} className="file-label">
                        {file ? file.name : 'Chọn file ảnh'}
                    </label>
                </div>

                {/* Preview */}
                {preview && (
                    <div className="preview">
                        <img src={preview} alt="Preview" />
                        <p>Xem trước</p>
                    </div>
                )}

                {/* Error */}
                {error && <div className="error">{error}</div>}

                {/* Buttons */}
                <div className="upload-buttons">
                    {file && (
                        <>
                            <button 
                                onClick={handleUpload} 
                                disabled={loading}
                                className="upload-btn"
                            >
                                {loading ? 'Đang upload...' : 'Upload'}
                            </button>
                            <button 
                                onClick={handleRemove}
                                className="remove-btn"
                            >
                                Hủy
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageUpload; 