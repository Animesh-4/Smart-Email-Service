require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/smart-email-db';

mongoose.connect(MONGO_URI)
.then(() => console.log('SUCCESS: Connected to MongoDB database'))
.catch(err => console.error('ERROR: Could not connect to MongoDB:', err));

app.get('/',(req,res)=> {
    res.send('Backend server is running!');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});