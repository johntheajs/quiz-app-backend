const admin = require('../config');
const db = admin.firestore();

class Question {
  constructor(topic, question, options, correctOption, level) {
    this.topic = topic;
    this.question = question;
    this.options = options;
    this.correctOption = correctOption;
    this.level = level;
  }

  async save() {
    try {
      const db = admin.firestore();

      // Add the question to the Firestore collection
      const docRef = await db.collection('questions').add({
        topic: this.topic,
        question: this.question,
        options: this.options,
        correctOption: this.correctOption,
        level: this.level
      });

      console.log('Question added with ID: ', docRef.id);
      return docRef.id; // Return the ID of the newly added question
    } catch (error) {
      console.error('Error adding question: ', error);
      throw new Error("An error occurred while adding question");
    }
  }
}

module.exports = Question;
