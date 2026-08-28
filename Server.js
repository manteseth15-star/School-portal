const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = 'mongodb+srv://manteseth15_db_user:YToiFTVc7EMvCzJi@cluster0.jabd23g.mongodb.net/schoolPortal?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

const studentSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  course: String,
  date: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

app.post('/api/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: 'Student saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

