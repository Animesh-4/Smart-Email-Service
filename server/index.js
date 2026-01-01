require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Email = require('./models/Email');
const { classifyEmail } = require('./aiService');

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
});

app.get('/test-db', async (req, res) => {
  try {
    const testEmail = new Email({
      remoteId: `test_${Date.now()}`,
      from: "boss@bigtech.com",
      subject: "Urgent: Project Update",
      snippet: "Please finish the code by Friday.",
      date: new Date(),
      category: "Work",
      aiConfidence: 85
    });
    await testEmail.save();

    res.json({ message: "Saved a test email!", data: testEmail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/emails', async (req, res) => {
  try {
    const emails = await Email.find().sort({ date: -1 }); // Get all, newest first
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/simulate', async (req, res) => {
  try {
    // 1. Pick a random fake email content
    const examples = [
      { sub: "Jira Task #102", body: "Please fix the login bug by EOD.", from: "pm@tech.com" },
      { sub: "Dominos Pizza", body: "Buy 1 Get 1 Free on large pizzas!", from: "promo@dominos.com" },
      { sub: "Hey bro", body: "Are we still going to the gym tonight?", from: "gymrat@gmail.com" },
      { sub: "Salary Slip", body: "Your payslip for January is attached.", from: "hr@corp.com" }
    ];
    const randomEmail = examples[Math.floor(Math.random() * examples.length)];

    // 2. Ask the AI (or Mock AI) to classify it
    const aiResult = await classifyEmail(randomEmail.sub, randomEmail.body);

    // 3. Save to Database
    const newEmail = new Email({
      remoteId: `sim_${Date.now()}`,
      from: randomEmail.from,
      subject: randomEmail.sub,
      snippet: randomEmail.body,
      date: new Date(),
      category: aiResult.category,
      aiConfidence: aiResult.confidence
    });

    await newEmail.save();
    res.json({ message: "Simulated email received!", email: newEmail });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Simulation failed" });
  }
});

app.patch('/api/emails/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body; // The new category sent from frontend

    const updatedEmail = await Email.findByIdAndUpdate(
      id, 
      { 
        category: category, 
        isCorrected: true,    // Mark as human-corrected
        aiConfidence: 100     // Humans are 100% confident
      }, 
      { new: true } // Return the updated document
    );

    res.json(updatedEmail);
  } catch (error) {
    res.status(500).json({ error: "Failed to update email" });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});