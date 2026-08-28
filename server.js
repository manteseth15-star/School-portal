const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware to parse form data and JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Option A: If your HTML/CSS/JS files are inside a folder named 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Option B: If your main HTML file is right in the main folder (not in 'public'), 
// comment out the line above and uncomment the line below instead:
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// Connect to MongoDB using the environment variable from Render
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server (Render automatically assigns a port, or defaults to 3000 locally)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
