const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const validator = require('email-validator');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs-extra');
const process = require('process');

const cwd = process.cwd();

const prisma = new PrismaClient();

const app = express();
const upload = multer();

const saltRounds = 10;
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  if (req.body.email && req.body.password) {
    if (validator.validate(req.body.email)) {
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        res.json({ status: 200, user_account: { email: req.body.email, password: hash } });
      });
    } else {
      res.json({ status: 400, msg: 'Bad request' });
    }
  } else  {
    res.json({ status: 400, msg: 'Bad request' });
  }
});

app.post('/video', upload.array('videoUpload'), async (req, res) => {
  let video = req.files[0];
  if (video) {
    let db_video;
    try {
      db_video = await prisma.video.create({
        data: {
          originalname: video.originalname,
          buffer: video.buffer,
          size: video.size,
          encoding: video.encoding,
          mimetype: video.mimetype
        }
      });
    } catch (err) {
      return res.json({ status: 500, msg: err });
    }
    return res.json({ status: 200, msg: 'OK', url: db_video.id });
  } else {
    res.json({ status: 400, msg: 'Bad request' });
  }
});

app.get('/video/:id', async (req, res) => {
  const video = await prisma.video.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });
  if (!video) {
    return res.json({ status: 404, msg: 'Not found' });
  } 
  const newFileName = video.originalname;
  await fs.writeFile(`./${newFileName}`, video['buffer'], 'utf8').then(() => {
    res.status(200).sendFile(`${cwd}/${newFileName}`);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

