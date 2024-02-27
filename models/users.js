const admin = require('../config');
const db = admin.firestore();
const auth = admin.auth();

class User {
  constructor(name, email, password, reg, role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.reg = reg;
    this.role = role;
  }

  async save() {
    try {
      // Create user in Firebase Authentication
      const userRecord = await auth.createUser({
        email: this.email,
        password: this.password,
      });

      // Save additional user parameters to Firestore
      await db.collection('users').doc(userRecord.uid).set({
        name: this.name,
        reg: this.reg,
        role: this.role
      });

      console.log('User registered and additional data saved:', userRecord.uid);
      return userRecord.uid;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error("An error occurred while registering user");
    }
  }
}

module.exports = User;
