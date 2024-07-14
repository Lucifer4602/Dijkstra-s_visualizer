const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {exec} = require('child_process');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/cpp', (req, res) => {
  const code = req.body.code;
  const fileName = 'main.cpp';
  const outputFileName = process.platform === 'win32' ? 'main.exe' : './main';

  fs.writeFileSync(fileName, code);

  exec(
    `g++ ${fileName} -o main && ${outputFileName}`,
    (error, stdout, stderr) => {
      if (error) {
        res.json({status: 'error', message: stderr});
        return;
      }
      res.json({status: 'success', stdout: stdout, stderr: stderr});
    },
  );
});

app.post('/api/java', (req, res) => {
  const code = req.body.code;
  const fileName = 'Main.java';

  fs.writeFileSync(fileName, code);

  exec(`javac ${fileName} && java Main`, (error, stdout, stderr) => {
    if (error) {
      res.json({status: 'error', message: stderr});
      return;
    }
    res.json({status: 'success', stdout: stdout, stderr: stderr});
  });
});

app.post('/api/javascript', (req, res) => {
  const code = req.body.code;

  try {
    const result = eval(code);
    res.json({status: 'success', result: result});
  } catch (error) {
    res.json({status: 'error', message: error.message});
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
