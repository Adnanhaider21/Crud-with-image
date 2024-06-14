const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static('uploads'));

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('image');

// Route to upload image
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Upload failed', error: err });
        }
        res.status(200).json({ message: 'Upload successful', filename: req.file.filename });
    });
});

// Route to serve uploaded image
app.get('/image/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, 'uploads', req.params.filename));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
