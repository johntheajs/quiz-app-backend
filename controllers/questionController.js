const Question = require('../models/questions');
const admin = require('../config');


// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const { topic, question, options, correctOption, level } = req.body;

    // Create a new question instance
    const newQuestion = new Question(topic, question, options, correctOption, level);

    // Save the question to Firestore
    const questionId = await newQuestion.save();

    res.status(201).json({ message: "Question created successfully", questionId });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: "An error occurred while creating question" });
  }
};

// Get question details by ID
exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch question details from Firestore
    const db = admin.firestore();
    const doc = await db.collection('questions').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Question not found" });
    }

    const questionData = doc.data();
    res.status(200).json({ message: "Question details", question: questionData });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: "An error occurred while fetching question" });
  }
};
