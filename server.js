const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.post('/submit', (req, res) => {
  const { name, email, phone, message } = req.body;
  const csvLine = `${name},${email},${phone},${message.replace(/[\n\r]/g, ' ')}\n`;

  if (!fs.existsSync('submissions.csv')) {
    fs.writeFileSync('submissions.csv', 'Name,Email,Phone,Message\n');
  }

  fs.appendFile('submissions.csv', csvLine, err => {
    if (err) {
      return res.status(500).send('Error saving data');
    }
    res.send('Form submitted successfully!');
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
