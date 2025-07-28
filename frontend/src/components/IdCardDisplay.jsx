import React, { useState } from 'react';
import './IdCardDisplay.css';

const IdCardDisplay = ({ idCardUrl, onUploadClick }) => {
    const [showFullImage, setShowFullImage] = useState(false);

    const handleImageClick = () => {
        if (idCardUrl) {
            setShowFullImage(true);
        }
    };

    const handleCloseModal = () => {
        setShowFullImage(false);
    };

    return (
        <>
            <div className="id-card-display">
                <h4>Chứng minh nhân dân</h4>
                
                {idCardUrl ? (
                    <div className="id-card-container">
                        <img 
                            src={idCardUrl} 
                            alt="ID Card" 
                            className="id-card-image"
                            onClick={handleImageClick}
                        />
                        <p className="id-card-label">Click để xem ảnh gốc</p>
                    </div>
                ) : (
                    <div className="id-card-placeholder">
                        <div className="placeholder-icon">📄</div>
                        <p>Chưa có ảnh CMND/CCCD</p>
                        <button 
                            onClick={onUploadClick}
                            className="upload-id-card-btn"
                        >
                            Upload ảnh CMND/CCCD
                        </button>
                    </div>
                )}
            </div>

            {/* Full Image Modal */}
            {showFullImage && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content image-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Chứng minh nhân dân</h3>
                            <button className="close-btn" onClick={handleCloseModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <img 
                                src={idCardUrl} 
                                alt="ID Card Full Size" 
                                className="full-size-image"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default IdCardDisplay; 