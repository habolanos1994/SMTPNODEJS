const express = require("express");
const { sendsmtp } = require("./smtp");
const os = require('os');

const hostname = os.hostname();

const app = express();
const port = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function setHeaders(res) {
  await res.setHeader('Content-Type', 'application/json');
}

app.post('/smtp', async (req, res) => {
    try {
      const smtpto = req.body.smtpto.join(', ');
      const smtpmessage = req.body.smtpmessage;
      console.log(req.body.smtpto)
      if (!smtpto || !smtpmessage) {
        res.send({ success: false, message: "Missing 'smtpto' or 'smtpmessage' field in POST request." });
      } else {
        const messageId = await sendsmtp(smtpto, smtpmessage);
        res.send({ success: true, message: messageId });
      }
    } catch (err) {
      console.error(`Error sending email: ${err.message}`);
      res.send({ success: false, message: err.message });
    }
  });
  
  

app.use((req, res) => {
  res.status(404).send('Cannot GET /');
});

app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  next(err);
});

app.listen(port, () => {
  console.log(`Server listening at http://${hostname}:${port}`);
});
