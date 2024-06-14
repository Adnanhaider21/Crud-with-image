import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData);
            setUploadedImageUrl(`http://localhost:5000/image/${response.data.filename}`);
        } catch (error) {
            console.error('Error uploading the image', error);
        }
    };

    return (
        <div className="App">
            <h1>Image Upload</h1>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload Image</button>
            {uploadedImageUrl && (
                <div>
                    <h2>Uploaded Image:</h2>
                    <img src={uploadedImageUrl} alt="Uploaded" />
                </div>
            )}
        </div>
    );
}

export default App;
