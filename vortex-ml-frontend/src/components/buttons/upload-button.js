// src/components/UploadButton.js

import React, { useRef, useState } from 'react';
import './upload-button.css';
import uploadIcon from './upload-icon.svg'; // Make sure you have an appropriate icon or SVG


const apiEndpoint = process.env.REACT_APP_VORTEXML_API_ENDPOINT;

const idxtoclass = {
    0: "airplane",
    1: "automobile",
    2: "bird",
    3: "cat",
    4: "deer",
    5: "dog",
    6: "frog",
    7: "horse",
    8: "ship",
    9: "truck",
};

const UploadButton = () => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [className, setClassName] = useState(null);


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('File selected:', file);
            setSelectedFile(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const sendImage = async () => {
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        console.log('API Endpoint:', apiEndpoint); // Add this line to check if the endpoint is being accessed

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                body: formData,
            });

            console.log(process.env.REACT_APP_VORTEXML_API_ENDPOINT)

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response from API:', data);
            setClassName(idxtoclass[data.class_id]); // Store the response data in state
            // Handle the response data
        } catch (error) {
            console.error('Error uploading the file:', error);
            // Handle the error
        }
    };

    return (
        <div className="outer-container">
            <div className="upload-container">
                <div className="upload-button" onClick={handleButtonClick}>
                    <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
                    <div className="upload-text">
                        <span class="choose-image">Choose Image</span>
                        <span class="upload-image-text">Upload an image</span>
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
            </div >

            <div className='results'>
                <div className="response-container">
                    <h3 className='result-title'>Predicted Class:</h3>
                    {className ? <p>{className}</p> : <p>Waiting for prediction...</p>}
                </div>
            </div>
        </div>

    );
};



export default UploadButton;