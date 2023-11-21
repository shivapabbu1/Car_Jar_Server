const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors')

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/doctors', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create Doctor schema
const doctorSchema = new mongoose.Schema({
  name: String,
  specailist:String,
  location: String,
  clinic: String,
  exp: String,
  rate: String,
  fee: String,
  stories: String,
  imagSrc:String
});

const Doctor = mongoose.model('Doctor', doctorSchema);

app.use(bodyParser.json());
app.use(cors());

// Insert doctor data
app.post('/api/doctors', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    const result = await doctor.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
