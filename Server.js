const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


app.post('/send-email', (req, res) => {
  const { name, email,lastname,phone,subject, message } = req.body;

  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
      user: 'wajidahmed907@gmail.com',
      pass: 'ebuatgulpejzpsvz',
    },
    tls: {
      rejectUnauthorized: false, 
    },
  });
  

  const mailOptions = {
    from: email, 
   to:"wajidsaleem693@gmail.com",
    subject: subject || 'Contact Us Email',
    text: `Hi SydneyCare 24/7,\n
${name} ${lastname} having contact number as: ${phone} has contacted you from the email \b${email}\b and wrote the following message:
    \n${message}`,
  };

  // Sending the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error); 
      return res.status(500).send({ success: false, message: `Error sending email: ${error.message}` });
    }
    res.send({ success: true, message: 'Email sent successfully!' });
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

