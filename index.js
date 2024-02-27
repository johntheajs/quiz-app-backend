const express = require('express');
const app = express();
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

app.use((req, res) =>{
  const url = req.url;
  if (url.startsWith('/questions')) {
    questionRoutes(req, res);
  } else if (url.startsWith('/users')) {
    userRoutes(req, res);
  } else {
    res.status(404).send("Not Found");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
