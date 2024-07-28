// src/components/UploadButton.js

import React, { useRef } from 'react';
import './upload-button.css';
import uploadIcon from './upload-icon.svg'; // Make sure you have an appropriate icon or SVG




const UploadButton = () => {
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('File selected:', file);
            // Handle the file upload logic here
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const sendImage = () => {
        return
    }

    return (
        <div className="upload-container">
            <div className="upload-button" onClick={handleButtonClick}>
                <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
                <div className="upload-text">
                    <span>Choose Image</span>
                    <a href="#">Upload an image</a>
                </div>
            </div>
            <button className="browse-button" onClick={sendImage}>
                Go
            </button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
            />
        </div>
    );
};



export default UploadButton;